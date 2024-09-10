const User=require('../model/authModel')
const {hashPassword, comparePassword}=require('../middlewares/auth')
const jwt=require("jsonwebtoken")
const asyncHandler=require('../middlewares/asyncHandler')
const MyError=require('../utils/myError')
const crypto = require("crypto");
const speakeasy = require("speakeasy");



exports.invite = asyncHandler(async (req, res, next) => {
  console.log('invite ', req.body);
  const { email } = req.body;

  if (!email) {
    return res.json({ error: "Имэйл шаардлагатай" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
       message: console.log( "Энэ имэйлтэй хэрэглэгч олдсонгүй",
        )
      });
    }
    return res.json({ success: "Invitation sent successfully", user: existingUser });
  } catch (error) {
    console.error("Error sending invitation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


exports.register = asyncHandler(async (req, res, next) => {   
    console.log('Received Request:', req.body);    
    const { name, email, password, enable2FA } = req.body;
    const user = await User.create({
      // name: name,
      email: email,
      password: password,
      twoFactorAuth: {
        enabled: enable2FA,
        secret: enable2FA ? speakeasy.generateSecret().base32 : undefined,
      },
    });
    const secretBase = speakeasy.generateSecret().base32;
    
    res.status(200).send({
      success: "register",
      user,
      // token,
      secretBase,
    });
  });
  
  exports.verify = asyncHandler(async (req, res, next) => {
    const { email, token, secret } = req.body;
    console.log(email);
    if (!email || !token) {
      throw new MyError("Имэйл болон баталгаажуулах токенээ оруулна уу", 400);
    }
  
    const user = await userModel.findOne({
      email: email,
    });
  
    if (!user) {
      throw new MyError("Имэйл хаяг буруу байна", 400);
    }
  
    if (!user.twoFactorAuth.enabled) {
      throw new MyError(
        "Two-factor authentication is not enabled for this user",
        400
      );
    }
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 1,
    });
  
    if (!verified) {
      throw new MyError("Баталгаажуулах токен буруу байна", 400);
    }
  
    user.twoFactorAuth.enabled = true;
    await user.save();
  
    res.status(200).send({
      success: true,
      message: "Хэрэглэгч амжилттай баталгаажуулагдлаа.",
    });
  });
 



  exports.SignIn = asyncHandler(async (req, res, next) => {
    console.log('signin', req.body);
    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                success: false,
                error: 'Email does not exist'
            });
        }

        const match = await comparePassword(password, findUser.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                error: 'Incorrect password'
            });
        }

        const token = jwt.sign(
            { id: findUser._id, email: findUser.email, role: findUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            findUser: {
                _id: findUser._id,
                email: findUser.email,
                role: findUser.role
            },
            token
        });
        console.log('token', token);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});




// exports.signup = async (req, res) => {
//     console.log("Signup Hit");
//     try {
//     const { name, email, password, enable2FA } = req.body;
//     if (!name) {
//     return res.json({
//     error: "Name is required",
//     });
//     }
//     if (!email) {
//     return res.json({
//     error: "Email is required",
//     });
//     }
//     if (!password || password.length < 6) {
//     return res.json({
//     error: "Password is required and should be 6 characters long",
//     });
//     }
//     const exist = await User.findOne({ email });
//     if (exist) {
//     return res.json({
//     error: "Email is taken",
//     });
//     }
//     // hash password
//     const hashedPassword = await hashPassword(password);
//     try {
//     const user = await new User({
//     name,
//     email,
//     password: hashedPassword,
//     twoFactorAuth: {
//         enabled: enable2FA,
//         secret: enable2FA ? speakeasy.generateSecret().base32 : undefined,
//       },
//     }).save();
//     const { password, ...rest } = user._doc;
//     return res.json({
//     user: rest,
//     });
//     } catch (err) {
//     console.log(err);
//     }
//     } catch (err) {
//     console.log(err);
//     }
//     };