const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const crypto = require("crypto");
// const speakeasy = require("speakeasy");
const { Schema } = mongoose;

const emailValidator = {
  validator: function (value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  },
  message: 'Invalid email format',
};

const User = new Schema(
  {
    
    email: {
      type: String,
      trim: true,
      required: true,
      validate: emailValidator,
    },
    // name: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },
    password: {
      type: String,
      trim: true,
      required: true,
      min: 6,
      max: 64,
    },
    role:{
        type:String,
        default:'user',
    },
    twoFactorAuth: {
      enabled: {
        type: Boolean,
        default: false,
      },
      secret: {
        type: String,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

 {
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
 }
);
User.virtual("tasks", {
  ref: "task",
  localField: "_id",
  foreignField: "userID",
  justOne: false,
});

User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const secretSalt = crypto.randomBytes(16).toString("hex");
    const hashedSecret = crypto
      .createHash("sha256")
      .update(secretSalt)
      .digest("hex");
    this.twoFactorAuth.secret = await hashedSecret;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    return next(err);
  }

  next();
});

User.methods.getJsonWebToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRESIN }
  );
  return token;
};
User.methods.generatePasswordChangeToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

User.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', User);
