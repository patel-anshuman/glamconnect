const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  duration: { type: String, required: true },
  moreInfo: { type: String },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
