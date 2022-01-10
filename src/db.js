//allows us to use mySQL
const mysql = require("mysql");

//brings in variables from ".env" file
require("dotenv").config()

//connecting to database
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
})

connection.query("SELECT now()", [], function(error, results){
  if(error){
    console.log("Could not connect to the database");
  }else {
    console.log("Connection made, result = ", results);
  }
})

module.exports = connection