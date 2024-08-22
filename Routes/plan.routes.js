const express = require('express');
const planRouter = express.Router();
const { createPlan,getUserPlanROI } = require('../Controllers/plan.controller');
const authMiddleware = require("../Middleware/auth.middleware"); 

planRouter.post('/createPlan',authMiddleware,createPlan);
planRouter.get('/roi/:userId',authMiddleware,getUserPlanROI);

module.exports = planRouter;