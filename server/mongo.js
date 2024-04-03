const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
  allowRepetition: Boolean,
  correctWord: String,
  guessesMade: Number,
  name: String,
  timeSpent: Number,
  wordLength: Number,
});

const HighscoreModel = mongoose.model("Wordle", highscoreSchema);

module.exports = HighscoreModel;
