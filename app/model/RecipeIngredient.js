const {sequelizeConnect, Sequelize} = require('../config/db');
const Ingredient = require('./Ingredient.js');
const Recipe = require('./Recipe.js');

const RecipeIngredient = sequelizeConnect.define('recipe_ingredient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id"
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "quantity"
    },
    measure: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "measure"
    }
})

Ingredient.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Ingredient);

module.exports = RecipeIngredient;