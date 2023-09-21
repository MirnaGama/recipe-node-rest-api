const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class RecipeIngredientController {
    constructor(RecipeIngredient) {
        this.RecipeIngredient = RecipeIngredient;
    }

    getAll() {
        return this.RecipeIngredient.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.RecipeIngredient.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.RecipeIngredient.findAll({ where: where }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    create(RecipeIngredient){
        return this.RecipeIngredient.create(RecipeIngredient).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(RecipeIngredient) {
        return this.RecipeIngredient.update(RecipeIngredient, { where: { id: RecipeIngredient.id } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(id) {
        return this.RecipeIngredient.destroy({ where: { id: id } }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }
}

module.exports = RecipeIngredientController;