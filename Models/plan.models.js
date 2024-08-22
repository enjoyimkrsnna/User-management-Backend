const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  investmentAmount: {
    type: Number,
    required: true
  },
  investmentDays: {
    type: Number,
    required: true
  },
  roi: {
    type: Number,
    required: true
  },
  planStartDate: {
    type: Date,
    required: true
  },
  planExpiryDate: {
    type: Date,
  }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;
