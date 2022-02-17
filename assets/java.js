// declaring variables
let modalBtn = $("#modal-btn")
let intolerantParams = "";
let intolerantArray = [];
let searchTerm = ""
let spoonURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=61eaa0a762fa43dfb497dc228b48ebd3";
let googleURL = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=restaurantst&zoom=14`
let recipeIDArray = [];
let recipeID = 0;
let savedRecipe = [];
let currentRecipeNumber = 0;




function init() {
    //  this gets all of the stored intolerant items
    getStoredIntolerants()

    // this compiles all of the current intolerances
    compileParams()

    // this calls the api to get the map
    getMap()

    // this compiles the recipe cards on the recipe.html page
    compileRecipeCards(savedRecipe)
}



// this function gets the maps and puts it in the map holder on the index.html page
function getMap() {

    // this creates a variable that is the html for the google map
    googleMap = '<figure class = "image"><iframe width="100%" height="250" frameborder="0" style="border:0" src="' + googleURL + '" allowfullscreen></iframe></figure>'

    // this puts the html variable into the html into the map holder
    $("#map-holder").html(googleMap);
}



// this function allows the user to search for places 
function searchGoogleMaps() {

    // this defines the search term
    let userSearchTerm = $("#google-search-bar").val()

    // this enbeds the search term in the api call
    let userGoogleSearch = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=${userSearchTerm}t&zoom=14`

    // this creates a variable that is the html for the google map with the the search term included
    let userGoogleMap = '<figure class = "image"><iframe width="100%" height="250" frameborder="0" style="border:0" src="' + userGoogleSearch + '" allowfullscreen></iframe></figure>'

    // this puts the html variable into the html into the map holder
    $("#map-holder").html(userGoogleMap);
}


// this function calls the api for recipes
function callAPI() {

    // this fetches the api url with the intolerance and search term included
    fetch(spoonURL + intolerantParams + searchTerm)
        .then(function (response) {

            // this takes the response and turns it into json format
            return response.json();
        })
        .then(function (data) {

            // this takes the data and sends it to the build card function, so that the cards ore built
            buildCards(data)

            // this takes the ids from the called recipes and stores them in an array
            for (let index = 0; index < 6; index++) {
                const element = data.results[index].id;
                recipeIDArray.push(element)
            }
        })
}


// this function builds the cards on the index.html page based on the information sent back from the api
function buildCards(data) {

    // each of thhe code blocks bellow take the image and title from a given recipe and asigns their values to a card
    let recipe1 = data.results[0].image;
    $("#card-0-img").attr("src", recipe1)
    let recipe1Title = data.results[0].title
    $("#card-0-title").text(recipe1Title)


    let recipe2 = data.results[1].image;
    $("#card-1-img").attr("src", recipe2)
    let recipe2Title = data.results[1].title
    $("#card-1-title").text(recipe2Title)

    let recipe3 = data.results[2].image;
    $("#card-2-img").attr("src", recipe3)
    let recipe3Title = data.results[2].title
    $("#card-2-title").text(recipe3Title)

    let recipe4 = data.results[3].image;
    $("#card-3-img").attr("src", recipe4)
    let recipe4Title = data.results[3].title
    $("#card-3-title").text(recipe4Title)

    let recipe5 = data.results[4].image;
    $("#card-4-img").attr("src", recipe5)
    let recipe5Title = data.results[4].title
    $("#card-4-title").text(recipe5Title)

    let recipe6 = data.results[5].image;
    $("#card-5-img").attr("src", recipe6)
    let recipe6Title = data.results[5].title
    $("#card-5-title").text(recipe6Title)
}


// this calls the api by id inorder to get detailed infforamion on the recipe
function callAPIByID() {

    // this fetches for a detailed search of the given recipe
    ; fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=61eaa0a762fa43dfb497dc228b48ebd3`)
        .then(function (response2) {

            // this takes that response and turns it into json format
            return response2.json();
        })
        .then(function (data2) {

            // this takes that data and sends it to a function designed to compile the information into an object annd save that object into local storage.
            buildRecipeToSave(data2)
        });
}


// this function checks the values of all of the intolerances the user enters. It also starts a cascading series of events to recreate the cards on the index.html page given the new values.
function saveInts() {

    // this clears local storage and the old array before adding what we currently want to save
    localStorage.removeItem("intolerantArray")
    let intolerantArray = [];

    // this checks each checkbox, if they are checked the value is pushed into the array
    console.log("save button clicked");
    if ($('#intolerance1').is(':checked')) {
        intolerantArray.push("dairy");
    }
    if ($('#intolerance2').is(':checked')) {
        intolerantArray.push("egg");
    }
    if ($('#intolerance3').is(':checked')) {
        intolerantArray.push("gluten");
    }
    if ($('#intolerance4').is(':checked')) {
        intolerantArray.push("grain");
    }
    if ($('#intolerance5').is(':checked')) {
        intolerantArray.push("peanut");
    }
    if ($('#intolerance6').is(':checked')) {
        intolerantArray.push("seafood");
    }
    if ($('#intolerance7').is(':checked')) {
        intolerantArray.push("sesame");
    }
    if ($('#intolerance8').is(':checked')) {
        intolerantArray.push("shellfish");
    }
    if ($('#intolerance9').is(':checked')) {
        intolerantArray.push("soy");
    }
    if ($('#intolerance10').is(':checked')) {
        intolerantArray.push("sulfite");
    }
    if ($('#intolerance11').is(':checked')) {
        intolerantArray.push("treenut");
    }
    if ($('#intolerance12').is(':checked')) {
        intolerantArray.push("wheat");
    }


    // this takes everything in the array and saves it in local storage
    localStorage.setItem("intolerantArray", JSON.stringify(intolerantArray));

    // this function checks local storage to make sure that all of the variables are up to date
    getStoredIntolerants()

    // this funcion compiles all of the intolerances into a parametor
    compileParams()

    // this function takes aa search term (if there is one), and applies that to api call, then calls the api
    addSearchTerm()
}


// this function is designed to check everything in local storage and set the variables to them
function getStoredIntolerants() {

    // this gets all of the stored recipes if there are any saved in storage
    if (JSON.parse(localStorage.getItem("savedRecipe")) !== null) {
        savedRecipe = JSON.parse(localStorage.getItem("savedRecipe"))
    }

    // this checks to make sure that there are intolerant times in local storage
    if ((JSON.parse(localStorage.getItem("intolerantArray"))) !== null) {

        // if there are items they ore put into an array
        intolerantArray = (JSON.parse(localStorage.getItem("intolerantArray")));

        // this checks if the items are in the array. if they are the boxes are then checked
        if (intolerantArray.includes("dairy")) {
            $("#intolerance1").prop("checked", true);
        }
        if (intolerantArray.includes("egg")) {
            $("#intolerance2").prop("checked", true);
        }
        if (intolerantArray.includes("gluten")) {
            $("#intolerance3").prop("checked", true);
        }
        if (intolerantArray.includes("grain")) {
            $("#intolerance4").prop("checked", true);
        }
        if (intolerantArray.includes("peanut")) {
            $("#intolerance5").prop("checked", true);
        }
        if (intolerantArray.includes("seafood")) {
            $("#intolerance6").prop("checked", true);
        }
        if (intolerantArray.includes("sesame")) {
            $("#intolerance7").prop("checked", true);
        }
        if (intolerantArray.includes("shellfish")) {
            $("#intolerance8").prop("checked", true);
        }
        if (intolerantArray.includes("soy")) {
            $("#intolerance9").prop("checked", true);
        }
        if (intolerantArray.includes("sulfite")) {
            $("#intolerance10").prop("checked", true);
        }
        if (intolerantArray.includes("treenut")) {
            $("#intolerance11").prop("checked", true);
        }
        if (intolerantArray.includes("wheat")) {
            $("#intolerance12").prop("checked", true);
        }
    }
}


// this function takes the stored intolerances and compiles them into a variable that is the paramater for the api call. It then calls the api
function compileParams() {

    // this checks to see if there is anything in the intolerant array
    if (intolerantArray.length !== 0) {

        // this starts the intolerant parametor for the api
        intolerantParams = "&intolerances="

        // this goes throug the array and adds each intolerant to the string that will be used as a parametor
        for (let index = 0; index < intolerantArray.length; index++) {
            let element = intolerantArray[index];
            intolerantParams += `${element},`
        }

        // removes the last comma in the string
        paramsArray = intolerantParams.split("")
        paramsArray.pop()
        intolerantParams = paramsArray.join("")
    }

    // calling the api for recipes
    callAPI()
}



// this function adds a serch term to the spoonacular api call
function addSearchTerm() {

    //  this adds the searched value to the search term variable. 
    let searchItem = $("#search").val();
    searchTerm = "&query=" + searchItem

    // this calls the spoonacular api
    callAPI()
}


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


    console.log("here");


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



// builds an object based on the ingredients in the chosen recipe
function buildRecipeToSave(data2) {

    // this delares the saved recipe object that all recipes will be stored in. It also sets the created atrubite to false indicating that the user has not changed any aspects of this recipe
    let savedRecipeObj = {
        name: "",
        ingredients: "",
        instrcuctions: "",
        favorite: false,
        created: false,
        recipeNumber: 0,
    }

    // this runs through each ingredient
    for (let index = 0; index < data2.extendedIngredients.length; index++) {

        // this declares variables for the amount of the ingredent, the unit, and the name
        let amount = data2.extendedIngredients[index].measures.us.amount
        let unit = data2.extendedIngredients[index].measures.us.unitLong
        let name = data2.extendedIngredients[index].name

        // This creates a line of the amount, unit, and name of the ingredient and sets it to the
        savedRecipeObj.ingredients += (amount + " " + unit + " " + name + "<br>")
    }


    // this runs through each step in the instructions and adds them to the steps variable
    for (let index = 0; index < data2.analyzedInstructions[0].steps.length; index++) {
        savedRecipeObj.instrcuctions += ((index + 1) + " " + data2.analyzedInstructions[0].steps[index].step + " " + "<br>")
    }

    // this sets the name of the recipe and gives it a data id number
    savedRecipeObj.name = data2.title
    savedRecipeObj.recipeNumber = savedRecipe.length

    // this pushes the new object to the savedRecipe array and saves that to local storage
    savedRecipe.push(savedRecipeObj);
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


// starts of page load
init()






//event listeners 
$("#save-btn").on("click", saveInts)
$("#see-recipe-btn").on("click", saveInts)
$("#recipe-container").on("click", ".save-recipe", saveRecipe)
$("#recipe-container").on("click", ".favorite-btn", findFavoriteRecipeID)
$("#recipe-container").on("click", ".remove-recipe-btn", removeRecipe)
$("#sort-by-favorite-btn").on("click", sortByFavorite)
$("#sort-by-created-btn").on("click", sortByCreated)
$("#search-google-btn").on("click", searchGoogleMaps)
$(".create-new-recipe-btn").on("click", createEmptyRecipe)

// this takes the user to the index page
$("#go-back-button").on("click", function () {
    document.location.replace('./index.html');
})

// this takes the user to the recipe page
$("#go-to-recipes-button").on("click", function () {
    document.location.replace('./recipes.html');
})


// this is an event listener for the dropdown
let dropdown = $(".dropdown")
dropdown.on("click", function (e) {
    dropdown.toggleClass('is-active');
    if (e.target.type === "checkbox" || $(this).is("label")) {
        dropdown.toggleClass('is-active');
    }
    saveInts()

})

// this saves the recipes
$("#search-btn").on("click", function (e) {
    e.preventDefault()
    saveInts()
})


// this listes for the save button to be clicked. If they are clicked it then calls the api, and disables the buttons
$("#recipe-save-1").on("click", function () {
    recipeID = recipeIDArray[0]
    callAPIByID(recipeID)
    disableBtn1();
});
$("#recipe-save-2").on("click", function () {
    recipeID = recipeIDArray[1]
    callAPIByID(recipeID)
    disableBtn2();
});
$("#recipe-save-3").on("click", function () {
    recipeID = recipeIDArray[2]
    callAPIByID(recipeID)
    disableBtn3();
});
$("#recipe-save-4").on("click", function () {
    recipeID = recipeIDArray[3]
    callAPIByID(recipeID)
    disableBtn4();
});
$("#recipe-save-5").on("click", function () {
    recipeID = recipeIDArray[4]
    callAPIByID(recipeID)
    disableBtn5();
});
$("#recipe-save-6").on("click", function () {
    recipeID = recipeIDArray[5]
    callAPIByID(recipeID)
    disableBtn6();
});


// this changes the save recipe buttons to disabled
function disableBtn1() {
    document.getElementById("recipe-save-1").disabled = true;
}
function disableBtn2() {
    document.getElementById("recipe-save-2").disabled = true;
}
function disableBtn3() {
    document.getElementById("recipe-save-3").disabled = true;
}
function disableBtn4() {
    document.getElementById("recipe-save-4").disabled = true;
}
function disableBtn5() {
    document.getElementById("recipe-save-5").disabled = true;
}
function disableBtn6() {
    document.getElementById("recipe-save-6").disabled = true;
}


