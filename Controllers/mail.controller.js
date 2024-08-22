const nodemailer = require('nodemailer');
const User = require("../Models/user.models.js"); 


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.SENDER_EMAIL, 
        pass: process.env.SENDER_PASSWORD 
    }
});


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Your Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

//request for otp
const requestOTP = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendOTPEmail(user.email, otp);
        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify OTP and change password
const changePassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP is valid and not expired
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.password = newPassword;
        user.set({ otp: undefined, otpExpires: undefined });
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    requestOTP,
    changePassword
};
