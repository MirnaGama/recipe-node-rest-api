var router = require('express').Router();
const authChecker = require('../auth/authCheckerUtil.js');

const IngredientCategory = require('../../../model/IngredientCategory.js');
const IngredientCategoriesController = require('../../../controller/IngredientCategory.js'); // import
const IngredientCategoryController = new IngredientCategoriesController(IngredientCategory);

require('express-group-routes');

router.group((router) => {
    router.use(authChecker.auth);    // * authorize()

    router.get('/findByPk', async (req, res) => {
        await IngredientCategoryController.getById(req.body.id).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByWhere', async (req, res) => {
        const where = req.body;
        await IngredientCategoryController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await IngredientCategoryController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

})

module.exports = router;