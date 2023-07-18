const mongoose = require('mongoose');
require('dotenv').config();
const Connection = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_URU);
    console.log("Server Started at PORT 8080");
}
module.exports = Connection;