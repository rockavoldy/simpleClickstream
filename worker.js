const kue = require("kue");
const cluster = require("cluster");
const jobs = kue.createQueue({
  redis: {
    port: 6379,
    host: "localhost"
  }
});
const mongoose = require("mongoose");
const models = require("./models");
const clickStreamLog = models.clickStreamLog;

let clusterWorkerSize = require("os").cpus().length;

if (cluster.isMaster) {
  // start UI
  kue.app.listen(3001);
  console.log("UI started on port :3001");

  for (let i = 0; i < clusterWorkerSize; i++) {
    cluster.fork();
  }
} else {
  jobs.process("clickStreamLog", 10, function(job, done) {
    console.log("Start to execute clickstream_log jobs...");

    let clickstream_log = new clickStreamLog({
      url: job.data.url,
      positionx: job.data.positionx,
      positiony: job.data.positiony,
      elementId: job.data.elementId,
      elementClass: job.data.elementClass
    });

    clickstream_log.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        setTimeout(function() {
          console.log("Storing clickstream_log is finish: " + job.data.url);
          done();
        }, 100);
      }
    });
  });
}
