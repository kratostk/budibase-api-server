const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK bro! :)" });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== "test" || password !== "12345") {
    res.status(400).send(false);
  } else {
    res.status(200).send(true);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
