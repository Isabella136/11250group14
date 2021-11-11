const mongoose = require("mongoose");
const Cloudant = require('@cloudant/cloudant');
const vcap = require('../../vcap-local.json');
var cfenv = require("cfenv");

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    //console.log(conn.connection.host); // localhost
    //console.log(conn.connection.port); // 27017
    //console.log(conn.connection.name); // myDatabase


  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }

  //cloudant database connection
  var cloudant = new Cloudant({ url: 'https://ca4957e3-35db-48ae-b830-5f66e31f42be-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'B5rN-V2C8VsmoVl4iXlGFNwqeZsjVBx36CvRwXz0bPEQ' }  } });
  cloudant.db.list(function(err, body) {
    body.forEach(function(db) {
      console.log(db);
      });
  });
};

module.exports = connectDB;
