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

// The method findOrCreate will create an entry in the table unless it can find one (i.e.: insert if does not exist)

IngredientCategory.sync().then(() => {
    IngredientCategory.findOrCreate({
        where: { label: 'Bread, rolls and tortillas' }
      });
    IngredientCategory.findOrCreate({
        where: { label: 'Condiments and sauces' }
      });
    IngredientCategory.findOrCreate({
        where: { label: 'Dairy' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Eggs' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Plant-based protein' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Grains' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Fruits' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Milk' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Meats' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Oils' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Plant-based protein' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Poultry' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Seafood' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Sugars' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Vegetables' }
    });
    IngredientCategory.findOrCreate({
        where: { label: 'Water' }
    });
  });

module.exports = IngredientCategory;