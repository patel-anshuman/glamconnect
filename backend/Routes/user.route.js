const express = require("express");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const UserModel = require("../Model/user.model");
const Professional = require('../Model/professional.model');
const { auth } = require("../Middlewares/auth.middleware");
// const { roleAuth } = require("../Middlewares/role.auth.middleware");
const BlackListModel = require("../Model/blacklist.model");

require("dotenv").config();

const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//---------------------- OAuth GMail -------------------------
const sendVerificationMail = async (name, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "glamconnect18@gmail.com",
        pass: "fbjryezlklsmqnpo",
      },
    });

    const mailOptions = {
      from: "prashantkad240999@gmail.com",
      to: email,
      subject: "For verification mail",
      html: `<p>Hi ${name}, please click here to <a href="http://localhost:8080/user/verify?id=${userId}">verify</a> your mail</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendResetPassword = async (username, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "prashantkad240999@gmail.com",
        pass: "decehtqforbxpjza",
      },
    });

    const mailOptions = {
      from: "prashantkad240999@gmail.com",
      to: email,
      subject: "For reset password",
      html: `<p>Hi ${username}, please click here to <a href="http://localhost:8080/user/reset-password?token=${token}">reset </a> your password</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// User Manual Signup
userRouter.post("/register", async (req, res) => {
  try {
    const { name, phoneNumber, email, password, role } = req.body;

    // Check if the user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already registered! Please login." });
    }

    const salt = +process.env.salt;
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      phoneNumber,
      email,
      password: hash,
      role,
    });

    // Save the user to the database
    const userData = await newUser.save();

    if (userData) {
      // You can send the verification email asynchronously, as it might take time.
      // sendVerificationMail(name, phoneNumber, email, userData._id);

      // Return a success response
      res.status(200).json({ msg: "Registration successful", userData });
    } else {
      // In case the user could not be saved to the database
      res.status(500).json({ msg: "Registration failed" });
    }
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ msg: "Internal Server Error", "error": error.message });
  }
});

//Get user data for navbar & dashboard
userRouter.get("/data", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send("all the users data will be send");
    console.log(users);
  } catch (err) {
    res.send({ msg: "cannot register", err: err.message });
  }
});

// User Manual Login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists by email
    const isUserPresent = await UserModel.findOne({ email });
    if (!isUserPresent) {
      return res.status(401).json({ msg: "User not registered! Please signup." });
    }

    // Compare the provided password with the hashed password in the database
    const isPass = await bcrypt.compare(password, isUserPresent.password);
    if (!isPass) {
      return res.status(401).json({ msg: "Wrong credentials" });
    }

    // Generate a JWT token with the user ID and other necessary data
    const token = jwt.sign(
      {
        userID: isUserPresent._id,
        role: isUserPresent.role,
        currentTime: Date.now()
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Return a success response with the token and user data
    res.status(200).json({
      msg: "Login Success",
      token,
      name: isUserPresent.name,
      phoneNumber: isUserPresent.phoneNumber,
      email: isUserPresent.email,
      userID: isUserPresent._id,
      isVerified: isUserPresent.isVerified,
      role: isUserPresent.role,
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const updatePassword = async (password) => {
  try {
    const hasPass = await bcrypt.hash(password, process.env.salt);
    return hasPass;
  } catch (error) {
    throw new Error("Failed to hash password");
  }
};

userRouter.post('/data', auth, async (req, res) => {
  try {
    const { userID } = req.body;

    // Find the user by userID in the database
    const user = await UserModel.findById(userID);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Extract the necessary user data
    const userData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    };

    // Return the user data in the response
    res.status(200).json(userData);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

userRouter.post("/reset-password", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Check if the token exists in the headers
    if (!token) {
      return res.status(401).json({ success: false, msg: "Authorization token missing" });
    }

    // Extract the token value from the "Authorization" header (e.g., "Bearer <token>")
    const tokenValue = token.split(" ")[1];

    // Verify the token and extract the user ID from it
    const decodedToken = jwt.verify(tokenValue, process.env.SECRET);
    const userId = decodedToken.userId;

    // Check if the user exists by the extracted user ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Check if the token has expired (if required)
    // Add additional logic if the token has an expiry date and needs to be checked for expiration

    // Set a secure http-only cookie with the user ID to use it in the frontend for the password reset
    res.cookie("userId", userId, { httpOnly: true, secure: true });

    // Optionally, you can send the user ID to the frontend and handle the password reset UI there

    // Return a success response
    res.status(200).json({ success: true, msg: "Token verified and user ID set in the cookie" });
  } catch (error) {
    // Handle token verification errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ success: false, msg: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ success: false, msg: "Invalid token" });
    } else {
      // Handle any unexpected errors
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  }
});

userRouter.post("/change-password", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Check if the token exists in the headers
    if (!token) {
      return res.status(401).json({ success: false, msg: "Authorization token missing" });
    }

    // Extract the token value from the "Authorization" header (e.g., "Bearer <token>")
    const tokenValue = token.split(" ")[1];

    // Verify the token and extract the user ID from it
    const decodedToken = jwt.verify(tokenValue, process.env.SECRET);
    const userId = decodedToken.userId;

    // Check if the user exists by the extracted user ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const newPassword = req.body.password;

    // Validate the new password (add any required validations)
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, msg: "Password should be at least 8 characters long" });
    }

    // Hash the new password
    const hash = await bcrypt.hash(newPassword, process.env.salt);

    // Update the user's password in the database
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );

    // Optionally, you can invalidate the user's existing tokens to enforce re-authentication
    // Add additional logic if you want to invalidate existing tokens

    // Return a success response
    res.status(200).json({ success: true, msg: "Password changed successfully" });
  } catch (error) {
    // Handle token verification errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ success: false, msg: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ success: false, msg: "Invalid token" });
    } else {
      // Handle any unexpected errors
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  }
});

userRouter.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ success: false, msg: "This email doesn't exist" });
    }

    if (!user.isVerified) {
      return res
        .status(301)
        .send({ success: false, msg: "Please verify your email" });
    }

    const randomString = randomstring.generate();
    await UserModel.updateOne({ email }, { $set: { token: randomString } });
    sendResetPassword(user.username, email, randomString);

    res.status(200).send({
      success: true,
      msg: "Reset password email is sent to your email",
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

userRouter.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Check if the token exists in the headers
    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    // Extract the token value from the "Authorization" header (e.g., "Bearer <token>")
    const tokenValue = token.split(" ")[1];

    // Verify the token and extract the user ID from it
    const decodedToken = jwt.verify(tokenValue, process.env.SECRET);
    const userId = decodedToken.userId;

    // Update the user's verification status in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { isVerified: true } },
      { new: true }
    );

    // Check if the user exists and was successfully updated
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already verified
    if (updatedUser.isVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }

    // Return a success response if the user was verified successfully
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    // Handle token verification errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ error: "Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ error: "Invalid token" });
    } else {
      // Handle any unexpected errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ msg: "Missing token in headers" });
    }
    token = token.split(" ")[1];
    await BlackListModel.create({ token });   // Save the blacklisted token in the database
    res.status(200).json({ msg: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleteUsers = await UserModel.findByIdAndDelete({ _id: id });
  return res.status(200).send({ msg: "User Deleted" });
});

// To send verification link again

userRouter.post("/sendlink", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      sendVerificationMail(user.name, user.email, user._id);
      res.status(200).send({ msg: "Verification mail sent to your mail" });
    } else {
      res.status(400).send({ msg: "This mail don't exist" });
    }
  } catch (error) { }
});



module.exports = userRouter;
