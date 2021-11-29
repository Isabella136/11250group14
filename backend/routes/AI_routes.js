const express = require('express');
const { protect } = require("../middlewares/authMiddleware");
const recommendation = require("../controllers/AI_controllers");

const router = express.Router();

router.route('/').get(protect, recommendation);

module.exports = router;