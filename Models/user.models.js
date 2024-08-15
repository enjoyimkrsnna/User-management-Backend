const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter the email"],
            unique: true
        },

        password: {
            type: String,
            required: [true, "Please enter Password"]
        },

        name: {
            type: String,
            required: false
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: false
        }
    }
);

const User = mongoose.model("User",UserSchema);

module.exports = User;