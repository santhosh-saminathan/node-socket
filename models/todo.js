const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: { type: String },
  userEmail: { type: String, required: true },
  userName: { type: String },
  task: { type: String, required: true },
  image: { type: String, required: false },
  priority: { type: String },
  createdAt: { type: Date },
  processingTime: { type: Date, required: true },
});

const ToDoModel = mongoose.model("ToDo", todoSchema);
module.exports = ToDoModel;
