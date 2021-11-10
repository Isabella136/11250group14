const express = require('express');
const {getData, addData, getDataById, updateData, deleteData} = require("../controllers/mockdata_controllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route('/').get(protect, getData)
router.route('/add').post(protect, addData);
router.route('/:id').get(getDataById);
router.route('/:id').delete(protect, deleteData);
//.put(protect, updateData)

//router.route('/');
//router.route('/');
//.put().delete();

module.exports = router;
