let express = require("express");

//created a router method
let router = new express.Router();

//brings in our controller file
let controller = require("./controllers")

//gets all recipes using our imported controller
router.get("/recipes", controller.getRecipes);

//gets the recipe with given id
router.get("/recipes/:id", controller.getOneRecipe);

//adds a recipe
router.post("/recipes", controller.addRecipe);

//updates the recipe with given id
router.put("/recipes/:id", controller.updateRecipe);

//deletes the recipe with given id
router.delete("/recipes/:id", controller.deleteRecipe)

 //allows our router to be used in other files 
module.exports = router