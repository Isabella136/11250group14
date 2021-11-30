const asyncHandler = require('express-async-handler');
const { PythonShell } = require('python-shell');


const recommendation = asyncHandler(async (req, res) => {
    var AImodel = "AI_model.py";
    var options = {
        mode: 'text',
        scriptPath: 'backend/AImodel/',
        args: [req.user._id]
    };
    PythonShell.run(AImodel, options, function (err, results) {
        if (err) throw err;
        console.log('results: %j', results);
        var reductionMessage;
        if (results.toString().search('True') != -1) {
            reductionMessage = "Good job in reducing your carbon footprint! Keep up the great work.";
        }
        else if (results.toString().search('False') != -1) { 
            reductionMessage = "You can do a much better job at reducing your carbonfootprint. Here is a list of recommendations to follow.";
        }
        else { //allocated CUH exceeded
            reductionMessage = "Sorry, the allocated CUH has been exceeded";
        }
        var responseJson =
        [{
            "reductionMessage": reductionMessage
        }];
        res.status(200);
        res.json(responseJson);
    });
});
module.exports = recommendation;