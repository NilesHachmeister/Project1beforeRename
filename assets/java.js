
let modalBtn = $("#modal-btn")


const spoonAPIKey = "61eaa0a762fa43dfb497dc228b48ebd3"
const googleAPIKey = "AIzaSyBrDSZjlqk6nk4E7-qJeQrilr6yOlcXvmY"
let intolerantParams = "";
let intolerantArray = [];
let searchTerm = ""

let spoonURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=61eaa0a762fa43dfb497dc228b48ebd3";
let googleURL = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=supermarket&zoom=11`


let recipeIDArray = [];
let recipeID = 0;


let recipeNameArray = [];
let recipeIngredientsArray = [];
let recipeDirectionsArray = [];




//dropdown restrictions







//dropdown restri


const languages = $('#languages').filterMultiSelect({ 
    items: [
        ["Ruby","r"],
        ["C++","c",false,true]
    ],
    caseSensitive:false,
    placeholderText:"nothing selected",
    allowEnablingAndDisabling: true,
   
});

languages.getSelectedOptionsAsJson(includeDisabled=true);

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
            buildIngredients(data2)
            buildInstructions(data2)
        });

}




// googleMap = '<figure class = "image"><iframe width="100%" height="100%" frameborder="0" style="border:0" src="' + googleURL + '" allowfullscreen></iframe></figure>'


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



// builds an object based on the ingredients in the chosen recipe
function buildIngredients(data2) {

    let saveRecipeObj = {
        amount: [],
        unit: [],
        name: [],
    }

    for (let index = 0; index < data2.extendedIngredients.length; index++) {


        let amount = data2.extendedIngredients[index].measures.us.amount
        let unit = data2.extendedIngredients[index].measures.us.unitLong
        let name = data2.extendedIngredients[index].name


        saveRecipeObj.amount.push(amount)
        saveRecipeObj.unit.push(unit)
        saveRecipeObj.name.push(name)
    }

    // call a function to spit out the obj

}

// builds an instructions array
function buildInstructions(data2) {
    let saveInstructions = [];

    for (let index = 0; index < data2.analyzedInstructions[0].steps.length; index++) {

        let step = (index + 1) + " " + data2.analyzedInstructions[0].steps[index].step
        saveInstructions.push(step)
    }
    console.log(saveInstructions);
}


// starts of page load
init()

$(document).foundation();

//event listeners 

$("#save-btn").on("click", saveInts)
$("#search-form").on("submit", searchFunction)
$("#save-recipe").on("click", saveRecipe)








$("#recipe-save-1").on("click", function () {
    recipeID = recipeIDArray[0]
    callAPIByID(recipeID)
});
$("#recipe-save-2").on("click", function () {
    recipeID = recipeIDArray[1]
    callAPIByID(recipeID)
});
$("#recipe-save-3").on("click", function () {
    recipeID = recipeIDArray[2]
    callAPIByID(recipeID)
});
$("#recipe-save-4").on("click", function () {
    recipeID = recipeIDArray[3]
    callAPIByID(recipeID)
});
$("#recipe-save-5").on("click", function () {
    recipeID = recipeIDArray[4]
    callAPIByID(recipeID)
});
$("#recipe-save-6").on("click", function () {
    recipeID = recipeIDArray[5]
    callAPIByID(recipeID)
});