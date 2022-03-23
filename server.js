const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK bro" });
});
app.post("/login", async (req, res) => {
  res.status(200).json({ message: "got ya" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
