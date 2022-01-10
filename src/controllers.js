// // const res = require("express/lib/response");
let db = require("./db")

//get all items in my database
let getRecipes = function(req,res){
  
  console.log("GET Recipes")

  //sql query that grabs all items from our recipes table
  let sql = "select * from recipes;"

  //how our db handles our get request.
  //first process the sql query then checks params  
  db.query(sql, [], function(error,rows){

    //if cannot connect to db this will log it to the console and display error
    if(error){
      console.log("failed to connect to database ", error)
      res.sendStatus(500)

      //if connects to the db this will respond back with all rows in our db
    } else{
      res.json(rows);
    }
})
}

//GET the recipe with specified id
let getOneRecipe = function(req,res){

//storing our id from paramaters as a variable for future use
  let id = req.params.id

//creating our sql query that is looking for a specific id
let sql = "select * from recipes where id = ?;"

//the paramaters our db query will be looking for
//only stored id as its the only paramater we are focused on
let params = [id]

//our basic db query that uses our sql statement and params given to find the specific recipe
db.query(sql, params, function(error, rows){
  if(error){
    console.log("failed to connect to database ", error)
    res.sendStatus(500)
  }else {
    console.log("Got recipe with specified id")
    res.json(rows)
  }
})
}

//POST adds an item to db
let addRecipe = function(req,res){

  //stores the body of request in input variable for future use
  let input = req.body;

  //query statement to add item to db
  //the first set of parenthesis are the fields and the second set are the values we will be inputing
  //the "?" is used as a place holder 
  let sql = "insert into recipes (recipe_name,ingredients,qty) values (?,?,?)"

  //creating a "params" array which is allowing us to push our set values
  let params = []

  //using dot notation to access the keys of our body and pushing them into params array
  params.push(input.recipe_name)
  params.push(input.ingredients)
  params.push(input.qty)

  //processing our db query
  //first looking at our sql query then using our params array to add new item to db
  db.query(sql, params, function(error, rows){
    if(error){
      console.log("Could not add recipe", error)
    } else {
      console.log("Added items successfully")
      res.sendStatus(202)
    }
  })
}

//PUT method allows us to update recipe at given id
let updateRecipe = function(req,res){
  
  //storing our id set in params
  let id = req.params.id;

  //storing our body inside input var
  let input = req.body;

  //assigning our body keys to new variables. 
  //we are saying the "ingredients" of our "body" will be "newIngredient"
  let newRecipeName = input.recipe_name;
  let newIngredient = req.body.ingredients;
  let newqty = input.qty
  
  //our sql query to update items given specific fields
  let sql = "update recipes set recipe_name = ?, ingredients = ?, qty =? where id = ?;"
  
  //defining our new variables inside the params
  let params = [
    newRecipeName,
    newIngredient,
    newqty,
    id
  ];

  db.query(sql,params, function(error, rows){
    if(error){
      console.log("Could not update item ", error);
      res.sendStatus(500);
    } else {
      console.log("Update Successfull");
      res.sendStatus(202);
    }
  })
}

// deletes recipe with given id
//***this one I am stuck on
//first we want to know what id we are working with so store that(Line 127)
//second we want to create a sql query that deletes specified id from our table(Line 124)
let deleteRecipe = function(req,res){
  
  let id = req.params.id

  let sql = "DELETE FROM recipes WHERE id = ?"

  db.query(sql,[id], function(error, rows){
    if(error){
      console.log("Could not delete item", error)
      res.sendStatus(500);
    }else {
      console.log("Recipe Deleted Successfully");
      res.sendStatus(202);
    }
  })
}

//exporting our functions and allowing use in other files
module.exports = {
  getRecipes, addRecipe, updateRecipe, getOneRecipe, deleteRecipe
}