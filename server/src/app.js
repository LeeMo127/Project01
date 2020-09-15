const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

const project = require("./constants/project");
const middlewares = require("./middlewares");
const api = require("./api");


const app = express();
app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: project.message,
    });
});

app.use("/api/v1", api);

// TODO: Add middleware error handling

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


module.exports = app;