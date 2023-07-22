const mongoose = require('mongoose');

const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // Automatically delete documents after 7 days (you can adjust this as needed)
  },
});

const BlacklistModel = mongoose.model('blacklist', BlacklistSchema);

module.exports = BlacklistModel;
