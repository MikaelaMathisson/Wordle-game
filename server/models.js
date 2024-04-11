const mongoose = require("mongoose");

const highscoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  guessesMade: { type: Number, required: true },
  wordLength: { type: Number, required: true },
  allowRepetition: { type: Boolean, required: true },
  correctWord: { type: String, required: true },
});

const HighscoreItem = mongoose.model("HighscoreItem", highscoreSchema);

module.exports = HighscoreItem;
