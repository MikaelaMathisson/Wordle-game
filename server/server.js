const express = require("express");
const path = require("path");
const router = express.Router();
import bodyParser from "body-parser";
import { HighscoreItem } from "./src/models";

app.use(bodyParser.json());

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Wordle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Serve the React app for any other requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "my-app", "build", "index.html"));
});

router.get("api/highscores", async (req, res) => {
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
    res.json(newHighscore);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// Serve static files from the 'build' directory
app.use(express.static("build"));

// Start the server
app.listen(5080);
