const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email Exist"],
    },

    password: {
        type: String,
        required: [true, "Please provide Password"],
        unique: false,
    },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);