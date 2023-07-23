const express = require("express");
//Middlewares
const { auth } = require("../Middlewares/auth.middleware");
const { roleAuth } = require("../Middlewares/role.auth.middleware");
//Models
const User = require('../Model/user.model');
const Professional = require('../Model/professional.model');

const adminRouter = express.Router();      //Admin router

// 1. Get all users' details
adminRouter.get('/user', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Get all professionals' details
adminRouter.get('/professional', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. Create a professional
adminRouter.post('/professional', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const professional = await Professional.create(req.body.payload);
    res.status(201).json(professional);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// 5. Edit any data of a user
adminRouter.put('/user/:userID', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const userID = req.params.userID;
    const updatedUser = await User.findByIdAndUpdate(userID, req.body.payload, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// 6. Edit any data of a professional
adminRouter.put('/professional/:userID', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const userID = req.params.userID;
    const updatedProfessional = await Professional.findByIdAndUpdate(userID, req.body.payload, { new: true });
    res.status(200).json(updatedProfessional);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// 7. Delete any user
adminRouter.delete('/user/:userID', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const userID = req.params.userID;
    await User.findByIdAndDelete(userID);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// 8. Delete any professional
adminRouter.delete('/professional/:userID', auth, roleAuth(["admin"]), async (req, res) => {
  try {
    const userID = req.params.userID;
    await Professional.findByIdAndDelete(userID);
    res.status(200).json({ message: 'Professional deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = adminRouter;