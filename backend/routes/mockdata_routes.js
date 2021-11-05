const express = require('express');
const {getData, addData, getDataById} = require("../controllers/mockdata_controllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route('/').get(protect, getData);
router.route('/add').post(protect, addData);
router.route('/:id').get(getDataById);
//.put().delete();

module.exports = router;