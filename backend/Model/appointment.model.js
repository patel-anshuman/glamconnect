const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message: { type: String },
    professional: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
    paid: { type: Boolean, default: false },
    orderID: { type: String }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
