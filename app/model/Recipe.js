const {sequelizeConnect, Sequelize} = require('../config/db');
const User = require('./User.js');
const RecipeIngredient = require('./RecipeIngredient.js');
const RecipeCategory = require('./RecipeCategory');


const Recipe = sequelizeConnect.define('recipe', {
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
        field: "label"
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "imageURL"
    }
})

// Create Foreign Key at User Table
User.hasMany(Recipe);
Recipe.belongsTo(User);

Recipe.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Recipe);

RecipeCategory.hasMany(Recipe);
Recipe.belongsTo(RecipeCategory);

module.exports = Recipe;