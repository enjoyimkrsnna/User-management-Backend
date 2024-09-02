const cron = require('node-cron');
const Plan = require('../Models/plan.models');
const Transaction = require('../Models/transaction.models');
const User = require('../Models/user.models');
  
cron.schedule('0 0 * * *', async () => {
    console.log('Checking for expired plans...');
  
    try {
      const expiredPlans = await Plan.find({ planExpiryDate: { $lt: new Date() } });
  
      for (const plan of expiredPlans) {
        const existingTransaction = await Transaction.findOne({ planId: plan._id, type: 'credit' });
  
        if (!existingTransaction) {
          const returnAmount = plan.investmentAmount * (1 + plan.roi / 100);
  
          const lastTransaction = await Transaction.findOne({ userId: plan.userId }).sort({ date: -1 });
  
          const totalBalance = lastTransaction ? lastTransaction.totalBalance + returnAmount : returnAmount;
  
          const transaction = new Transaction({
            userId: plan.userId,
            planId: plan._id,
            type: 'credit',
            amount: returnAmount,
            totalBalance: totalBalance
          });
  
          await transaction.save();

          await User.findByIdAndUpdate(plan.userId, { totalBalance: totalBalance });
  
          console.log(`Transaction created for expired plan: ${plan._id}`);
        }
      }
    } catch (error) {
      console.error('Error checking for expired plans:', error);
    }
  });
  