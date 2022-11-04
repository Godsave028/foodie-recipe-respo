const { modelName, create } = require('../Model/category');
const Category = require('../Model/category')
const Recipe = require('../Model/Recipe')

//using async await
const homePage = async (req, res) => {

    try {
        const number = 5
        const categories = await Category.find().limit(number);
        const latestRecipes = await Recipe.find().sort({ createdAt: -1 }).limit(number);
        ///for soup only 
        const soup = await Recipe.find({ Category: 'SOUP' }).sort({ createdAt: -1 }).limit(number);
        //FOR BEANS ONLY
        const beans = await Recipe.find({ Category: 'BEANS' }).sort({ createdAt: -1 }).limit(number);
        //FOR RICE ONLY
        const rice = await Recipe.find({ Category: 'RICE' }).sort({ createdAt: -1 }).limit(number);
        //FOR SNACK ONLY
        const snacks = await Recipe.find({ Category: 'SNACKS' }).sort({ createdAt: -1 }).limit(number);
        //FOR PORRIDGE ONLY
        const porridge = await Recipe.find({ Category: 'PORRIDGE' }).sort({ createdAt: -1 }).limit(number);


        res.render('index', { title: 'home-page', categories, latestRecipes, soup, beans, rice, snacks, porridge });
    }

    catch (err) {
        console.log(err)
    }

}







//or using promises
// const homePage = (req, res) => {
//     Category.find()
//         .then((categories) => {
//             res.render('index', { title: 'Home-page', categories })
//         })

//         .catch((err) => {
//             console.log(err);
//         })

// }



//for exporting the categories page
const allCategoriess = async (req, res) => {
    try {
        const categoriess = await Category.find();
        res.render('category', { title: 'All-categories', categoriess });
    }
    catch (err) {
        console.log(err)
    }
}
//to get all recipes
const allrecipes = async (req, res) => {
    try {
        const recipess = await Recipe.find();
        res.render('recipe', { title: 'All-recipe', recipess });
    }
    catch (err) {
        console.log(err);
    }
}

const getCategoryContent = async (req, res) => {
    try {
        const cate_Name = req.params.cateName;
        const matchingRecipe = await Recipe.find({ Category: cate_Name }).sort({ createdAt: -1 });
        //res.jsonmatchingRecipes;
        res.render('getCategory', { title: 'recipes', matchingRecipe });
    }
    catch (err) {
        console.log(err);
    }
}
const getRecipeDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const details = await Recipe.findById(id);
        // res.json(details);
        res.render('recipeDetails', { title: 'recipe details', details });
    }
    catch (err) {
        console.log(err)
    }
}
const searchRecipe = async (req, res) => {
    try {
        let searcHRecipe = req.body.search;
        //use the  name attribute
        const searcHRecipeCol = await Recipe.find(
            { $text: { $search: searcHRecipe, $diacriticSensitive: true } })
        // res.json(searcHRecipeCol)
        res.render('search', { title: 'search_result', searcHRecipeCol })
    }
    catch (err) {
        console.log(err);
    }
}
const getSubmitRecipe = async (req, res) => {
    try {
        res.render('submitForm', { title: 'submit_recipe' })
    }
    catch (err) {
        console.log(err)
    }
}
const postSubmitRecipe = async (req, res) => {
    let theImage;
    let uploadPath;
    let newImageName;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no file to upload')
    } else {
        theImage = req.files.image;
        newImageName = theImage.name;
        uploadPath = require('path').resolve('./') + 'public/IMG_RECIPE' + newImageName

        theImage.mv(uploadPath, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    try {
        const newRecipe = new Recipe({
            'name': req.body.recipeName,
            'email': req.body.email,
            'description': req.body.description,
            'Category': req.body.category,
            'ingredient': req.body.ingredients,
            'image': newImageName,

        })
        await newRecipe.save();
        res.redirect('/submitRecipe');

    } catch (err) {
        console.log(err)
    }
}
const getEditForm = async (req, res) => {
    const id = req.params.id;
    const toBeEditedRecipe = await Recipe.findById(id);
    res.render('update', { title: 'update_recipe', toBeEditedRecipe })
}


const editRecipe = async (req, res) => {
    let theImage;
    let uploadPath;
    let newImageName;
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('no file to upload')
    } else {
        theImage = req.files.image;
        newImageName = theImage.name;
        uploadPath = require('path').resolve('./') + 'public/IMG_RECIPE' + newImageName

        theImage.mv(uploadPath, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    try {
        let id = req.params.id


        const edit_recipe = await Recipe.findByIdAndUpdate(id);
        edit_recipe.name = req.body.recipeName;
        edit_recipe.description = req.body.description;
        edit_recipe.ingredient = req.body.ingredients;
        edit_recipe.Category = req.body.category;
        edit_recipe.email = req.body.email;
        edit_recipe.image = newImageName;


        await edit_recipe.save();
        res.redirect(`/recipeDetails/${edit_recipe._id}`);
        //res.json(edit_Recipe)
    }
    catch (err) {
        console.log(err)
    }
}
const deleteRecipe = async (req,res) =>{
    let id =req.params.id
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes')

}

module.exports = {
    homePage, allCategoriess, allrecipes, getCategoryContent, getRecipeDetails, searchRecipe, getSubmitRecipe, postSubmitRecipe, getEditForm, editRecipe ,deleteRecipe
}


//insert categories
// const insertCategories = (req, res) => {
//     Category.insertMany([
//         {
//             'name': 'SOUP',
//             'image': 'SOUP.Jpg'
//         },
//        {
//             'name': 'BEANS',
//             'image': 'beans.Jpg'
//         },
//        {
//             'name': 'RICE',
//             'image': 'rice.Jpg'
//         },
//        {
//             'name': 'SNACKS',
//             'image': 'snack.Jpg'
//         },
//        {
//             'name': 'PORRIDGE',
//             'image': 'porridge.Jpg'
//         },
//     ])
// }
// insertCategories()
// for recipe
const insertRecipes = async (req, res) => {
    try {
        await Recipe.insertMany(
            [
                {
                    'name': 'Banga soup',
                    'description': 'soup made from palm fruit blah blah blah',
                    'ingredient': ['palm fruit', 'pepper', 'meat', 'spice'],
                    'Category': 'SOUP',
                    'image': 'food6.jpg',
                    'email': 'victor@gmail.com'
                },
                {
                    'name': 'Fried Beans ',
                    'description': 'beans fried with oil, tomatoes and pepper',
                    'ingredient': ['beans', 'oil', 'pepper', 'tomatoes'],
                    'Category': 'BEANS',
                    'image': 'food7.jpg',
                    'email': 'karo@gmail.com'
                },
                {
                    'name': 'Jollof rice',
                    'description': 'rice made with tomatoes and pepper',
                    'ingredient': ['ginger', 'pepper', 'garlic', 'tomatoes'],
                    'Category': 'RICE',
                    'image': 'food8.jpg',
                    'email': 'PIUS@gmail.com'
                },
                {
                    'name': 'Egg Roll',
                    'description': 'made with flour and egg',
                    'ingredient': ['flour', 'egg', 'sugar', 'water'],
                    'Category': 'SNACKS',
                    'image': 'food9.jpg',
                    'email': 'nero@gmail.com'
                },
                {
                    'name': 'yam porridge',
                    'description': 'made with yam and oil',
                    'ingredient': ['yam', 'pepper', 'meat', 'oil', 'fish'],
                    'Category': 'PORRIDGE',
                    'image': 'food10.jpg',
                    'email': 'karo@gmail.com'
                },
            ]
        )
    }
    catch (err) {
        console.log(err)
    }
}
//  insertRecipes()