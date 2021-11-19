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
  const { elecConsumption, elecCost, waterConsumption,
  waterCost, gasConsumption } = req.body;

  const currentTmestamp = Date.now();
  const createdAt = new Date(currentTmestamp);
  const updatedAt = new Date(currentTmestamp);

  connectDB();

  console.log("Creating data document");
  // specify the id of the document so you can update and delete it later
    await db.insert({ _id: createdAt, user: req.user._id, elecConsumption, elecCost, waterConsumption, waterCost, gasConsumption, createdAt: createdAt, updatedAt: updatedAt}, function(err, data) {

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
  const id = req.params.id;

  connectDB();

  db.get(id, (err, data) => {
    if(data) {
      res.json(data);
    }

    else {
      res.status(404).json({ message: "Data not found"});
    }
  });

});

const deleteData = asyncHandler(async (req, res) => {
  const id = req.params.id;

  connectDB();

  db.get(id, function(err, data) {
  if(data) {
    var latestRev = data._rev;
    db.destroy(id, latestRev, function(err, data, header) {
      if(!err) {
          res.status(200).json({ message: "Data successfully deleted"});
      }

      else {
        res.status(404).json({ message: "Data not deleted"});
      }
    });
  }

  else {
    res.status(404).json({ message: "Data not found"});
  }
  });
});

const updateData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { elecConsumption, elecCost, waterConsumption,
  waterCost, gasConsumption } = req.body;
  const currentTmestamp = Date.now();

  connectDB();

  db.get(id, function(err, data) {
  if(data) {
    var latestRev = data._rev;
    const createdAt = data.createdAt;
    const updatedAt = new Date(currentTmestamp);
    db.insert({_id: id, _rev: latestRev, user: req.user._id, elecConsumption, elecCost, waterConsumption, waterCost, gasConsumption, createdAt: createdAt, updatedAt: updatedAt}, function(err, data) {
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
  }
  else {
    res.status(404).json({ message: "Data not found"});
  }
  });
});

module.exports = { getData, addData, getDataById, deleteData, updateData };
