const express = require("express");
const path = require("path");
const router = express.Router();

const app = express();
const PORT = 5080;
app.use(bodyParser.json());

const url = "mongodb://localhost:27017";
const dbName = "Wordle";
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect();

// Serve static files from the 'build' directory
app.use(express.static("build"));

// Define API routes
app.get("/api/data", (req, res) => {
  // Handle API request, e.g., fetch data from the database
  res.json({ message: "API response" });
});

// Serve the React app for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-app", "build", "index.html"));
});

app.post("/api/highscores", async (req, res) => {
  try {
    const highscoreData = req.body;
    const db = client.db(dbName);
    const collection = db.collection("highscores");
    await collection.insertOne(highscoreData);
    res.status(201).json({ message: "Highscore submitted successfully" });
  } catch (error) {
    console.error("Error submitting highscore:", error);
    res.status(500).json({ message: "Failed to submit highscore" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
