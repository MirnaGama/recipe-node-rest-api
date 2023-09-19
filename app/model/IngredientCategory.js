const {sequelizeConnect, Sequelize} = require('../config/db');

const IngredientCategory = sequelizeConnect.define('ingredient_category', {
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
        field: "category_label"
    }
})

module.exports = IngredientCategory;