const asyncHandler = require('express-async-handler');
const User = require("../models/user_model");
const generateToken = require("../utils/generate_token");
const nodemailer = require("nodemailer");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error("User already exists with that email");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

    //use nodemailer to send email to user on creation of account
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "carbonzeroteam@outlook.com",
        pass: "C@rbon021"
      }
    });

    var mailOptions = {
        from: 'carbonzeroteam@outlook.com', //sender address
        to: user.email, //This can also contain an array of emails
        subject: 'Thanks for registering with CarbonZero',
        //text
        html: '<b style="font-size: 20pt">Welcome to CarbonZero!</b><br><p>You are on your way to a greener lifestyle. Start inputting your carbon footprint data now.</p>' // html body
    };

    //send mail with defined transport object
    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent ' + info.response);
    });

  }

  else {
    res.status(400);
    throw new Error("Error Occured");
  }

});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }

  else {
    res.status(400);
    throw new Error("Invalid email or password");
  }

});

module.exports = { registerUser, authUser };
