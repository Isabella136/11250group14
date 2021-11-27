const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
//const dbCloudantConnect = require("./config/db");
const userRoutes = require("./routes/user_routes");
const mockdataRoutes = require("./routes/mockdata_routes");
const { notFound, errorHandler } = require("./middlewares/error_middleware");


const app = express();
dotenv.config();
connectDB();
//dbCloudantConnect();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/data", mockdataRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

app.get('/recommendations', recommendation)
function recommendation(req, res) {
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["./AImodel/AI_model.py",
        req.user._id]);
    process.stdout.on('data', function (data) {
        res.send(data.toString());
    })
}
