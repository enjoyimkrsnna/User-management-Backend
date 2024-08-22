const Plan = require('../Models/plan.models');

// Create a new plan
const createPlan = async (req, res) => {

    try {
        const { userId, investmentAmount, investmentDays, roi, planStartDate } = req.body;
        
        if (!userId || !investmentAmount || !investmentDays || !roi || !planStartDate) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        
        const [day, month, year] = planStartDate.split('/');
        const formattedStartDate = `${year}-${month}-${day}`;
        const startDate = new Date(formattedStartDate);
    
        if (isNaN(startDate)) {
          return res.status(400).json({ message: 'Invalid planStartDate format' });
        }
    
        // Calculate planExpiryDate based on investmentDays
        const planExpiryDate = new Date(startDate);
        planExpiryDate.setDate(planExpiryDate.getDate() + investmentDays);
    
        const plan = new Plan({
          userId,
          investmentAmount,
          investmentDays,
          roi,
          planStartDate: startDate,
          planExpiryDate: planExpiryDate
        });
    
        const savedPlan = await plan.save();
        res.status(201).json({ message: 'Plan created successfully', plan: savedPlan });
      } catch (error) {
        console.error('Error creating plan:', error);
        res.status(500).json({ error: 'An error occurred while creating the plan' });
      }
    
};

// Get ROI for a specific user's investment in a plan
const getUserPlanROI = async (req, res) => {
    const { userId } = req.params;
    try {
      const plans = await Plan.find({ userId });
  
      if (!plans.length) return res.status(404).json({ message: 'No plans found for this user' });
  
      const roiDetails = plans.map(plan => {
       
        const returnAmount = plan.investmentAmount * (1 + plan.roi / 100);
        const roi = ((returnAmount - plan.investmentAmount) / plan.investmentAmount) * 100;
  
        // Format dates
        const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
  
        return {
          planId: plan._id,
          investmentAmount: plan.investmentAmount,
          investmentDays: plan.investmentDays,
          planStartDate: formatDate(plan.planStartDate),
          planExpiryDate: formatDate(plan.planExpiryDate),
          roi: roi.toFixed(2), 
          returnAmount: returnAmount.toFixed(2) 
        };
      });
  
      res.status(200).json({ roiDetails });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createPlan,
    getUserPlanROI
}