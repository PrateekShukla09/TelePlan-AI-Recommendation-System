import sys
import os
import json
import math
import pandas as pd

# Add current directory to path so src modules can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.feature_engineering import load_thresholds
from src.model_training import load_ranker
from src.plan_processing import load_and_validate_plans
from src.recommendation import recommend_plans

PLANS_PATH = os.path.join(os.path.dirname(__file__), "data", "plans.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "ranker.json")
THRESHOLDS_PATH = os.path.join(os.path.dirname(__file__), "models", "thresholds.json")

def generate_explanation(plan, user):
    """
    Generate human-readable AI explanation for plan match
    """
    cap = round(float(plan.get('monthly_data_capacity', 0)), 1)
    data_desc = f"{cap}GB/month" if plan.get('unlimited_data') != 1 else "Unlimited 5G Data"
    budget = user.get('monthly_recharge_amount', 0)
    price = plan.get('price', 0)

    reasons = []
    if budget > 0 and price <= budget:
        reasons.append(f"within your ₹{int(budget)} monthly budget")
    elif budget > 0:
        reasons.append(f"offers high value near your ₹{int(budget)} budget")

    if plan.get('unlimited_5g') == 1:
        reasons.append("includes high-speed Unlimited 5G")
    elif plan.get('total_data_gb', 0) > 0:
        reasons.append(f"provides {plan['total_data_gb']}GB high-speed data")

    if plan.get('unlimited_calls') == 1:
        reasons.append("unlimited nationwide calling")

    if plan.get('ott_benefit') == 1:
        reasons.append("includes premium OTT streaming benefits")

    reason_str = ", ".join(reasons) if reasons else "matches your usage pattern"
    return f"XGBoost ML Recommended: {plan['plan_name']} ({data_desc}) — {reason_str}."

def main():
    try:
        raw_input = ""
        if len(sys.argv) > 1 and sys.argv[1].strip():
            arg = sys.argv[1].strip()
            if os.path.exists(arg):
                with open(arg, 'r', encoding='utf-8') as f:
                    raw_input = f.read()
            else:
                raw_input = arg
        else:
            raw_input = sys.stdin.read()

        if not raw_input.strip():
            raise ValueError("Empty input received")

        user_data = json.loads(raw_input)

        # Parse & set defaults for required input fields
        user = {
            "user_type": int(user_data.get("user_type", 1)),
            "monthly_data_gb": float(user_data.get("monthly_data_gb", 15.0)),
            "total_call_minutes": float(user_data.get("total_call_minutes", 400.0)),
            "sms_per_month": float(user_data.get("sms_per_month", 100.0)),
            "monthly_recharge_amount": float(user_data.get("monthly_recharge_amount", 650.0)),
            "international_call_minutes": float(user_data.get("international_call_minutes", 0.0))
        }

        top_n = int(user_data.get("top_n", 3))

        ranker = load_ranker(MODEL_PATH)
        thresholds = load_thresholds(THRESHOLDS_PATH)
        plans = load_and_validate_plans(PLANS_PATH)

        recommendations_df = recommend_plans(
            ranker,
            user,
            plans,
            thresholds,
            top_n=top_n
        )

        # Merge additional details back from plans dataframe for explanations and UI fields
        merged = recommendations_df.merge(
            plans.drop(columns=["plan_name", "category", "price", "validity_days", "monthly_price"], errors="ignore"),
            on="plan_id"
        )

        results = []

        for idx, row in merged.iterrows():
            r_dict = row.to_dict()

            # Calculate normalized score (0.0 to 1.0) and matchPercent (60 to 99)
            raw_rank = float(r_dict["rank_score"])
            sig_score = 1.0 / (1.0 + math.exp(-raw_rank))
            score = round(min(0.99, max(0.65, sig_score)), 2)
            match_percent = int(score * 100)

            explanation = generate_explanation(r_dict, user)

            results.append({
                "rank": len(results) + 1,
                "planId": str(r_dict["plan_id"]),
                "plan": {
                    "_id": str(r_dict["plan_id"]),
                    "planName": str(r_dict["plan_name"]),
                    "category": str(r_dict["category"]),
                    "price": float(r_dict["price"]),
                    "validityDays": int(r_dict["validity_days"]),
                    "monthlyPrice": float(r_dict["monthly_price"]),
                    "dataGB": float(r_dict.get("total_data_gb", 0)),
                    "callMinutes": 9999 if r_dict.get("unlimited_calls") == 1 else 300,
                    "sms": 100 if r_dict.get("unlimited_calls") == 1 else 50,
                    "roamingIncluded": bool(r_dict.get("isd_minutes", 0) > 0 or r_dict.get("category") == "Professional / Specialised"),
                    "unlimitedData": bool(r_dict.get("unlimited_data") == 1),
                    "unlimited5G": bool(r_dict.get("unlimited_5g") == 1),
                    "sourceOperatorRef": "XGBoost ML Recommendation Engine"
                },
                "score": score,
                "matchPercent": match_percent,
                "rankScore": round(raw_rank, 4),
                "explanation": explanation,
                "source": "xgboost_ml"
            })

        output = {
            "status": "success",
            "source": "xgboost_ml",
            "user": user,
            "plans": results
        }

        print(json.dumps(output, indent=2))

    except Exception as e:
        error_output = {
            "status": "error",
            "message": str(e)
        }
        print(json.dumps(error_output), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
