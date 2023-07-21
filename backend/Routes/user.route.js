const express = require('express')
const nodemailer = require("nodemailer")
const randomstring = require("randomstring");
const UserModel = require('../Model/user.model')

const userrouter = express.Router()
const bcrypt = require('bcrypt')
const app = express()


const jwt = require('jsonwebtoken')




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


userrouter.post("/register", async (req, res) => {

  try {
    const { name, email, password, role } = req.body;

    const userExist = await UserModel.find({ name, email, password, role });
    if (userExist.length !== 0) {
      return res.status(401).send({ msg: "User Already Registered" });
    }
    const hash = await bcrypt.hash(password, 8);
    const newUser = new UserModel({ name, email, password: hash, role });

    const userData = await newUser.save();
    if (userData) {
      sendVerificationMail(name, email, userData._id);
      res.status(200).json({ msg: "Registration successful", userData });
    } else {
      res.status(401).json({ msg: "Registration failed" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }

})

userrouter.get("/data", async (req, res) => {
  try {
    const users = await UserModel.find()
    res.send("all the users data will be send")
    console.log(users)
  } catch (err) {
    res.send({ "msg": "cannot register", "err": err.message })
  }
});



userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserPresent = await UserModel.findOne({ email });
    if (!isUserPresent) {
      return res.status(401).send("user not found");
    }
    const isPass = await bcrypt.compare(password, isUserPresent.password);
    if (!isPass) {
      return res.status(401).send({ msg: "invalid credential" });
    }
    const token = await jwt.sign(
      {
        userId: isUserPresent._id,
      },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    res.send({
      msg: "login success",
      token,
      username: isUserPresent.name,
      userId: isUserPresent._id,
      isVerified: isUserPresent.isVerified,
      role: isUserPresent.role
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});


const updatePassword = async (password) => {
  try {
    const hasPass = await bcrypt.hash(password, 8);
    return hasPass;
  } catch (error) {
    throw new Error("Failed to hash password");
  }
};




userrouter.get("/reset-password", async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await UserModel.findOne({ token });

    if (tokenData && tokenData._id) {
      console.log(tokenData._id.toString());
      res.cookie("userId", tokenData._id.toString(), { maxAge: 1000 * 60 });

    } else {
      res.status(400).send({ success: false, msg: "This link expired" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

userrouter.post("/change-password", async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      return res.status(400).send({ success: false, msg: "User ID not found" });
    }

    const userToken = await UserModel.findById(userId);
    if (userToken) {
      const password = req.body.password;
      const newPassword = await updatePassword(password);

      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
anshita
      res.status(200).send({ success: true, msg: "Password changed successfully" });
    } else {
      res.status(400).send({ success: false, msg: "This link expired" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

userrouter.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ success: false, msg: "This email doesn't exist" });
    }

    if (!user.isVerified) {
      return res.status(301).send({ success: false, msg: "Please verify your email" });
    }

    const randomString = randomstring.generate();
    await UserModel.updateOne({ email }, { $set: { token: randomString } });
    sendResetPassword(user.username, email, randomString);

    res.status(200).send({ success: true, msg: "Reset password email is sent to your email" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});



userrouter.get("/verify", async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await UserModel.updateOne(
      { _id: userId },
      { $set: { isVerified: true } }
    );
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }

   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userrouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return res.status(403);
    let blackListedToken = new BlackListModel({ token });
    await blackListedToken.save();
    res.send({ msg: "logout succesfull" });
  } catch (error) {
    res.send(error.message);
  }
});

userrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  const deleteUsers = await UserModel.findByIdAndDelete({ _id: id })
  return res.status(200).send({ msg: "User Deleted" })
})

// To send verification link again

userrouter.post("/sendlink", async (req, res) => {
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



module.exports = userrouter