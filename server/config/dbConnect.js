const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async ()=>{
  try{
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed!");
  }
}

module.exports = dbConnect;