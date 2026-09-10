import math
from numbers import Real

import pandas as pd
from .feature_engineering import create_customer_features
from .model_training import FEATURE_COLUMNS

CUSTOMER_INPUT_COLUMNS = [
    "monthly_data_gb",
    "total_call_minutes",
    "sms_per_month",
    "monthly_recharge_amount",
    "international_call_minutes"
]


def validate_customer_input(user):
    if "user_type" not in user:
        raise ValueError("Missing required input: user_type")

    for column in CUSTOMER_INPUT_COLUMNS:
        if column not in user:
            raise ValueError(f"Missing required input: {column}")

        value = user[column]

        if isinstance(value, bool) or not isinstance(value, Real):
            raise ValueError(f"{column} must be numeric, got {value!r}")

        if math.isnan(value):
            raise ValueError(f"{column} must be a number, got NaN")

        if value < 0:
            raise ValueError(f"{column} must not be negative, got {value}")


def build_user_features(user, thresholds):
    user_df = pd.DataFrame(
        [{column: user[column] for column in CUSTOMER_INPUT_COLUMNS}]
    )

    return create_customer_features(user_df, thresholds)


def filter_plans_by_user_type(plans, user_type):
    if user_type not in (1, 2, 3):
        raise ValueError("Invalid user type.")

    if user_type == 2:
        family_plans = plans[plans["family_plan"] == 1].copy()
        if not family_plans.empty:
            return family_plans
        return plans.copy()
    elif user_type == 3:
        biz_plans = plans[(plans["business_plan"] == 1) | (plans["category"] == "Professional / Specialised")].copy()
        if not biz_plans.empty:
            return biz_plans
        return plans[plans["family_plan"] == 0].copy()

    return plans[plans["family_plan"] == 0].copy()


def filter_plans_by_data_adequacy(plans, monthly_data_gb):
    adequate = plans[
        (plans["unlimited_data"] == 1) |
        (plans["monthly_data_capacity"] >= (monthly_data_gb * 0.4))
    ].copy()
    if not adequate.empty:
        return adequate
    return plans.copy()


def recommend_plans(model, user, plans, thresholds, top_n=3):
    validate_customer_input(user)

    user_features = build_user_features(user, thresholds)

    # Evaluate across ALL 25 plans without discarding options upfront
    eligible_plans = plans.copy()

    user_features["key"] = 1
    eligible_plans["key"] = 1

    data = user_features.merge(eligible_plans, on="key").drop(columns=["key"])

    data["rank_score"] = model.predict(data[FEATURE_COLUMNS])
    data["monthly_price"] = data["monthly_price"].round(2)

    # 1. Budget Suitability Adjustment
    budget = float(user.get("monthly_recharge_amount", 400.0))
    if budget > 0:
        price_diff_ratio = (data["price"] - budget).abs() / max(100.0, budget)
        data["rank_score"] -= price_diff_ratio * 3.0

    # 2. Data Capacity Match Adjustment
    user_data_gb = float(user.get("monthly_data_gb", 15.0))
    if user_data_gb > 0:
        # Boost plans that comfortably satisfy the required monthly data capacity
        data.loc[(data["unlimited_data"] == 1) | (data["monthly_data_capacity"] >= user_data_gb), "rank_score"] += 2.0
        # Penalize plans that fall severely short of the user's data demands
        data.loc[(data["unlimited_data"] == 0) & (data["monthly_data_capacity"] < user_data_gb * 0.5), "rank_score"] -= 4.0

    # 3. User Type Match Adjustment (1: Individual, 2: Family, 3: Business)
    user_type = int(user.get("user_type", 1))
    if user_type == 2:
        data.loc[data["family_plan"] == 1, "rank_score"] += 6.0
        data.loc[data["family_plan"] == 0, "rank_score"] -= 3.0
    elif user_type == 3:
        data.loc[(data["business_plan"] == 1) | (data["category"] == "Professional / Specialised"), "rank_score"] += 6.0
        data.loc[(data["business_plan"] == 0) & (data["category"] != "Professional / Specialised"), "rank_score"] -= 3.0
    else:
        data.loc[data["family_plan"] == 1, "rank_score"] -= 4.0

    # 4. Roaming / International Call Adjustment
    isd_min = float(user.get("international_call_minutes", 0.0))
    if isd_min > 0:
        data.loc[data["isd_minutes"] > 0, "rank_score"] += 5.0

    recommendations = data.sort_values(
        ["rank_score", "plan_id"],
        ascending=[False, True]
    ).head(top_n)

    return recommendations[
        [
            "plan_id",
            "plan_name",
            "category",
            "price",
            "validity_days",
            "monthly_price",
            "rank_score"
        ]
    ]
