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

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Inputs valid email and password and returns "User found"\n', async () => {
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

  it('Inputs invalid email and returns "Invalid email or password"\n', async () => {
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

  it('Inputs valid email but invalid password returns "Invalid email or password"\n', async () => {
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

  it("No email or password is entered returns 'Invalid email or password' errorMessage and accountCreated is false\n", async () => {
    const testUser = {email: '', password: ''};
    var message = null;

    const user = await User.findOne({email: ''});

    if(user && (await user.matchPassword(testUser.password))) {
      message = "User found";
    }

    else {
      message = "Invalid email or password";
    }

    expect(message).toStrictEqual("Invalid email or password");
  });
});
