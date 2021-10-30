const asyncHandler = require('express-async-handler');
const MockData = require("../models/mockdata_model");
const User = require("../models/user_model");

const getData = asyncHandler(async (req, res) => {
  const data = await MockData.find({user: req.user._id});
  res.json(data);
});

const addData = asyncHandler(async (req, res) => {
  const { elecConsumption, elecCost, waterConsumption,
  waterCost, gasConsumption } = req.body;

  if (!elecConsumption || !elecCost || !waterConsumption || !waterCost || !gasConsumption) {
    throw new Error("Please fill out all fields");
  }

  else {
    const data = new MockData({ user: req.user._id, elecConsumption, elecCost, waterConsumption, waterCost, gasConsumption});
    const dataAdded = await data.save();

    res.status(201).json(dataAdded);
  }
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
