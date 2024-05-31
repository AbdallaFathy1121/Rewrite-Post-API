require("dotenv").config();
const express = require("express");
const app = express();
const config = require('./db/dbconfig');
const sql = require('mssql');


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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`));

async function getDepartments(){
  try{
      let pool = await sql.connect(config);
      let departments = await pool.request()
      .query("Select * from users");
      return departments.recordsets;
  }
  catch(error){
      console.log(error);
      throw error;
  }
}

app.get('/', async (req, res) => {
  try {
    //Query to get departments
    await getDepartments().then(result=>{
      res.status(200).json(result);
    })
    } catch (err) {
      res.status(404).send(err.message);
    }
});

app.use((err, req, res, next) => {
    console.error("Global Error", { err }); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Send an error response
});
