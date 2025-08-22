const swaggerJSDocs = require("swagger-jsdoc");
module.exports = swaggerJSDocs({

    swaggerDefinition: {
        openapi: '3.0.2',
        info: {
            version: "1.0.0",
            description: "this is the documentation for brikcs acad",
            title: "brikcs",
            contact: {
                name: "Harcop Toluwap"
            }
        },
        servers: [
            {
                url: `http://localhost:3280/api`,
            }]
    },
    apis: ['./swagger/*.yaml', './src/routes/*.js', "./src/routes/**/*.js"]
});