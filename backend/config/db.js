const mongoose = require("mongoose");
const Cloudant = require('@cloudant/cloudant');

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
  var cloudant = new Cloudant({ url: 'https://apikey-v2-32u42j8nnmw8i8o5isa5k73r0zzzcnthi8w7g6c9wnjk:cd7bb0894a63217aff203c2b862ad2fe@172c271b-e2fa-4804-8a56-13d4306682be-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'SVp5S642HYROYgP3TTSMPdqPWzC3iLZERAPFu_yCV_vn' }  } });
  console.log("Cloudant Databases Found: ")
  cloudant.db.list(function(err, body) {
    body.forEach(function(db) {
      console.log(db);
      });
  });
};

module.exports = connectDB;
