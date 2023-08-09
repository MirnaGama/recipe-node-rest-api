const User = require('../../../model/User.js');

const UsersController = require('../../../controller/User.js');

var router = require('express').Router();

const authChecker = require('../auth/authCheckerUtil.js');

const UserController = new UsersController(User);
require('express-group-routes');

router.group((router) => {
    router.use(authChecker.auth);    // * authorize()

    router.post('/findByPk', authChecker.validateParams([
        {
            paramKey: 'user_id',
            required: true,
            type: 'number',
        },
    ]), async (req, res) => {
        await UserController.getById(req.body.userId).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await UserController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await UserController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', authChecker.validateParams([
        {
            paramKey: 'username',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'password',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        await UserController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', authChecker.validateParams([
        {
            paramKey: 'userId',
            required: true,
            type: 'number',
        },
        {
            paramKey: 'username',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'password',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        await UserController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', authChecker.validateParams([
        {
            paramKey: 'user_id',
            required: true,
            type: 'number',
        },
    ]), async (req, res) => {
        await UserController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });
});

module.exports = router;
