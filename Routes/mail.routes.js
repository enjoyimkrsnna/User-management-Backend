const express = require("express");
const mailrouter = express.Router();

const { requestOTP, changePassword} = require("../Controllers//mail.controller.js")
 
 //mail and otp routes
 mailrouter.get('/request-otp',requestOTP);
 mailrouter.put('/change-password',changePassword);


 module.exports = mailrouter;