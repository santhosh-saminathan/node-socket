"use strict";
const mongoose = require("mongoose");
const ToDoCollection = mongoose.model("ToDo");
const emailNotification = require("./../helper/nodemailer");

var _checkToDo = async () => {
  console.log("checking", new Date());

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log("today", today);

  var todayMidnight = new Date();
  todayMidnight.setHours(24, 0, 0, 0);
  console.log("today night", todayMidnight);

  let todayJobs = await ToDoCollection.find({
    processingTime: { $gte: today, $lt: todayMidnight },
  });

  console.log(todayJobs);

  for await (var job of todayJobs) {
    let sendEmail = await emailNotification.sendEmail(job.userEmail, job.task);
  }
};

module.exports = {
  checkToDo: _checkToDo,
};
