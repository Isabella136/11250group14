const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../../../backend/models/user_model");

dotenv.config();

describe('Authenticate user from database', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    //db = await connection.db(global.__MONGO_DB_NAME__);
    //db = await mongoose.connect(process.env.MONGO_URI);
  });

  //afterAll(async () => {
    //await connection.close();
  //});

  it('Inputs valid email and password and returns "User found"', async () => {
    const testUser = {email: 'carbonzeroteam@outlook.com', password: 'C@rbon021'};
    var message = null;

    const user = await User.findOne({email: 'carbonzeroteam@outlook.com'});

    if(user && (await user.matchPassword(testUser.password))) {
      message = "User found";
    }

    else {
      message = "Invalid email or password";
    }

    expect(message).toEqual("User found");
  });

  it('Inputs invalid email and returns "carbonzero@outlook.com"', async () => {
    const testUser = {email: 'carbonzero@outlook.com', password: 'C@rbon021'};
    var message = null;

    const user = await User.findOne({email: 'carbonzero@outlook.com'});

    if(user && (await user.matchPassword(testUser.password))) {
      message = "User found";
    }

    else {
      message = "Invalid email or password";
    }

    expect(message).toEqual("Invalid email or password");
  });

  it('Inputs valid email but invalid password returns "carbonzero@outlook.com"', async () => {
    const testUser = {email: 'carbonzeroteam@outlook.com', password: 'Carbon021'};
    var message = null;

    const user = await User.findOne({email: 'carbonzeroteam@outlook.com'});

    if(user && (await user.matchPassword(testUser.password))) {
      message = "User found";
    }

    else {
      message = "Invalid email or password";
    }

    expect(message).toEqual("Invalid email or password");
  });
});
