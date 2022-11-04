const express = require('express');
const foodieController = require('../Controller/foodie-controller')
const router = express.Router();

//get home page
router.get('/', foodieController.homePage);
//get all categories page
router.get('/categories', foodieController.allCategoriess);
router.get('/recipes', foodieController.allrecipes);
//get recipe content
router.get('/recipe/:cateName', foodieController.getCategoryContent);
//get recipe details
router.get('/recipeDetails/:id', foodieController.getRecipeDetails);
//search recipe
router.post('/search', foodieController.searchRecipe);
//get submit form
router.get('/submitRecipe',foodieController.getSubmitRecipe);
//Post submit form
router.post('/submitRecipe',foodieController.postSubmitRecipe);
//to get edit a recipe form
router.get ('/editRecipe/:id',foodieController.getEditForm);
// to edit Recipe
router.put('/editRecipe/:id',foodieController.editRecipe);
//delete recipe
router.delete('/deleteRecipe/:id',foodieController.deleteRecipe)

module.exports = router