const {sequelizeConnect, Sequelize} = require('../config/db');

const RecipeCategory = sequelizeConnect.define('recipe_category', {
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

// The method findOrCreate will create an entry in the table unless it can find one (i.e.: insert if does not exist)

RecipeCategory.sync().then(() => {
    RecipeCategory.findOrCreate({
        where: { label: 'Breakfast' }
      });
    RecipeCategory.findOrCreate({
        where: { label: 'Lunch' }
      });
    RecipeCategory.findOrCreate({
        where: { label: 'Appetizer' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Salad' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Main-course' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Side-dish' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Baked-goods' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Dessert' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Snack' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Soup' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Holiday' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Vegetarian' }
    });
    RecipeCategory.findOrCreate({
        where: { label: 'Vegan' }
    });
  });

module.exports = RecipeCategory;