const Recipe = require('../lib/recipe');


// this file is made to test the recipe class
describe("Recipe class", () => {
    describe("the id", () => {
        it("Should return the id of the recipe put into the class", () => {
            const recipe = new Recipe(1, "Popcorn", "Corn, pop", "Pop the corn", true, false)
            const recipe2 = new Recipe(2, "Buttered noodles", "butter, noodles", "butter the noodles", false, true)
            expect(recipe.getId()).toEqual(1)
            expect(recipe2.getId()).toEqual(2)
        })
    })
    describe("the name", () => {
        it("Should return the name of the recipe put into the class", () => {
            const recipe = new Recipe(1, "Popcorn", "Corn, pop", "Pop the corn", true, false)
            const recipe2 = new Recipe(2, "Buttered noodles", "butter, noodles", "butter the noodles", false, true)
            expect(recipe.getName()).toEqual("Popcorn")
            expect(recipe2.getName()).toEqual("Buttered noodles")
        })
    })
    describe("the ingredients", () => {
        it("Should return the ingredients of the recipe put into the class", () => {
            const recipe = new Recipe(1, "Popcorn", "Corn, pop", "Pop the corn", true, false)
            const recipe2 = new Recipe(2, "Buttered noodles", "butter, noodles", "butter the noodles", false, true)
            expect(recipe.getIngredients()).toEqual("Corn, pop")
            expect(recipe2.getIngredients()).toEqual("butter, noodles")
        })
    })
    describe("the instructions", () => {
        it("Should return the instructions of the recipe put into the class", () => {
            const recipe = new Recipe(1, "Popcorn", "Corn, pop", "Pop the corn", true, false)
            const recipe2 = new Recipe(2, "Buttered noodles", "butter, noodles", "butter the noodles", false, true)
            expect(recipe.getInstructions()).toEqual("Pop the corn")
            expect(recipe2.getInstructions()).toEqual("butter the noodles")
        })
    })
    describe("favorite or not", () => {
        it("Should return the true or false depending on how the class is created", () => {
            const recipe = new Recipe(1, "Popcorn", "Corn, pop", "Pop the corn", true, false)
            const recipe2 = new Recipe(2, "Buttered noodles", "butter, noodles", "butter the noodles", false, true)
            expect(recipe.getFavorite()).toEqual(true)
            expect(recipe2.getFavorite()).toEqual(false)
        })
    })
    describe("created or not", () => {
        it("Should return the true or false depending on how the class is created", () => {
            const recipe = new Recipe(1, "Popcorn", "Corn, pop", "Pop the corn", true, false)
            const recipe2 = new Recipe(2, "Buttered noodles", "butter, noodles", "butter the noodles", false, true)
            expect(recipe.getCreated()).toEqual(false)
            expect(recipe2.getCreated()).toEqual(true)
        })
    })



})