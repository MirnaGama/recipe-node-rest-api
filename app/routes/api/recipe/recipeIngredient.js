var router = require('express').Router();
const authChecker = require('../auth/authCheckerUtil.js');

const RecipeIngredient = require('../../../model/RecipeIngredient.js'); // import
const RecipeIngredientsController = require('../../../controller/RecipeIngredient.js'); // import
const RecipeIngredientController = new RecipeIngredientsController(RecipeIngredient);

const Recipe = require('../../../model/Recipe.js'); // import
const RecipesController = require('../../../controller/Recipe.js'); // import
const RecipeController = new RecipesController(Recipe);


require('express-group-routes');

router.group((router) => {
    router.use(authChecker.auth);    // * authorize()

    router.get('/findByPk', async (req, res) => {
        await RecipeIngredientController.getById(req.body.id).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByWhere', async (req, res) => {
        const where = req.body;
        await RecipeIngredientController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByRecipe', async (req, res) => {
        const where = req.body;

        let recipeResponse = await RecipeController.getByWhere(where);
        recipeResponse = JSON.parse(JSON.stringify(recipeResponse));

        const {data} = recipeResponse

        console.log(data)

        await RecipeIngredientController.getByWhere({"recipeId": data[0].id }).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await RecipeIngredientController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await RecipeIngredientController.create(req.body, {include: [Recipe, Ingredient]}).then(async response => {
            res.status(response.statusCode);
            res.json(response.data);

        });
    });

    router.post('/update', async (req, res) => {
        await RecipeIngredientController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await RecipeIngredientController.delete(req.body.id).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;