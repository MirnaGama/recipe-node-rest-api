var router = require('express').Router();
const authChecker = require('../auth/authCheckerUtil.js');

const RecipeCategory = require('../../../model/RecipeCategory.js');
const RecipeCategoriesController = require('../../../controller/RecipeCategory.js'); // import
const RecipeCategoryController = new RecipeCategoriesController(RecipeCategory);

require('express-group-routes');

router.group((router) => {
    router.use(authChecker.auth);    // * authorize()

    router.get('/findByPk', async (req, res) => {
        await RecipeCategoryController.getById(req.body.id).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findByWhere', async (req, res) => {
        const where = req.body;
        await RecipeCategoryController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await RecipeCategoryController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

})

module.exports = router;