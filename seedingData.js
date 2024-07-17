const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const todoModel = require("./models/todo");

async function seedData() {
  // Connection URL
  const uri = "mongodb://localhost:27017/interview";
  const seed_count = 100000;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log("error", err);
    });

  let todoFakeData = [];
  for (let i = 0; i < seed_count; i++) {
    let obj = {
      id: faker.string.uuid(),
      userEmail: faker.internet.email(),
      userName: faker.internet.userName(),
      priority: "High",
      task: "Birthday wish",
      image: faker.image.avatar(),
      createdAt: faker.date.past(),
      processingTime: faker.date.birthdate(),
    };

    todoFakeData.push(obj);
  }

  const seedDB = async () => {
    await todoModel.insertMany(todoFakeData);
  };

  seedDB().then(() => {
    mongoose.connection.close();
    console.log("seed success");
  });
}

seedData();
