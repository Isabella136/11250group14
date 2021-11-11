const asyncHandler = require('express-async-handler');
const MockData = require("../models/mockdata_model");
const User = require("../models/user_model");
const Cloudant = require('@cloudant/cloudant');

var cloudant;
var db;

const connectDB = () => {
  cloudant = new Cloudant({ url: 'https://ca4957e3-35db-48ae-b830-5f66e31f42be-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'B5rN-V2C8VsmoVl4iXlGFNwqeZsjVBx36CvRwXz0bPEQ' }  } });
  db = cloudant.db.use("data");
};

const getData = asyncHandler(async (req, res) => {
  //const data = await MockData.find({user: req.user._id});
  connectDB();

  var query = {
    "selector": {
      "user": req.user._id
    },
    "fields": ["_id", "elecConsumption", "elecCost", "waterConsumption", "waterCost", "gasConsumption"]
  };

  await db.find(query, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);

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

  //var cloudant = new Cloudant({ url: 'https://ca4957e3-35db-48ae-b830-5f66e31f42be-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'B5rN-V2C8VsmoVl4iXlGFNwqeZsjVBx36CvRwXz0bPEQ' }  } });
  //var db = cloudant.db.use("data");

  connectDB();

  console.log("Creating data document");
  // specify the id of the document so you can update and delete it later
  await db.insert({ user: req.user._id, elecConsumption, elecCost, waterConsumption, waterCost, gasConsumption}, function(err, data) {
    console.log('Error:', err);
    console.log('Data:', data);

    if(data) {
      var responseJson =
      {
        "elecConsumption": elecConsumption,
        "elecCost": elecCost,
        "waterConsumption": waterConsumption,
        "waterCost": waterCost,
        "gasConsumption": gasConsumption
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
