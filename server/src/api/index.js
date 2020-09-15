const express = require("express");

const project = require("./../constants/project");
const teams = require("./teams/teams.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use("/teams", teams);

module.exports = router;
