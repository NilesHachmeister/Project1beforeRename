let modalBtn = $("#modal-btn")


const spoonAPIKey = "61eaa0a762fa43dfb497dc228b48ebd3"
const googleAPIKey = "AIzaSyBrDSZjlqk6nk4E7-qJeQrilr6yOlcXvmY"
let intolerantParams = "";
let intolerantArray = [];
let searchTerm = ""

let spoonURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=61eaa0a762fa43dfb497dc228b48ebd3";
let googleURL = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=restaurantst&zoom=14`


let recipeIDArray = [];
let recipeID = 0;


let recipeNameArray = [];
let recipeIngredientsArray = [];
let recipeDirectionsArray = [];

let savedRecipe = [];

let currentNumber = 0;




// add remove recipe btn

// placeholder text removes itself automatically for created recipe




// figure out "favorite", and "created" values for each recipe


// save button on recipe list needs to save the current one instead of creating a new one



function init() {
    //  this gets all of the stored intolerant items
    getStoredIntolerants()

    // this compiles all of the current intolerances
    compileParams()
    getMap()

    compileRecipeCards()


}





function getMap() {

    console.log("map got");
    googleMap = '<figure class = "image"><iframe width="100%" height="250" frameborder="0" style="border:0" src="' + googleURL + '" allowfullscreen></iframe></figure>'

    $("#map-holder").html(googleMap);
}





function searchGoogleMaps() {

    let userSearchTerm = $("#google-search-bar").val()
    let userGoogleSearch = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=${userSearchTerm}t&zoom=14`


    let userGoogleMap = '<figure class = "image"><iframe width="100%" height="250" frameborder="0" style="border:0" src="' + userGoogleSearch + '" allowfullscreen></iframe></figure>'

    $("#map-holder").html(userGoogleMap);
}




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

    callAPI()


}




function callAPI() {
    fetch(spoonURL + intolerantParams + searchTerm)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            buildCards(data)

            for (let index = 0; index < 6; index++) {
                const element = data.results[index].id;
                recipeIDArray.push(element)

            }

        })


}

function callAPIByID() {
    ; fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=61eaa0a762fa43dfb497dc228b48ebd3`)

        .then(function (response2) {
            return response2.json();
        })
        .then(function (data2) {
            console.log(data2);
            buildRecipeToSave(data2)

        });

}







function buildCards(data) {

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

function addSearchTerm() {

    //  this adds the searched value to the search term variable. 
    let searchItem = $("#search").val();
    searchTerm = "&query=" + searchItem

    callAPI()

}

function saveInts() {





    // this clears local storage and the old array before adding what we currently want to save
    localStorage.clear("intolerantArray");
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


    getStoredIntolerants()
    compileParams()
    addSearchTerm()
}



function getStoredIntolerants() {


    if (JSON.parse(localStorage.getItem("savedRecipe")) !== null) {
        savedRecipe = JSON.parse(localStorage.getItem("savedRecipe"))
        console.log(savedRecipe);
    }




    if (JSON.parse(localStorage.getItem("recipeName")) !== null) {

        // this gets all of the items related to recipes that are in local storage and puts them into an array
        recipeNameArray = (JSON.parse(localStorage.getItem("recipeName")));
        recipeIngredientsArray = (JSON.parse(localStorage.getItem("recipeIngredients")));
        recipeDirectionsArray = (JSON.parse(localStorage.getItem("recipeDirections")));
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




function compileRecipeCards() {

    if (savedRecipe.length === 0) {
        createEmptyRecipe()
    }


    console.log(savedRecipe.length);

    for (let index = 0; index < savedRecipe.length; index++) {


        let ingredientsToBePopulated = ""

        for (let i2 = 0; i2 < savedRecipe[index].ingredients.length; i2++) {
            ingredientsToBePopulated += (savedRecipe[index].ingredients[i2] + "<br>")
        }

        let directionsToBePopulated = ""

        for (let i2 = 0; i2 < savedRecipe[index].instrcuctions.length; i2++) {
            directionsToBePopulated += (savedRecipe[index].instrcuctions[i2] + "<br>")
        }


        if (isEvenOrOdd(currentNumber)) {
            console.log("even");
            let newContainer = $("<div>")
            newContainer.addClass("columns recipe-container")
            $(".welcome").append(newContainer)
        }


        let recipeContainer = $(".recipe-container")

        let newDiv1 = $("<div>")
        newDiv1.addClass("column is-6")
        recipeContainer.append(newDiv1)

        let newDiv2 = $("<div>")
        newDiv2.addClass("card")
        newDiv1.append(newDiv2)

        let newHeader = $("<header>")
        newHeader.addClass("card-header")
        newDiv2.append(newHeader)

        let newCardTitle = $("<p>")
        newCardTitle.addClass("card-header-title")
        newCardTitle.attr("contenteditable", "true")
        newCardTitle.html(savedRecipe[index].name[0])
        newHeader.append(newCardTitle)


        let newCardBody = $("<div>")
        newCardBody.addClass("card-content")
        newDiv2.append(newCardBody)

        let newCardContent = $("<div>")
        newCardContent.addClass("content")
        newCardBody.append(newCardContent)

        let newIngredientsP = $("<p>")
        newIngredientsP.text("Ingredients:")
        newCardContent.append(newIngredientsP)

        let newIngredientsControl = $("<div>")
        newIngredientsControl.addClass("control has-icons-left has-icons-right  ingredients")
        newCardContent.append(newIngredientsControl)

        let newIngredientsInput = $("<div>")
        newIngredientsInput.addClass("text-input-for-recipe")
        newIngredientsInput.attr("contenteditable", "true")
        newIngredientsInput.html(ingredientsToBePopulated)
        newIngredientsControl.append(newIngredientsInput)

        let newDirectionsP = $("<p>")
        newDirectionsP.text("How To Cook:")
        newCardContent.append(newDirectionsP)

        let newDirectionsControl = $("<div>")
        newDirectionsControl.addClass("control has-icons-left has-icons-right directions")
        newCardContent.append(newDirectionsControl)

        let newDirectionsInput = $("<div>")
        newDirectionsInput.addClass("text-input-for-recipe")
        newDirectionsInput.attr("contenteditable", "true")
        newDirectionsInput.html(directionsToBePopulated)
        newDirectionsControl.append(newDirectionsInput)

        let newSaveBtn = $("<button>")
        newSaveBtn.addClass("button save-recipe")
        newSaveBtn.html("<i>Save</i>")
        newDirectionsControl.append(newSaveBtn)

        let newFavoriteBtn = $("<button>")
        newFavoriteBtn.addClass("button favorite-btn")
        newFavoriteBtn.html("<i>Mark as Favorite</i>")
        newDirectionsControl.append(newFavoriteBtn)



        currentNumber++



    }


}



function createEmptyRecipe() {



    if (isEvenOrOdd(currentNumber)) {
        console.log("even");
        let newContainer = $("<div>")
        newContainer.addClass("columns recipe-container")
        $(".welcome").append(newContainer)
    }


    let recipeContainer = $(".recipe-container")

    let newDiv1 = $("<div>")
    newDiv1.addClass("column is-6")
    recipeContainer.append(newDiv1)

    let newDiv2 = $("<div>")
    newDiv2.addClass("card")
    newDiv1.append(newDiv2)

    let newHeader = $("<header>")
    newHeader.addClass("card-header")
    newDiv2.append(newHeader)

    let newCardTitle = $("<p>")
    newCardTitle.addClass("card-header-title")
    newCardTitle.attr("contenteditable", "true")
    newCardTitle.text("Your recipe name")
    newHeader.append(newCardTitle)


    let newCardBody = $("<div>")
    newCardBody.addClass("card-content")
    newDiv2.append(newCardBody)

    let newCardContent = $("<div>")
    newCardContent.addClass("content")
    newCardBody.append(newCardContent)

    let newIngredientsP = $("<p>")
    newIngredientsP.text("Ingredients:")
    newCardContent.append(newIngredientsP)

    let newIngredientsControl = $("<div>")
    newIngredientsControl.addClass("control has-icons-left has-icons-right  ingredients")
    newCardContent.append(newIngredientsControl)

    let newIngredientsInput = $("<div>")
    newIngredientsInput.addClass("text-input-for-recipe")
    newIngredientsInput.attr("contenteditable", "true")
    newIngredientsInput.text("Ingredients")
    newIngredientsControl.append(newIngredientsInput)

    let newDirectionsP = $("<p>")
    newDirectionsP.text("How To Cook:")
    newCardContent.append(newDirectionsP)

    let newDirectionsControl = $("<div>")
    newDirectionsControl.addClass("control has-icons-left has-icons-right directions")
    newCardContent.append(newDirectionsControl)

    let newDirectionsInput = $("<div>")
    newDirectionsInput.addClass("text-input-for-recipe")
    newDirectionsInput.attr("contenteditable", "true")
    newDirectionsInput.text("Directions")
    newDirectionsControl.append(newDirectionsInput)

    let newSaveBtn = $("<button>")
    newSaveBtn.addClass("button save-recipe")
    newSaveBtn.html("<i>Save</i>")
    newDirectionsControl.append(newSaveBtn)

    let newFavoriteBtn = $("<button>")
    newFavoriteBtn.addClass("button favorite-btn")
    newFavoriteBtn.html("<i>Mark as Favorite</i>")
    newDirectionsControl.append(newFavoriteBtn)



    currentNumber++

}



function isEvenOrOdd(currentNumber) {
    if ((currentNumber % 2) === 0 || currentNumber === 0) { return true; }
    else {
        return false;
    }
}

isEvenOrOdd()


function saveRecipe() {

    let savedRecipeObj = {
        name: [],
        ingredients: [],
        instrcuctions: [],
        favorite: false,
        created: true,
    }



    // this gets the new reciepes name
    let newRecipeNameBox = $(this).parent(".control").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
    let newRecipeName = newRecipeNameBox.text()
    console.log(newRecipeName);

    // this gets the new recipes ingredients
    let newRecipeIngredientsBox = $(this).parent(".control").parent(".content").children(".ingredients").children(".text-input-for-recipe")
    let newRecipeIngredients = newRecipeIngredientsBox.html()
    console.log(newRecipeIngredients);

    // this gets the new recipes direction
    let newRecipeDirectionsBox = $(this).parent(".control").parent(".content").children(".directions").children(".text-input-for-recipe")
    let newRecipeDirections = newRecipeDirectionsBox.html()


    console.log(newRecipeDirections);



    savedRecipeObj.name.push(newRecipeName)
    savedRecipeObj.ingredients.push(newRecipeIngredients)
    savedRecipeObj.instrcuctions.push(newRecipeDirections)




    savedRecipe.push(savedRecipeObj);
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));


}



// builds an object based on the ingredients in the chosen recipe
function buildRecipeToSave(data2) {

    let savedRecipeObj = {
        name: [],
        ingredients: [],
        instrcuctions: [],
        favorite: false,
        created: false,
    }

    for (let index = 0; index < data2.extendedIngredients.length; index++) {


        let amount = data2.extendedIngredients[index].measures.us.amount
        let unit = data2.extendedIngredients[index].measures.us.unitLong
        let name = data2.extendedIngredients[index].name



        savedRecipeObj.ingredients.push(amount + " " + unit + " " + name)
    }

    let saveInstructions = [];

    let steps = ""
    for (let index = 0; index < data2.analyzedInstructions[0].steps.length; index++) {

        steps += ((index + 1) + " " + data2.analyzedInstructions[0].steps[index].step + " " + "<br>")

    }
    savedRecipeObj.instrcuctions.push(steps)

    savedRecipeObj.name.push(data2.title)




    savedRecipe.push(savedRecipeObj);
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
}





function findFavoriteRecipeName() {

    console.log("we here?");

    let thisElement = $(this).parent(".control").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")

    let thisTitle = thisElement.text().trim()
    console.log(thisTitle);

    addFavoriteToObject(thisTitle)



}

function addFavoriteToObject(thisTitle) {

    for (let index = 0; index < savedRecipe.length; index++) {
        const element = savedRecipe[index].name[0];



        if (element === thisTitle) {


            savedRecipe[index].favorite = true
            //  push to array, push array to local storage

        }


    }

    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));


}


// starts of page load
init()






//event listeners 
$("#save-btn").on("click", saveInts)

$("#see-recipe-btn").on("click", saveInts)

$("#recipe-container").on("click", ".save-recipe", saveRecipe)
$("#recipe-container").on("click", ".favorite-btn", findFavoriteRecipeName)




$("#go-back-button").on("click", function () {
    document.location.replace('./index.html');
    console.log("clicked");

})

$("#go-to-recipes-button").on("click", function () {
    document.location.replace('./recipes.html');

})



$("#search-google-btn").on("click", searchGoogleMaps)




let dropdown = $(".dropdown")
dropdown.on("click", function (e) {
    // e.stopPropagation();
    dropdown.toggleClass('is-active');


    if (e.target.type === "checkbox" || $(this).is("label")) {
        dropdown.toggleClass('is-active');


    }

})

$("#search-btn").on("click", function (e) {
    e.preventDefault()

    saveInts()
})


$(".create-new-recipe-btn").on("click", createEmptyRecipe)



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
  
// function enableBtn() {
//     document.getElementById("recipe-save-1", "recipe-save-2","recipe-save-3", "recipe-save-4", "recipe-save-5").disabled = false;
// }


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

