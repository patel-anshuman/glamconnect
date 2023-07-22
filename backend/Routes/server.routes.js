const express = require("express");
const mongoose = require("mongoose");
const Category = require("../Model/category.model");
const Appointment = require("../Model/appointment.model");
const Professional = require("../Model/professional.model");
const Service = require("../Model/service.modal");
const { auth } = require("../Middlewares/auth.middleware");

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

Router.get("/", auth, (req, res) => {
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
            name,
            email,
            phone,
            date,
            time,
            message,
            professionalId,
            serviceId,
            userID,
        } = req.body;
        const newAppointment = new Appointment({
            name,
            email,
            phone,
            user: userID,
            date,
            time,
            message,
            professional: professionalId,
            service: serviceId,
        });

        const savedAppointment = await newAppointment.save();
        const createdAppointment = await Appointment.findById(newAppointment._id).populate("professional").populate("service");
        // res.status(201).json(createdAppointment);

        const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New Appointment Booking</title>
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
                color:white;
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
            <h1>New Appointment Booking</h1>
            <div class="appointment-details">
                <p>Hello ${createdAppointment.professional.name},</p>
                <p>You have a new appointment booking:</p>
                <ul>
                    <li><strong>Service:</strong> ${createdAppointment.service.name}</li>
                    <li><strong>Duration:</strong> ${createdAppointment.service.duration}</li>
                    <li><strong>Price:</strong> ${createdAppointment.service.amount}</li>
                    <li><strong>Date:</strong> ${createdAppointment.date}</li>
                    <li><strong>Time:</strong> ${createdAppointment.time}</li>
                </ul>
                <p>Please go on the website for more details and to accept/reject the appointment.</p>
                <p>If you have any questions or concerns, please feel free to contact us.</p>
            </div>
            <p>Best regards,</p>
            <p>Your Team at Glam Connect</p>
            <!-- You can also add a call-to-action button if needed -->
            <a class="cta-button" href="http://localhost:3000/Appointment/${createdAppointment._id}">GO TO APPOINTMENT PAGE</a>
        </body>
        </html>
        `;
        const mailOptions = {
            from: "glamconnect18@gmail.com",
            to: createdAppointment.professional.email,
            subject: "New Appointment Booking  <Read Required>",
            html: emailHTML,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
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
Router.put("/appointment/:appointmentId", auth, async (req, res) => {
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
                <a href="http://localhost:3000">GlamConnect</a>
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
module.exports = Router;
