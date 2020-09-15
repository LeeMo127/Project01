const express = require("express");

const queries = require("./teams.queries");

const router = express.Router();

// TODO: actually call the queries
router.get("/", async (req, res) => {
  const teams = await queries.find();
  res.json(teams);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const error = new Error("Invalid ID");
      res.status(422);
      throw error;
    } else {
      const teams = await queries.get(req.params.id);
      if (team) {
        return res.json(team);
      }
      return next();
    }
  } catch (error) {
      next(error);
  }
});

module.exports = router;
