// highscoreRoutes.js

const express = require("express");
const router = express.Router();
const path = require("path");
const HighscoreItem = require("../models");

router.get("/api/highscores", async (req, res) => {
  try {
    const highscores = await HighscoreItem.find();
    res.json(highscores);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/api/highscores", async (req, res) => {
  try {
    const newHighscore = new HighscoreItem(req.body);
    await newHighscore.save();
    res.status(201).json(newHighscore);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
