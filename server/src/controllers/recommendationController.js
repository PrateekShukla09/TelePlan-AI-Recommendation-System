const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const Plan = require('../models/Plan');
const Recommendation = require('../models/Recommendation');
const { getMLRecommendations, customerToRecommendationProfile } = require('../services/recommendationEngine');
const { AppError } = require('../utils/errors');

const safeGetDbPlans = async () => {
  if (mongoose.connection.readyState !== 1) {
    return [];
  }
  try {
    return await Plan.find({}).lean();
  } catch (err) {
    console.warn('[DB Query Skipped] Offline or DB unavailable:', err.message);
    return [];
  }
};

const safeSaveRecommendation = async (recData) => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }
  try {
    await Recommendation.create(recData);
  } catch (err) {
    console.warn('[DB Audit Save Skipped]:', err.message);
  }
};

const recommendByCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    let customer = null;
    if (mongoose.Types.ObjectId.isValid(id) && mongoose.connection.readyState === 1) {
      try {
        customer = await Customer.findById(id).lean();
      } catch (err) {
        console.warn('[DB Customer Fetch Skipped]:', err.message);
      }
    }

    const profile = customer ? customerToRecommendationProfile(customer) : {};
    const dbPlans = await safeGetDbPlans();
    let topScored = await getMLRecommendations(profile, dbPlans);

    if (dbPlans && dbPlans.length > 0) {
      topScored = topScored.map(item => {
        const itemPlan = item.plan || item;
        const matchingDbPlan = dbPlans.find(p =>
          p.planName && itemPlan.planName && p.planName.trim().toLowerCase() === itemPlan.planName.trim().toLowerCase()
        );
        if (matchingDbPlan) {
          return {
            ...item,
            planId: matchingDbPlan._id,
            plan: {
              ...itemPlan,
              _id: matchingDbPlan._id
            }
          };
        }
        return item;
      });
    }

    if (customer) {
      await safeSaveRecommendation({
        customerId: customer._id,
        sessionId: null,
        recommendedPlans: topScored.map(item => ({
          planId: item.plan ? (item.plan._id || item.plan.id) : item.planId,
          score: item.score || 0.8,
          explanation: item.explanation || ''
        })),
        source: 'customer'
      });
    }

    res.status(200).json({
      source: 'xgboost_ml',
      plans: topScored
    });
  } catch (error) {
    next(error);
  }
};

const recommendByProfile = async (req, res, next) => {
  try {
    const { profile } = req.body;
    if (!profile || typeof profile !== 'object') {
      return next(new AppError('Profile object is required', 400, 'INVALID_PROFILE'));
    }

    const dbPlans = await safeGetDbPlans();
    let topScored = await getMLRecommendations(profile, dbPlans);

    if (dbPlans && dbPlans.length > 0) {
      topScored = topScored.map(item => {
        const itemPlan = item.plan || item;
        const matchingDbPlan = dbPlans.find(p =>
          p.planName && itemPlan.planName && p.planName.trim().toLowerCase() === itemPlan.planName.trim().toLowerCase()
        );
        if (matchingDbPlan) {
          return {
            ...item,
            planId: matchingDbPlan._id,
            plan: {
              ...itemPlan,
              _id: matchingDbPlan._id
            }
          };
        }
        return item;
      });
    }

    await safeSaveRecommendation({
      customerId: null,
      sessionId: req.body.sessionId || null,
      recommendedPlans: topScored.map(item => ({
        planId: item.plan ? (item.plan._id || item.plan.id) : item.planId,
        score: item.score || 0.8,
        explanation: item.explanation || ''
      })),
      source: 'chat_profile'
    });

    res.status(200).json({
      source: 'xgboost_ml',
      plans: topScored
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recommendByCustomer,
  recommendByProfile
};
