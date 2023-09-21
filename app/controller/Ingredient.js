const httpStatus = require('http-status');

const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

const IngredientCategory = require('../model/IngredientCategory');

const associates = [IngredientCategory];

class IngredientController {
    constructor(Ingredient) {
        this.Ingredient = Ingredient;
    }

    getAll() {
        return this.Ingredient.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.Ingredient.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.Ingredient.findAll({ where: where, include: associates }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(Ingredient){
        return this.Ingredient.create(Ingredient, {
            include: associates
         }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(Ingredient) {
        return this.Ingredient.update(Ingredient, { where: { id: Ingredient.id } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(id) {
        return this.Ingredient.destroy({ where: { id: id } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = IngredientController;