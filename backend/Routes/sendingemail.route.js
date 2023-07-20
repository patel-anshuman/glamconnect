// routes/emails.js
const express = require('express');
const MaiLRouter = express.Router();
const nodemailer = require('nodemailer');
const Appointment = require('../Model/appointment.model');
const Professional = require('../Model/professional.model');

// Configure Nodemailer transporter (replace with your own email settings)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'glamconnect18@gmail.com',
        pass: 'fbjryezlklsmqnpo'
    }
});
// POST /api/emails/send-booking-notification
MaiLRouter.post('/send-booking-notification', async (req, res) => {
    try {
        // const { professionalId, appointmentId } = req.body;

        // // Fetch the appointment details from the database
        // const appointment = await Appointment.findById(appointmentId)
        //     .populate('user', 'email')
        //     .populate('service', 'name duration price');

        // if (!appointment) {
        //     return res.status(404).json({ message: 'Appointment not found.' });
        // }

        // // Fetch the beauty professional's email from the database
        // const beautyProfessional = await BeautyProfessional.findById(professionalId);

        // if (!beautyProfessional) {
        //     return res.status(404).json({ message: 'Beauty professional not found.' });
        // }

        // Compose the email message
        const mailOptions = {
            from: 'glamconnect18@gmail.com',
            to: 'jha.chakresh2001@gmail.com',
            subject: 'New Appointment Booking  <Read Required>',
            html: `<p>Hello Chakresh,</p>
             <p>You have a new appointment booking:</p>
             <p>Service: XYZ</p>
             <p>Duration: 100 minutes</p>
             <p>Price: $550</p>
             <p>Date: 12/12/12</p>
             <p>Please login to your account for more details and to accept/reject the appointment.</p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email.' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully.' });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'An error occurred.' });
    }
});

MaiLRouter.post('/send-acceptance-notification', async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        // Fetch the appointment details from the database
        const appointment = await Appointment.findById(appointmentId)
            .populate('user', 'email')
            .populate('service', 'name duration price');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // Fetch the user's email from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compose the email message
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: user.email,
            subject: 'Appointment Accepted',
            html: `<p>Hello ${user.username},</p>
               <p>Your appointment has been accepted:</p>
               <p>Service: ${appointment.service.name}</p>
               <p>Duration: ${appointment.service.duration} minutes</p>
               <p>Price: $${appointment.service.price}</p>
               <p>Date: ${appointment.date}</p>
               <p>Please login to your account for more details.</p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email.' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully.' });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'An error occurred.' });
    }
});

module.exports = MaiLRouter;