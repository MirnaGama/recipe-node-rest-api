var router = require('express').Router();
const authChecker = require('./authCheckerUtil.js');
const User = require('../../../model/User.js');
const UsersController = require('../../../controller/User.js');
const UserController = new UsersController(User);

require('express-group-routes');

router.group((router) => {
    router.use(authChecker.sessChecker);    // * sessionChecker()

    router.get('/logout', async (req, res) => {
        res.clearCookie('SessionCookie');
        req.session.destroy;
        res.redirect('/');
    });
    
    router.post('/login', authChecker.validateParams([
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'password',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        const userLogin = req.body;
        let resultMessage = {};

        const user = await User.findOne({ where: { email: userLogin.email } });

        if(user){
            try {
                if(await user.validPassword(userLogin.password)){
                    resultMessage = {
                        status: true,
                        result: user
                    };

                    req.session.user = user.dataValues;
                }else{
                    resultMessage = {
                        status: false,
                        result: "Invalid password"
                    };
                }
            } catch (error) {
                resultMessage = {
                    status: false,
                    result: error
                };
            }
        }else{
            resultMessage = {
                status: false,
                result: "Invalid Login"
            }
        }

        return res.json(resultMessage);
    });

    router.post('/signup', authChecker.validateParams([
        {
            paramKey: 'username',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'email',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'password',
            required: true,
            type: 'string',
        },
    ]), async (req, res) => {
                await UserController.create(req.body).then(responseUser => {
                    res.status(responseUser.statusCode)
                    res.json(responseUser.data)
                });
            });
    });

module.exports = router;