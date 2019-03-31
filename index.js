const kue = require("kue");
let jobs = kue.createQueue({
  redis: {
    port: 6379,
    host: "localhost"
  }
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// listen port
app.listen(3000, function() {
  console.log("App started on port :3000");
});

// buka halaman login
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/test.html"));
});

// save clickstream
app.post("/store", function(req, res) {
  console.log("Store Clickstream");
  console.log(req.body);

  jobs
    .create("clickStreamLog", {
      url: req.body.url,
      positionx: req.body.positionx,
      positiony: req.body.positiony,
      elementId: req.body.elementId,
      elementClass: req.body.elementClass
    })
    .save();

  res.json({ message: "200 OK" });
});
