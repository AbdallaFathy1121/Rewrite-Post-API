require("dotenv").config();
const express = require("express");

const userRouters = require("./routes/usersRoutes");

const app = express();

//middleware to allow connection between front end and backend using the front end ip
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`));

app.use("/user", userRouters);


app.use((err, req, res, next) => {
    console.error("Global Error", { err }); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Send an error response
});
