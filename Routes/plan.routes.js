const express = require('express');
const planRouter = express.Router();
const xlsx = require('node-xlsx').default;
const { createPlan,getUserPlanROI } = require('../Controllers/plan.controller');
const authMiddleware = require("../Middleware/auth.middleware"); 

const User = require('../Models/user.models');
const Transaction = require('../Models/transaction.models');
const Plan = require('../Models/plan.models')


planRouter.post('/createPlan',authMiddleware,createPlan);
planRouter.get('/roi/:userId',authMiddleware,getUserPlanROI);

planRouter.post('/debit', async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ message: 'User ID and amount are required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.totalBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }


        const transaction = new Transaction({
            userId,
            amount,
            type: 'debit',
            totalBalance: user.totalBalance - amount
        });

        await transaction.save();

        user.totalBalance -= amount;
        await user.save();

        res.status(200).json({ message: 'Amount debited successfully', transaction });
    } catch (error) {
        console.error('Error debiting amount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


planRouter.get('/ledger/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transactions = await Transaction.find({ userId }).sort({ date: -1 });
        const plans = await Plan.find({ userId });

        const ledgerData = transactions.map(tx => {
            const plan = plans.find(p => p._id.equals(tx.planId)) || {};
            return [
                tx.date.toLocaleDateString('en-US'),
                tx.type,
                tx.amount.toFixed(2),
                tx.totalBalance ? tx.totalBalance.toFixed(2) : 'N/A',
                plan.investmentAmount ? plan.investmentAmount.toFixed(2) : 'N/A',
                plan.roi ? plan.roi.toFixed(2) : 'N/A',
                plan.investmentDays || 'N/A'
            ];
        });

        
        const headerRow = [`ledger Detail of ${user.name}`];

        const columnHeaders = ['Date', 'Type', 'Amount', 'TotalBalance', 'InvestmentAmount', 'ROI', 'InvestmentDays'];

        const sheetData = [headerRow, columnHeaders, ...ledgerData];

        const ws = xlsx.build([{ name: 'Ledger', data: sheetData }]);

        // Send the file
        res.setHeader('Content-Disposition', 'attachment; filename=ledger.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(ws);

    } catch (error) {
        console.error('Error generating ledger:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

    
    
module.exports = planRouter;