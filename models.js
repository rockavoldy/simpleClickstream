const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/simpleClickstream", {
  useNewUrlParser: true
});

let clickStreamLogSchema = new Schema({
  url: String,
  positionx: String,
  positiony: String,
  elementId: String,
  elementClass: String,
  createdAt: Date
});

clickStreamLogSchema.pre("save", function(next) {
  let currentDate = new Date();
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }
  next();
});

let clickStreamLog = mongoose.model("clickStreamLog", clickStreamLogSchema);

module.exports = {
  clickStreamLog
};
