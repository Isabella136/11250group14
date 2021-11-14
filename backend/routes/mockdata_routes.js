const express = require('express');
const {getData, addData, getDataById, deleteData, updateData} = require("../controllers/mockdata_controllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route('/').get(protect, getData);
router.route('/add').post(protect, addData);
router.route('/:id').get(getDataById);
router.route('/:id').delete(protect, deleteData);
router.route('/:id').put(protect, updateData);

module.exports = router;
