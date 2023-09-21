const httpStatus = require('http-status');

const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

const User = require('../model/User');
const RecipeIngredient = require('../model/RecipeIngredient');
const RecipeCategory = require('../model/RecipeCategory');

const associates = [User, RecipeIngredient, RecipeCategory];

class RecipeController {
    constructor(Recipe) {
        this.Recipe = Recipe;
    }

    getAll() {
        return this.Recipe.findAll({include: associates}).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.Recipe.findByPk(id, {include: associates}).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.Recipe.findAll({ where: where, include: associates }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(recipe){
        return this.Recipe.create(recipe, {include: associates}).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(recipe) {
        return this.Recipe.update(recipe, { where: { id: recipe.id } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(id) {
        return this.Recipe.destroy({ where: { id: id } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = RecipeController;