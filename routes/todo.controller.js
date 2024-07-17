"use strict";
const mongoose = require("mongoose");
const ToDoCollection = mongoose.model("ToDo");

var _createToDo = async (todoData) => {
  try {
    console.log("function called", todoData);

    if (!todoData.userEmail || !todoData.task) {
      throw "Required fields missing";
    }

    let currentRecords = await ToDoCollection.find().countDocuments();

    let obj = {
      id: currentRecords + 1,
      userEmail: todoData.userEmail,
      userName: todoData.userName,
      task: todoData.task,
      priority: todoData.priority,
      createdAt: new Date(Date.now()),
      processingTime: new Date(todoData.dueDate),
    };

    let data = new ToDoCollection(obj);
    let storedData = await data.save();

    console.log("Data stored, ", storedData);
  } catch (error) {
    console.log("error", error);
  }
};

const _readToDo = async () => {
  try {
    let recentRecords = await ToDoCollection.find().sort({ _id: -1 }).limit(10);
    return recentRecords;
  } catch (error) {
    console.log("error", error);
  }
};

const _updateToDo = (updatedData) => {};

const _deleteToDo = async (dataId) => {
  try {
    if (!dataId) {
      throw "Id is missing";
    }
    let deleteRecord = await ToDoCollection.findOneAndDelete({ id: dataId });
    console.log(deleteRecord);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  createToDo: _createToDo,
  readToDo: _readToDo,
  updateToDo: _updateToDo,
  deleteToDo: _deleteToDo,
};
