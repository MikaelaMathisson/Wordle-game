const express = require("express");
const path = require("path");

const app = express();
const PORT = 5080;

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
