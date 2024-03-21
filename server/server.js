const express = require("express");
const app = express();
const PORT = 5080;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo"] });
});

app.listen(PORT, () => {
  console.log("Server started on", PORT);
});
