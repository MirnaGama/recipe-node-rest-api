var router = require('express').Router();
const authChecker = require('../auth/authCheckerUtil.js');

const Recipe = require('../../../model/Recipe.js'); // import
const RecipesController = require('../../../controller/Recipe.js'); // import
const RecipeController = new RecipesController(Recipe);

const RecipeCategory = require('../../../model/RecipeCategory.js');
const RecipeCategoriesController = require('../../../controller/RecipeCategory.js'); // import
const RecipeCategoryController = new RecipeCategoriesController(RecipeCategory);

require('express-group-routes');

router.group((router) => {
    router.use(authChecker.auth);    // * authorize()

    router.get('/findByPk', async (req, res) => {
        await RecipeController.getById(req.body.id).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByWhere', async (req, res) => {
        const where = req.body;
        await RecipeController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await RecipeController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByCategory', async (req, res) => {
        const where = req.body;

        let categoryResponse = await RecipeCategoryController.getByWhere(where);
        categoryResponse = JSON.parse(JSON.stringify(categoryResponse));

        const {data} = categoryResponse;

          await RecipeController.getByWhere({"recipeCategoryId": data[0].id }).then(RecipeResponse => {
            res.status(RecipeResponse.statusCode)
            res.json(RecipeResponse.data)
        })
    });

    router.post('/create', async (req, res) => {
        let recipeBody = req.body;
        
        let Recipe = {
            'userId': req.session.user.id,
            ...recipeBody
        };

        await RecipeController.create(Recipe).then(async response => {
            res.status(response.statusCode);
            res.json(response.data);

        });
    });

    router.post('/update', async (req, res) => {
        await RecipeController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await RecipeController.delete(req.body.id).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;