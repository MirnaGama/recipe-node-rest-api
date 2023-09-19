const {sequelizeConnect, Sequelize} = require('../config/db');
const IngredientCategory = require('./IngredientCategory.js');
const RecipeIngredient = require('./RecipeIngredient');

const Ingredient = sequelizeConnect.define('ingredient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id"
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ingredient_label"
    }
})

IngredientCategory.hasMany(Ingredient);
Ingredient.belongsTo(IngredientCategory);

module.exports = Ingredient;