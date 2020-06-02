// require('./database/db');
require('./database/firestoredb')
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc')
const noteRoutes = require('./routes/noteRoute')
const authRoutes = require('./routes/authroute')

// app.use('/api-docs', swaggerUi.serve)
// app.use('/api-docs', swaggerUi.setup(swaggerDocument));


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Note Taking Api',
            description: "Simple Note Taking API",
            servers: ['http://localhost:5000']
        }
    },
    apis: ["./routes/*.js"]
}



const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));



app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', authRoutes)
app.use('', noteRoutes)

module.exports = app;