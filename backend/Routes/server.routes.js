const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Welcome to GlamGuru Backend");
})







module.exports = Router;