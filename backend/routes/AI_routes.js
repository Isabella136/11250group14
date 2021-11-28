const express = require('express');
const recommendation = require("../controllers/AI_controllers");

const router = express.Router();

router.route('/rec').get(recommendation);

module.exports = router;