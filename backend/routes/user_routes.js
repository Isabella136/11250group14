const express = require('express');
const { registerUser } = require("../controllers/user_controllers");
const router = express.Router();

router.route('/').post(registerUser);

module.exports = router;
