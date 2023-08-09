const {sequelizeConnect, Sequelize} = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelizeConnect.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "user_id"
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "username"
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "password"
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "email"
    },
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = await bcrypt.hashSync(user.password, salt);
            user.password = hashedPassword;
        }
    }
});

User.prototype.validPassword = async function (password) {
    const checkPass = await bcrypt.compareSync(password, this.password);
    return checkPass;
}

module.exports = User;