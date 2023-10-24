const mongoose = require("mongoose");
const crypto = require("crypto");
const modelOptions = require("./ModelOptions");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            required: true,
            select: false,
        },
    },
    modelOptions
);

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.password === hash;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
