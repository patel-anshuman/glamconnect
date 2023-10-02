const express = require("express");
const mongoose = require("mongoose");
const Category = require("../Model/category.model");
const Appointment = require("../Model/appointment.model");
const UserModel = require("../Model/user.model")
const Professional = require("../Model/professional.model");
const Service = require("../Model/service.modal");
const { auth } = require("../Middlewares/auth.middleware");
const bcrypt = require("bcrypt");
// const crypto = require('crypto');
const nodemailer = require("nodemailer");
const Router = express.Router();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "glamconnect18@gmail.com",
        pass: "fbjryezlklsmqnpo",
    },
});

Router.get("/", (req, res) => {
    res.status(200).send("Welcome to GlamGuru Backend");
});

Router.get("/professionals", async (req, res) => {
    try {
        const professionals = await Professional.find()
            .populate("services")
            .populate("category");
        res.json(professionals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
Router.get("/professionals/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const professionals = await Professional.find({ category })
            .populate("services")
            .populate("category");
        res.json(professionals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

Router.post("/professionals", async (req, res) => {
    const professional = new Professional(req.body);
    try {
        const newProfessional = await professional.save();
        res.status(201).json(newProfessional);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
Router.delete("/professionals/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Professional.findByIdAndDelete(id);
        res.json({ message: "Professional deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
Router.put("/professionals/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        res.json(updatedProfessional);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
Router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res
            .status(500)
            .json({ message: "An error occurred while fetching categories." });
    }
});

Router.post("/categories", async (req, res) => {
    try {
        const categories = Category(req.body);
        await categories.save();
        res.json(categories);
    } catch (error) {
        console.error("Error Posting categories:", error);
        res
            .status(500)
            .json({ message: "An error occurred while posting categories." });
    }
});
Router.get("/appointment/:appointmentId", async (req, res) => {
    const { appointmentId } = req.params;
    try {
        const appointments = await Appointment.findById(appointmentId)
            .populate("professional")
            .populate("service")
            .populate("user");
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ message: "some error occurred", error });
    }
});
Router.post("/appointment", auth, async (req, res) => {
    try {
        const {
            date,
            time,
            message,
            professionalId,
            serviceId,
            userID,
        } = req.body;
        const newAppointment = new Appointment({
            user: userID,
            date,
            time,
            message,
            professional: professionalId,
            service: serviceId,
        });

        const savedAppointment = await newAppointment.save();
        const createdAppointment = await Appointment.findById(newAppointment._id).populate("professional").populate("service").populate("user");
        const emailHTML2 = `<!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Booking Details</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                    color: #333;
                }
        
                .container {
                    background-color: #fff;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }
        
                h1 {
                    font-size: 28px;
                    margin-bottom: 20px;
                    color: #6b46c1;
                }
        
                p {
                    margin: 0 0 10px;
                    color: #555;
                }
        
                .appointment-details {
                    border-bottom: 2px solid #6b46c1;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }
        
                .appointment-details p {
                    margin: 0;
                }
        
                .cta-button {
                    display: inline-block;
                    background-color: #6b46c1;
                    color: #fff;
                    padding: 12px 24px;
                    border-radius: 5px;
                    text-decoration: none;
                }
        
                .cta-button:hover {
                    background-color: #4a2d8c;
                }
        
                .cta-link {
                    color: #007bff;
                    text-decoration: none;
                }
        
                .cta-link:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Appointment Accepted</h1>
                <div class="appointment-details">
                    <p>Hello <strong>${createdAppointment.user.name}</strong>,</p>
                    <p>Your appointment has been accepted:</p>
                    <ul>
                        <li><strong>Service:</strong> ${createdAppointment.service.name}</li>
                        <li><strong>Duration:</strong> ${createdAppointment.service.duration}</li>
                        <li><strong>Price:</strong> ${createdAppointment.service.amount}</li>
                        <li><strong>Date:</strong> ${createdAppointment.date}</li>
                        <li><strong>Time:</strong> ${createdAppointment.time}</li>
                    </ul>
                    <p>We are looking forward to seeing you soon!</p>
                    <p>Please go to the website and in the appointment section, <strong>select the payment method</strong>:</p>
                    <a class="cta-link" href="https://glamconnect.vercel.app">GlamConnect</a>
                </div>
                <p>Best regards,</p>
                <p>Your Team at Glam Connect</p>
            </div>
        </body>
        </html>        
        `;
        const mailOptions2 = {
            from: "glamconnect18@gmail.com",
            to: createdAppointment.user.email,
            subject: "New Appointment Booking  <Read Required>",
            html: emailHTML2,
        };
        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email." });
            }
            console.log("Email sent:", info.response);
            res.status(200).json({
                message: "Appointment has been booked and Email sent successfully.",
            });
        });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res
            .status(500)
            .json({ message: "An error occurred while creating the appointment." });
    }
});
Router.put("/appointment/:appointmentId", async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const { status } = req.body;
        const appointment = await Appointment.findById(appointmentId).populate("professional").populate("service");
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }
        appointment.status = status;
        const updatedAppointment = await appointment.save();

        if (status == "accepted") {
            const userEmailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Accepted</title>
            <style>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    margin: 0;
    margin-bottom: 10px;
}

.appointment-details {
    background-color: #6b46c1;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.appointment-details p {
    margin: 0;
}

.cta-button {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
}
</style>
        </head>
        <body>
            <h1>Appointment Accepted</h1>
            <div class="appointment-details">
                <p>Hello ${appointment.user.name},</p>
                <p>Your appointment has been accepted:</p>
                <ul>
                    <li><strong>Service:</strong> ${appointment.service.name}</li>
                    <li><strong>Duration:</strong> ${appointment.service.duration}</li>
                    <li><strong>Price:</strong> ${appointment.service.amount}</li>
                    <li><strong>Date:</strong> ${appointment.date}</li>
                    <li><strong>Time:</strong> ${appointment.time}</li>
                </ul>
                <p>We are looking forward to seeing you soon!</p>
                <p>Please go to the website and in the appointment section. <strong>select the payment method</strong></p>
                <a href="https://glamconnect.vercel.app">GlamConnect</a>
            </div>
            <p>Best regards,</p>
            <p>Your Team at Glam Connect</p>
        </body>
        </html>
        `;

            const userMailOptions = {
                from: 'glamconnect18@gmail.com',
                to: appointment.email,
                subject: 'Appointment Accepted <Read Required>',
                html: userEmailHTML,
            };
            transporter.sendMail(userMailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ message: "Error sending email." });
                }
                console.log("Email sent:", info.response);
                res.status(200).json({
                    message: "Appointment has been accepted and Email sent successfully.",
                });
            });
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).json({
            message: "An error occurred while updating appointment status.",
        });
    }
});
Router.delete("/appointment/:appointmentId", async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }
        await appointment.remove();
        res.status(200).json({ message: "Appointment canceled successfully." });
    } catch (error) {
        console.error("Error canceling appointment:", error);
        res
            .status(500)
            .json({ message: "An error occurred while canceling the appointment." });
    }
});
Router.post("/service", async (req, res) => {
    try {
        const { name, amount, duration, moreInfo } = req.body;
        const service = new Service({
            name,
            amount,
            duration,
            moreInfo,
        });
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        console.error("Error posting service:", error);
        res
            .status(500)
            .json({ message: "An error occurred while post the service." });
    }
});
Router.post("/add", async (req, res) => {
    const data = await Professional.insertMany(req.body);
    res.send(data);
});
Router.get("/api/appointment/booked", auth, async (req, res) => {
    const { userID } = req.body;

    try {
        const appoint = await Appointment.find({ user: userID }).populate("professional").populate("service");
        res.json({ appoint })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
})
// const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

Router.post("/orders", async (req, res) => {
    const { amount, appointmentID } = req.body;
    // console.log("order-route", req.body)
    try {
        const instance = new Razorpay({
            key_id: "rzp_test_YKejJgzYAHnIpL",
            key_secret: "1ZYkw0NnToOoQL5zlzcsl5Vb",
        });
        const appointment = await Appointment.findById(appointmentID);
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, async (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            appointment.orderID = order.id;
            await appointment.save();

            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

Router.post('/payment/verify', async (req, res) => {

    res.status(200).json({ message: 'Payment verified successfully' });
});

Router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000;

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();
        let emialHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
        
          <div style="padding: 20px;">
            <h2>Password Reset</h2>
            <p>Hello ${user.name},</p>
            <p>Click the link below to reset your password:</p>
            <p><a href="https://glamconnect.vercel.app/reset-password/${resetToken}" style="text-decoration: none; background-color: #3498db; color: white; padding: 10px 20px; border-radius: 5px;">Reset Your Password</a></p>
            <p>If you didn't request a password reset, you can ignore this email.</p>
            <p>Best regards,<br>GlamConnect</p>
          </div>
        </body>
        </html>
        `
        const mailOptions2 = {
            from: "glamconnect18@gmail.com",
            to: email,
            subject: "Reset Password Link <Read Required>",
            html: emialHtml,
        };
        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email." });
            }
            console.log("Email sent:", info.response);
            res.json({ message: 'Reset link sent successfully.' });
        });

    } catch (error) {
        console.error('Error sending reset link:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

Router.post('/reset-password', async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({
            resetToken,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token.' });
        }

        // Update the user's password
        const salt = +process.env.salt;
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
module.exports = Router;
