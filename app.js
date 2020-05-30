require('./db');

const express = require("express");
const app = express();
const morgan = require("morgan");

const noteRoutes = require('./routes/noteRoute')
const authRoutes = require('./routes/authroute')

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', authRoutes)
app.use('', noteRoutes)

module.exports = app;