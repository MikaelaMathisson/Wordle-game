import mongoose from "mongoose";

const HighscoreItem = new mongoose.Schema({
  name: String,
  timeSpent: Number,
  guessesMade: Number,
  wordLength: Number,
  allowRepetition: Boolean,
  correctWord: String,
});

module.exports = mongoose.model("Highscore".HighscoreItem);
