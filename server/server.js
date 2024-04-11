const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const HighscoreItem = require("./models");
const highscoreRoutes = require("./routes/highscoreRoutes");
const handlebars = require("handlebars");

const app = express();

// Register the stringify helper
handlebars.registerHelper("stringify", function (context) {
  return JSON.stringify(context);
});

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: false, // Disable layout file
    allowProtoMethodsByDefault: true, // Add this option to allow prototype methods
    allowProtoPropertiesByDefault: true,
  })
);
app.set("view engine", ".hbs");
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/Wordle", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const HTML_PATH = path.join(__dirname, "public");

app.get("/about", (req, res) => {
  // Läs innehållet från HTML-filen för about-sidan
  const aboutHTML = path.join(HTML_PATH, "about.html");
  res.sendFile(aboutHTML);
});
app.use(express.static(HTML_PATH));

// Define route to fetch and display highscores
app.get("/highscores", async (req, res) => {
  try {
    const highscores = await HighscoreItem.find()
      .sort({ score: -1 })
      .limit(10)
      .lean();

    // Log the retrieved highscores array
    console.log("Retrieved highscores:", highscores);

    // Sort the highscores based on time spent in ascending order
    // and then by guesses made in ascending order
    highscores.sort((a, b) => {
      if (a.timeSpent !== b.timeSpent) {
        return a.timeSpent - b.timeSpent;
      } else {
        return a.guessesMade - b.guessesMade;
      }
    });
    // Render the highscores template with the retrieved data
    res.render("highscores", { highscores });
  } catch (err) {
    console.error("Error fetching highscores:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Serve the React app for any other requests
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(highscoreRoutes);

// Serve static files from the 'build' directory
app.use(express.static("build"));
// Start the server
app.listen(5080);
