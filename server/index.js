const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const urlRoutes = require("./routes/Url");
const dbConnect = require("./config/dbConnect");
// const { requestLogger, errorLogger } = require("../../logging/backend.js");

const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));

// app.use(requestLogger);
// app.use(errorLogger);

// routes
app.use("/shorturls", urlRoutes);

// start server
app.listen(PORT, () => {
  console.log("Server running at port:", PORT);
});

// connect db
dbConnect();
