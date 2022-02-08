
let modalBtn = $("#modal-btn")


const spoonAPIKey = "61eaa0a762fa43dfb497dc228b48ebd3"
const googleAPIKey = "AIzaSyBrDSZjlqk6nk4E7-qJeQrilr6yOlcXvmY"
let intolerantParams = "";
let intolerantArray = [];
let searchTerm = ""

let spoonURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=61eaa0a762fa43dfb497dc228b48ebd3";
let googleURL = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=supermarket&zoom=11`

let recipeLocation = 0;


let recipeNameArray = [];
let recipeIngredientsArray = [];
let recipeDirectionsArray = [];



//search bar? - buttons --- need to get buttons value



// save recipe in local storage
// make it so the recipe expands when hovered


// move to pages depending on what is clicked



//modual for the map when button is clicked



//connect the searches to the card that way the card is populated with the info from the api
// get info from api
// set values of the card to be those recieved from the api


// would there be a way to make a function a favorite?  or have those be most recently viewed?

// would i need a random number genorator to make the recipes that show up random? or i could show last searched..



// save button for recipe, and when you click it it saves the recipe to the recipe page in local storage
// take the values from the recipe
//save it to local storage



function searchFunction(e) {
    e.preventDefault()


    //  this adds the searched value to the search term variable. 
    let searchItem = $("#search").val();
    searchTerm = "&query=" + searchItem

    //    this then calls the api with the searched value
    callAPI()
}


function init() {
    //  this gets all of the stored intolerant items
    getStoredIntolerants()

    // this compiles all of the current intolerances
    compileParams()

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

    // calls the api
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
            console.log(spoonURL);
        })
}




// googleMap = '<figure class = "image"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="' + googleURL + '" allowfullscreen></iframe></figure>'





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
}



function getStoredIntolerants() {

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


function saveRecipe() {

    // this taken the value in the forum and pushes them into arrays
    recipeNameArray.push($("#name").val())
    recipeIngredientsArray.push($("#ingredients").val())
    recipeDirectionsArray.push($("#directions").val())

    // this then takes the new arrays and pushes them into local storage
    localStorage.setItem("recipeName", JSON.stringify(recipeNameArray));
    localStorage.setItem("recipeIngredients", JSON.stringify(recipeIngredientsArray));
    localStorage.setItem("recipeDirections", JSON.stringify(recipeDirectionsArray));


}


// starts of page load
init()


//event listeners 
$("#save-btn").on("click", saveInts)
$("#search-form").on("submit", searchFunction)
$("#save-recipe").on("click", saveRecipe)