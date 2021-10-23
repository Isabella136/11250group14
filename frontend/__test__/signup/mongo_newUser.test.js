const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../../../backend/models/user_model");

dotenv.config();

describe('Insert new user into database', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    //delete inserted user after each test for next test
    await User.deleteOne({email: 'jennie@gmail.com'});
    await mongoose.connection.close();
  });

  it('Inserts a valid new user into database, returns same user when email is searched\n', async () => {
    //const users = connection.collection('users');

    //assuming password meets requirements
    const mockUser = {name: 'Jennie', email: 'jennie@gmail.com', password: 'Jennie123'};

    await User.create(mockUser);

    const insertedUser = await User.findOne({email: 'jennie@gmail.com'});
    expect([insertedUser.name, insertedUser.email]).toEqual([mockUser.name, mockUser.email]);

  });

  it('Tries to insert a new user with email already in-use, returns error\n', async () => {
    //const users = connection.collection('users');

    //assuming password meets requirements
    const mockUser = {name: 'Jesy', email: 'test@example.com', password: 'Jessyyy123'};
    var errorMessage = null;

    try {
      await User.create(mockUser);
    }

    catch (MongoServerError) {
      errorMessage = "Email already in use";
    }
    expect(errorMessage).toEqual("Email already in use");
  });
});
