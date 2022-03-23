let currentRecipeNumber = 0;

let savedRecipe = [];


// this function creates an empty recipe card for the recipe.html page
function createEmptyRecipe() {

    // this checks if the current ceripe is an even number or an odd number. If the current recipe is an odd number it creates a new row for the card to go in
    if (isEvenOrOdd(currentRecipeNumber)) {
        console.log("even");
        let newContainer = $("<div>")
        newContainer.addClass("columns recipe-container")
        $(".welcome").append(newContainer)
    }

    // this gets row for the cards to go into
    let recipeContainer = $(".recipe-container")

    // this creates the outermost div for the card, sets its class, and appends it to the row 
    let newDiv1 = $("<div>")
    newDiv1.addClass("column is-6")
    recipeContainer.append(newDiv1)

    // this creates a card with the class div, and appends it to the outermost div
    let newDiv2 = $("<div>")
    newDiv2.addClass("card")
    newDiv1.append(newDiv2)

    // this creates a header and appends it to its parrent
    let newHeader = $("<header>")
    newHeader.addClass("card-header")
    newDiv2.append(newHeader)

    // this creates a p tag inside of the header and sets it to have a default recipe name, and gives it an id number
    let newCardTitle = $("<p>")
    newCardTitle.addClass("card-header-title")
    newCardTitle.attr("contenteditable", "true")
    newCardTitle.attr("data-id", (savedRecipe.length))
    newCardTitle.attr("data-text", "Your recipe name")
    newHeader.append(newCardTitle)

    // this creates another div for the card contents
    let newCardBody = $("<div>")
    newCardBody.addClass("card-content")
    newDiv2.append(newCardBody)

    // this creates a new div for the contents of the card
    let newCardContent = $("<div>")
    newCardContent.addClass("content")
    newCardBody.append(newCardContent)

    // this creates a p tag and sets its value to "Ingredients:" so the user knows what to put in the box below
    let newIngredientsP = $("<p>")
    newIngredientsP.text("Ingredients:")
    newCardContent.append(newIngredientsP)

    // this creates a new div for the user generated ingredients div to go inside of
    let newIngredientsControl = $("<div>")
    newIngredientsControl.addClass("control has-icons-left has-icons-right  ingredients")
    newCardContent.append(newIngredientsControl)

    // this creates a div with the atribute of contenteditable for the user to input their ingredients
    let newIngredientsInput = $("<div>")
    newIngredientsInput.addClass("text-input-for-recipe")
    newIngredientsInput.attr("contenteditable", "true")
    newIngredientsInput.attr("data-text", "Ingredients")
    newIngredientsControl.append(newIngredientsInput)

    // this creates a p tag and sets its value to "How To Cook" so the user knows what to put in the box below
    let newDirectionsP = $("<p>")
    newDirectionsP.text("How To Cook:")
    newCardContent.append(newDirectionsP)

    // this creates a new div for the user generated ingredients div to go inside of
    let newDirectionsControl = $("<div>")
    newDirectionsControl.addClass("control has-icons-left has-icons-right directions")
    newCardContent.append(newDirectionsControl)

    // this creates a div with the atribute of contenteditable for the user to input their directions
    let newDirectionsInput = $("<div>")
    newDirectionsInput.addClass("text-input-for-recipe")
    newDirectionsInput.attr("contenteditable", "true")
    newDirectionsInput.attr("data-text", "Directions")
    newDirectionsControl.append(newDirectionsInput)

    // creates a new container for the buttons
    let newButtonContainer = $("<div>")
    newButtonContainer.addClass("btn-container")
    newCardContent.append(newButtonContainer)

    // this creates a save button for the user to click to save any updates information
    let newSaveBtn = $("<button>")
    newSaveBtn.addClass("button save-recipe")
    newSaveBtn.html("<i>Save</i>")
    newButtonContainer.append(newSaveBtn)

    // this creates a button for the user to mark a recipe as a favorite
    let newFavoriteBtn = $("<button>")
    newFavoriteBtn.addClass("button favorite-btn")
    newFavoriteBtn.html("<i>Mark as Favorite</i>")
    newButtonContainer.append(newFavoriteBtn)

    // thes creates a remove recipe button incase the user wants to remove the recipe
    let newRemoveBtn = $("<button>")
    newRemoveBtn.addClass("button remove-recipe-btn")
    newRemoveBtn.html("<i>Remove recipe</i>")
    newButtonContainer.append(newRemoveBtn)

    // this increments the currentRecipeNumber by 1.  This indicates how many cards have already been built
    currentRecipeNumber++
}

// this function takes saved recipes and builds cards with them on recipe.html
function compileRecipeCards(arrayToCompile) {

    // this checks to see if there are any recipes. If there arn't then this creates an epty card for the user to fill in
    if (currentRecipeNumber === 0 && arrayToCompile.length === 0) {
        createEmptyRecipe()
    }

    // this is a for loop to loop through every recipe in the array
    for (let index = 0; index < arrayToCompile.length; index++) {

        // this grabs the name of the recipe, ingredients, and directions and sets them to variables.
        let nameToBePopulated = arrayToCompile[index].name
        let ingredientsToBePopulated = arrayToCompile[index].ingredients
        let directionsToBePopulated = arrayToCompile[index].instrcuctions

        // this checks if the current ceripe is an even number or an odd number. If the current recipe is an odd number it creates a new row for the card to go in
        if (isEvenOrOdd(currentRecipeNumber)) {
            let newContainer = $("<div>")
            newContainer.addClass("columns recipe-container")
            $(".welcome").append(newContainer)
        }

        // this gets row for the cards to go into
        let recipeContainer = $(".recipe-container")

        // this creates the outermost div for the card, sets its class, and appends it to the row 
        let newDiv1 = $("<div>")
        newDiv1.addClass("column is-6")
        recipeContainer.append(newDiv1)

        // this creates a card with the class div, and appends it to the outermost div
        let newDiv2 = $("<div>")
        newDiv2.addClass("card")
        newDiv1.append(newDiv2)


        // this creates a header and appends it to its parrent
        let newHeader = $("<header>")
        newHeader.addClass("card-header")
        newDiv2.append(newHeader)

        // this creates a p tag inside of the header and sets it to the recipes name, and gives it an id number
        let newCardTitle = $("<p>")
        newCardTitle.addClass("card-header-title")
        newCardTitle.attr("contenteditable", "true")
        newCardTitle.attr("data-id", arrayToCompile[index].recipeNumber)
        newCardTitle.html(nameToBePopulated)
        newHeader.append(newCardTitle)

        // this creates another div for the card contents
        let newCardBody = $("<div>")
        newCardBody.addClass("card-content")
        newDiv2.append(newCardBody)

        // this creates a new div for the contents of the card
        let newCardContent = $("<div>")
        newCardContent.addClass("content")
        newCardBody.append(newCardContent)

        // this creates a p tag and sets its value to "Ingredients:" so the user knows what to put in the box below
        let newIngredientsP = $("<p>")
        newIngredientsP.text("Ingredients:")
        newCardContent.append(newIngredientsP)

        // this creates a new div for the recipes saved ingredients div to go inside of
        let newIngredientsControl = $("<div>")
        newIngredientsControl.addClass("control has-icons-left has-icons-right  ingredients")
        newCardContent.append(newIngredientsControl)

        // this creates a div with the atribute of contenteditable it sets the default to the saved recipe. It is marked with the artibute of contenteditable incase the user wants to change an aspect of the ingredients
        let newIngredientsInput = $("<div>")
        newIngredientsInput.addClass("text-input-for-recipe")
        newIngredientsInput.attr("contenteditable", "true")
        newIngredientsInput.html(ingredientsToBePopulated)
        newIngredientsControl.append(newIngredientsInput)

        // this creates a p tag and sets its value to "How To Cook" so the user knows what is in the box below
        let newDirectionsP = $("<p>")
        newDirectionsP.text("How To Cook:")
        newCardContent.append(newDirectionsP)

        // this creates a new div for the recipes saved directions div to go inside of
        let newDirectionsControl = $("<div>")
        newDirectionsControl.addClass("control has-icons-left has-icons-right directions")
        newCardContent.append(newDirectionsControl)

        // this creates a div with the atribute of contenteditable it sets the default to the saved recipe. It is marked with the artibute of contenteditable incase the user wants to change an aspect of the directions
        let newDirectionsInput = $("<div>")
        newDirectionsInput.addClass("text-input-for-recipe")
        newDirectionsInput.attr("contenteditable", "true")
        newDirectionsInput.html(directionsToBePopulated)
        newDirectionsControl.append(newDirectionsInput)

        // creates a new container for the buttons
        let newButtonContainer = $("<div>")
        newButtonContainer.addClass("btn-container")
        newCardContent.append(newButtonContainer)

        // this creates a save button for the user to click to save any updates information
        let newSaveBtn = $("<button>")
        newSaveBtn.addClass("button save-recipe")
        newSaveBtn.html("<i>Save</i>")
        newButtonContainer.append(newSaveBtn)

        // this creates a button for the user to mark a recipe as a favorite
        let newFavoriteBtn = $("<button>")
        newFavoriteBtn.addClass("button favorite-btn")
        newFavoriteBtn.html("<i>Mark as Favorite</i>")
        newButtonContainer.append(newFavoriteBtn)

        // thes creates a remove recipe button incase the user wants to remove the recipe
        let newRemoveBtn = $("<button>")
        newRemoveBtn.addClass("button remove-recipe-btn")
        newRemoveBtn.html("<i>Remove recipe</i>")
        newButtonContainer.append(newRemoveBtn)

        // this increments the currentRecipeNumber by 1.  This indicates how many cards have already been built
        currentRecipeNumber++
    }
}


// this checks to see the currentrecipe number is even or odd
function isEvenOrOdd(currentRecipeNumber) {
    if ((currentRecipeNumber % 2) === 0 || currentRecipeNumber === 0) { return true; }
    else {
        return false;
    }
}



// this function saves recipes and puts them into local storage
function saveRecipe() {

    // this delares the saved recipe object that all recipes will be stored in. It also sets the created atrubite to true, indicating that the recipe wasn't only taken from the api
    let savedRecipeObj = {
        name: "",
        ingredients: "",
        instrcuctions: "",
        favorite: false,
        created: true,
        recipeNumber: 0,
    }

    // this gets the new reciepes name
    let newRecipeNameBox = $(this).parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")

    let newRecipeName = newRecipeNameBox.text()

    // this gets the new recipes ingredients
    let newRecipeIngredientsBox = $(this).parent(".btn-container").parent(".content").children(".ingredients").children(".text-input-for-recipe")
    let newRecipeIngredients = newRecipeIngredientsBox.html()


    // this gets the new recipes direction
    let newRecipeDirectionsBox = $(this).parent(".btn-container").parent(".content").children(".directions").children(".text-input-for-recipe")
    let newRecipeDirections = newRecipeDirectionsBox.html()

    // this grabs the data id attribute of the selected  recipe
    let thisDataId = newRecipeNameBox.attr("data-id")

    // this sets a count variable
    let count = 0;

    // this checks if there are any recipes in the savedRecipe array
    if (savedRecipe.length > 0) {

        // this for loop runs through all of the savedRecipes to see if there is already a recipe object created for it
        for (let index = 0; index < savedRecipe.length; index++) {

            // this sets the element to each recipe number
            const element = savedRecipe[index].recipeNumber;

            // if the recipe being saved already has an object, that object is updates
            if (element == thisDataId) {
                savedRecipe[index].name = newRecipeName
                savedRecipe[index].ingredients = newRecipeIngredients
                savedRecipe[index].instrcuctions = newRecipeDirections

                // this increments the count to indicate that 
                count++
            }
        }

        // this checks to see if the count is 0
        if (count === 0) {

            // this takes all of the information the user provided and puts them into an object
            savedRecipeObj.name = (newRecipeName)
            savedRecipeObj.ingredients = (newRecipeIngredients)
            savedRecipeObj.instrcuctions = (newRecipeDirections)
            savedRecipeObj.recipeNumber = savedRecipe.length

            // this pushes the saved object into the savedRecipes array
            savedRecipe.push(savedRecipeObj);
        }


    } else {

        // this takes all of the information the user provided and puts them into an object
        savedRecipeObj.name = (newRecipeName)
        savedRecipeObj.ingredients = (newRecipeIngredients)
        savedRecipeObj.instrcuctions = (newRecipeDirections)
        savedRecipeObj.recipeNumber = savedRecipe.length

        // this pushes the saved object into the savedRecipes array
        savedRecipe.push(savedRecipeObj);
    }

    // this sets the savedRecipe array to local storage
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
}

// This function checks 
function findFavoriteRecipeID() {

    // this finds the data id of the clicked card
    let thisElement = $(this).parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
    let thisDataId = thisElement.attr("data-id")

    // this sends the data id to the add favorite function to give that chosen card the value of favorite
    addFavoriteToObject(thisDataId)
}

// this function takes the given ID and sets its corrosponding recipe object to favorite
function addFavoriteToObject(thisDataId) {

    // This checks each recipe, if the ID matches it sets the favorite atribute to true
    for (let index = 0; index < savedRecipe.length; index++) {
        const element = savedRecipe[index].recipeNumber;
        if (element == thisDataId) {
            savedRecipe[index].favorite = true
        }
    }

    // this saves it into local storage
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
}


// this sorts the recipes depending on if they are marked as a favorite or not
function sortByFavorite() {

    // this delares variables
    let countLength = savedRecipe.length
    let favoriteArray = []
    let notFavoriteArray = []

    // this runns through each recipe and checks if they are marked as a favorite or not. If they are a favorite they are moved into the favorite array, else they are moved into the notFavoriteArray
    for (let index = 0; index < countLength; index++) {
        const element = savedRecipe[0].favorite;
        if (element) {
            let removed = (savedRecipe.splice(0, 1))
            $.merge(favoriteArray, removed)
        } else {
            let removed = (savedRecipe.splice(0, 1))
            console.log(removed);
            $.merge(notFavoriteArray, removed)
        }
    }

    // this merges the favorite and notFavorite arrays and saves them as savedRecipes
    savedRecipe = $.merge(favoriteArray, notFavoriteArray)

    // this puts the saved recipes into local storage
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));

    // this reloads the page so that the recipes are displayed in the new order
    location.reload()
}


// this function sorts by checking if the recipe was created or not
function sortByCreated() {

    // this declares variables
    let countLength = savedRecipe.length
    let createdArray = []
    let notCreatedArray = []

    // this runns through each recipe and checks if they are marked as created or not. If they are a created recipe they are moved into the created array, else they are moved into the notCreatedArray
    for (let index = 0; index < countLength; index++) {
        const element = savedRecipe[0].created;
        if (element) {
            let removed = (savedRecipe.splice(0, 1))
            $.merge(createdArray, removed)
        } else {
            let removed = (savedRecipe.splice(0, 1))
            console.log(removed);
            $.merge(notCreatedArray, removed)
        }

    }

    // this merges the created and notCreated arrays and saves them as savedRecipes
    savedRecipe = $.merge(createdArray, notCreatedArray)

    // this puts the saved recipes into local storage
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));

    // this reloads the page so that the recipes are displayed in the new order
    location.reload()
}


// this function removes a recipe
function removeRecipe() {

    // this gets the recipe data-id number
    let thisElement = $(this).parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
    let thisDataId = thisElement.attr("data-id")

    // this for loop checks every recipe
    for (let index = 0; index < savedRecipe.length; index++) {
        const element = savedRecipe[index].recipeNumber;

        // if the id number matches the one that is clicked then the recipe is spliced out of the array
        if (element == thisDataId) {
            savedRecipe.splice(index, 1)

            // this function resets all of the recipes to new id numbers
            resentDataIDs()

            // the page is reloaded without the removed recipe
            location.reload()
        }
    }
}


// this function resets all recipes data id
function resentDataIDs() {

    // this takes each recipe and sets its data id number to the index
    for (let index = 0; index < savedRecipe.length; index++) {
        savedRecipe[index].recipeNumber = index
    }

    // this saves them into local storage
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
}




function init() {
    // this gets all of the stored recipes if there are any saved in storage
    if (JSON.parse(localStorage.getItem("savedRecipe")) !== null) {
        savedRecipe = JSON.parse(localStorage.getItem("savedRecipe"))
    }

    // this compiles the recipe cards on the recipe.html page
    compileRecipeCards(savedRecipe)

}

init()

// this takes the user to the index page
$("#go-back-button").on("click", function () {
    document.location.replace('./index.html');
})

$("#recipe-container").on("click", ".save-recipe", saveRecipe)
$("#recipe-container").on("click", ".favorite-btn", findFavoriteRecipeID)
$("#recipe-container").on("click", ".remove-recipe-btn", removeRecipe)
$("#sort-by-favorite-btn").on("click", sortByFavorite)
$("#sort-by-created-btn").on("click", sortByCreated)
$(".create-new-recipe-btn").on("click", createEmptyRecipe)