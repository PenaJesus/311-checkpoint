//brings in express
let express = require("express");

//brings in .env files
require("dotenv").config()

//testing .env 
let test = process.env.secret;

//stores "express" in app, allowing us to use variable
let app = express();

//allows us to use json...must come before routes
app.use(express.json());

//allows us to bring in routes file
let routes = require("./routes")
 app.use(routes);

//allows us to use static file...our "public" file
app.use(express.static("./public"));

//establishes what local port we will be using
let PORT = process.env.PORT;

//allows our app to "listen" for incoming request
app.listen(PORT, function(){
  console.log("app is listening at port", PORT,test)
})