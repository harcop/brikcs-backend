
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    require('dotenv-json')();
}
const express = require('express');
const app = express();
const cors = require('cors');

const whitelist = ["https://brikcs.netlify.app"];

const corsOptions = {

    origin (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            return callback(null, true);
        } 
        return callback(new Error('Not allowed by CORS'));
    }
};


app.use(express.json());
app.use(cors()); 
// app.use(cors(corsOptions));

const router = require('./src/routes');

const swaggerUIExpress = require("swagger-ui-express");
const swaggerConfig = require("./swagger/config");


app.use("/api/docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerConfig));

app.use('/api', router);

module.exports = app;