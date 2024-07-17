"use strict";
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const socketio = require("socket.io");
var cron = require("node-cron");

app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:18000"); // for task 2
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With,webToken"
  );

  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

var todoSchema = require(path.resolve("./models/todo.js"));

mongoose.connect("mongodb://localhost:27017/interview");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected to database");
});

app.get("/test", function (req, res) {
  res.send("Hello world");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

const server = app.listen(1337, () => {
  console.log("Server running!");
});

const io = socketio(server);
const toDoController = require("./routes/todo.controller");
const toDoChecking = require("./routes/toDoChecking");
const imageCompress = require("./helper/imageCompress");

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("saveToDo", (data) => {
    toDoController.createToDo(data);
  });

  socket.on("deleteToDo", (id) => {
    toDoController.deleteToDo(id);
  });

  socket.on("pingReadToDo", async () => {
    let data = await toDoController.readToDo();
    socket.emit("pongReadToDo", data);
  });
});

cron.schedule("0 1 * * *", () => {
  // this will run everyday 1 AM
  toDoChecking.checkToDo();
});

module.exports = app;
