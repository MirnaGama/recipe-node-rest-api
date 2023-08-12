const {sequelizeConnect, Sequelize} = require('../config/db');
const User = require('./User.js');


const Recipe = sequelizeConnect.define('recipe', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "recipe_id"
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "label"
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "imageURL"
    },
    ingredients: {
        type: Sequelize.JSON,
        allowNull: false,
        field: "ingredients"
    }

})

// Create Foreign Key at User Table
User.hasMany(Recipe);
Recipe.belongsTo(User);

module.exports = Recipe;