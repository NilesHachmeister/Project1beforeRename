
class Recipe {
    constructor(id, name, ingredients, instrcuctions, favorite, created) {
        this.id = id,
            this.name = name,
            this.ingredients = ingredients,
            this.instructions = instrcuctions,
            this.favorite = favorite,
            this.created = created
    }
    getId() {
        return this.id;
    };
    getName() {
        return this.name;
    };
    getIngredients() {
        return this.ingredients;
    }
    getInstructions() {
        return this.instructions;
    }
    getFavorite() {
        return this.favorite;
    }
    getCreated() {
        return this.created;
    }


    // functions go here? create the recipe? save it? 


}

module.exports = Recipe;