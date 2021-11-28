const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user_routes");
const mockdataRoutes = require("./routes/mockdata_routes");
const AI_route = require(".routes/AI_routes");
const { notFound, errorHandler } = require("./middlewares/error_middleware");


const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/data", mockdataRoutes);
app.use("/api/data",AI_route);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));


