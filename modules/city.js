const mongoose = require("mongoose");
const cityrSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String,
});
const city = mongoose.model("city", cityrSchema);

module.exports = city;
