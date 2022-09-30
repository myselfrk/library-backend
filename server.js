const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require('./dbConnect');
const routes = require('./routes');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "Library Management API"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],

    },
    apis: ["./controllers/*.js"]
}

const specs = swaggerJsDoc(options)

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use('/api', routes)
    .use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.get("/", (req, res) => {
    res.send("....")
})

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);

