require("dotenv").config();
const express = require("express");
const cors = require('cors');
const userRouters = require("./routes/usersRoutes");
const subscriptionRouters = require("./routes/subscriptionRoutes");

const app = express();
app.use(express.json());

// Use CORS middleware
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`));

app.use("/user", userRouters);
app.use("/subscription", subscriptionRouters);


app.use((err, req, res, next) => {
    console.error("Global Error", { err }); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Send an error response
});
