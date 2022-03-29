const express = require("express");
const app = express();
const cors = require("cors");

// HANDLE MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// HANDLE ROUTES
app.use("/auth/login", require("./routes/auth/login"));

// ERROR HANDLE

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
