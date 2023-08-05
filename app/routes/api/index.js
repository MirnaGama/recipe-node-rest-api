var router = require('express').Router();

router.use((req, res, next) => {
    if (req.cookies.SessionCookie && !req.session.user) {
        res.clearCookie('SessionCookie');
    }
    next();
});

module.exports = router;
