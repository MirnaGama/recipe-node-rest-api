var router = require('express').Router();

// Sync all tables
(async () => {
    const {sequelizeConnect} = require('../../config/db.js');
    try {
        const result = await sequelizeConnect.sync();
    } catch (error) {
        console.log(error);
    }
})();

router.use((req, res, next) => {
    if (req.cookies.SessionCookie && !req.session.user) {
        res.clearCookie('SessionCookie');
    }
    next();
});

// Split up route handling
router.use('/auth', require('./auth/auth.js'));
router.use('/user', require('./user/user.js'));
router.use('/recipe', require('./recipe/recipe.js'));
router.use('/recipe/category', require('./recipe/recipeCategory.js'));
router.use('/ingredient/category', require('./ingredient/ingredientCategory.js'));

module.exports = router;
