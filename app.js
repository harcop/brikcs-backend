
if (process.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    require('dotenv-json')();
}
const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors());
app.use(express.json());

const router = require('./src/routes');

const swaggerUIExpress = require("swagger-ui-express");
const swaggerConfig = require("./swagger/config");


app.use("/api/docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerConfig));

app.use('/api', router);

module.exports = app;