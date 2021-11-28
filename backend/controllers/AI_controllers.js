const asyncHandler = require('express-async-handler');

const recommendation = asyncHandler(async (req, res) => {
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["./AImodel/AI_model.py",
        req.user._id]);
    process.stdout.on('data', function (data) {
        result = data.toString();
        if (result.search('true') != -1) {
            res.send("Good job in reducing your carbon footprint! Keep up the great work.");
        }
        else {
            res.send("You can do a much better job at reducing your carbonfootprint. Here is a list of recommendations to follow.");
        }
    })
});
module.exports = recommendation;