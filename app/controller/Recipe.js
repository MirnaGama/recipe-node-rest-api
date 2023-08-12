const httpStatus = require('http-status');
const User = require('../model/User');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class RecipeController {
    constructor(Recipe) {
        this.Recipe = Recipe;
    }

    getAll() {
        return this.Recipe.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.Recipe.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.Recipe.findAll({ where: where, include: [User] }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(recipe){
        return this.Recipe.create(recipe).then(result => defaultResponse(result))
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