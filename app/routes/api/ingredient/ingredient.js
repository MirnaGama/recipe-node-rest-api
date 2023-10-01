var router = require('express').Router();
const authChecker = require('../auth/authCheckerUtil.js');

const Ingredient = require('../../../model/Ingredient.js'); // import
const IngredientsController = require('../../../controller/Ingredient.js'); // import
const IngredientController = new IngredientsController(Ingredient);

const IngredientCategory = require('../../../model/IngredientCategory.js');
const IngredientCategoriesController = require('../../../controller/IngredientCategory.js'); // import
const IngredientCategoryController = new IngredientCategoriesController(IngredientCategory);

require('express-group-routes');

router.group((router) => {
    router.use(authChecker.auth);    // * authorize()

    router.get('/findByPk', async (req, res) => {
        await IngredientController.getById(req.body.id).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByWhere', async (req, res) => {
        const where = req.body;
        await IngredientController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByCategory', async (req, res) => {
        const where = req.body;

        let categoryResponse = await IngredientCategoryController.getByWhere(where);
        categoryResponse = JSON.parse(JSON.stringify(categoryResponse));

        const {data} = categoryResponse;

          await IngredientController.getByWhere({"ingredientCategoryId": data[0].id }).then(ingredientResponse => {
            res.status(ingredientResponse.statusCode)
            res.json(ingredientResponse.data)
        })
    });

    router.get('/findAll', async (req, res) => {
        await IngredientController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', async (req, res) => {
        await IngredientController.create(req.body).then(async response => {
            res.status(response.statusCode);
            res.json(response.data);

        });
    });

    router.post('/update', async (req, res) => {
        await IngredientController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', async (req, res) => {
        await IngredientController.delete(req.body.id).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

})

module.exports = router;