const asyncHandler = require('express-async-handler');
const MockData = require("../models/mockdata_model");
const User = require("../models/user_model");
const Cloudant = require('@cloudant/cloudant');

var cloudant;
var db;

const connectDB = () => {
  var cloudant = new Cloudant({ url: 'https://apikey-v2-32u42j8nnmw8i8o5isa5k73r0zzzcnthi8w7g6c9wnjk:cd7bb0894a63217aff203c2b862ad2fe@172c271b-e2fa-4804-8a56-13d4306682be-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'SVp5S642HYROYgP3TTSMPdqPWzC3iLZERAPFu_yCV_vn' }  } });
  db = cloudant.db.use("data");
};

const getData = asyncHandler(async (req, res) => {
  //const data = await MockData.find({user: req.user._id});
  connectDB();

  var query = {
    "selector": {
      "user": req.user._id
    },
    "fields": ["_id", "elecConsumption", "elecCost", "waterConsumption", "waterCost", "gasConsumption", "createdAt", "updatedAt"]
  };

  await db.find(query, function(err, data) {
    res.json(data.docs);
  });
});

const addData = asyncHandler(async (req, res) => {
  /*const { elecConsumption, elecCost, waterConsumption,
  waterCost, gasConsumption } = req.body;

  if (!elecConsumption || !elecCost || !waterConsumption || !waterCost || !gasConsumption) {
    throw new Error("Please fill out all fields");
  }

  else {
    const data = new MockData({ user: req.user._id, elecConsumption, elecCost, waterConsumption, waterCost, gasConsumption});
    const dataAdded = await data.save();

    res.status(201).json(dataAdded);
  }*/

  const { elecConsumption, elecCost, waterConsumption,
  waterCost, gasConsumption } = req.body;

  const currentTmestamp = Date.now();
  const createdAt = new Date(currentTmestamp);
  const updatedAt = new Date(currentTmestamp);

  //var cloudant = new Cloudant({ url: 'https://ca4957e3-35db-48ae-b830-5f66e31f42be-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'B5rN-V2C8VsmoVl4iXlGFNwqeZsjVBx36CvRwXz0bPEQ' }  } });
  //var db = cloudant.db.use("data");

  connectDB();

  console.log("Creating data document");
  // specify the id of the document so you can update and delete it later
  await db.insert({ user: req.user._id, elecConsumption, elecCost, waterConsumption, waterCost, gasConsumption, createdAt: createdAt, updatedAt: updatedAt}, function(err, data) {

    if(data) {
      var responseJson =
      {
        "elecConsumption": elecConsumption,
        "elecCost": elecCost,
        "waterConsumption": waterConsumption,
        "waterCost": waterCost,
        "gasConsumption": gasConsumption,
        "createdAt": createdAt,
        "updatedAt": updatedAt
      };

      res.status(200);
      res.json(responseJson);
    }
  });
});

const getDataById = asyncHandler(async (req, res) => {
  const data = await MockData.findById(req.params.id);

  if(data) {
    res.json(data);
  }

  else {
    res.status(404).json({ message: "Data not found"});
  }

});

module.exports = { getData, addData, getDataById };
