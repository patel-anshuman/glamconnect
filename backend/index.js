const express = require('express');
const cors = require("cors");
require("dotenv").config()

// Import custom route modules
const Router = require("./Routes/server.routes"); // Import server routes
const userRoute = require("./Routes/user.route"); // Import user routes
const adminRoute = require("./Routes/admin.route");
const MaiLRouter = require('./Routes/sendingemail.route'); // Import email sending routes

const { auth } = require('./Middlewares/auth.middleware');

const app = express(); // Create an Express app

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON parsing for request bodies

app.use("/", MaiLRouter); // Use email sending routes for the root path
app.use("/user", userRoute); // Use user routes for the "/user" path
app.use("/", Router); // Use server routes for the root path
app.use("/admin", adminRoute);   // Use admin routes for the "/admin" path

// Import database connection configuration
const Connection = require('./Configs/db');
app.listen(8080, Connection()); // Start the server and listen on port, establishing a database connection
