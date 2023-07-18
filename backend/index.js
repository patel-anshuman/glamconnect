const express = require('express');
const app = express();
const cors = require("cors");
const Connection = require('./Configs/db');
const Router = require("./Routes/server.routes");
app.use(cors());
app.use(express.json());
app.use("/", Router);


app.listen(8080, Connection());