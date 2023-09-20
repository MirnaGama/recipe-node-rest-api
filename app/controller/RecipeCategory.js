const httpStatus = require('http-status');
const defaultResponse = (data, statusCode = httpStatus.OK) => ({data, statusCode});
const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({error: message}, statusCode);

class RecipeCategoryController {
    constructor(RecipeCategory) {
        this.RecipeCategory = RecipeCategory;
    }

    getAll() {
        return this.RecipeCategory.findAll().then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getById(id){
        return this.RecipeCategory.findByPk(id).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }

    getByWhere(where){
        return this.RecipeCategory.findAll({ where: where }).then(result => defaultResponse(result))
        .catch(error => errorResponse(error.message));
    }
}

module.exports = RecipeCategoryController;