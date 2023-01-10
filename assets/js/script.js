//load code when js doc is fully ready
$(document).ready(function () {

    const foodEl = $('#foodIngredient');
    const cocktailEl = $('#cocktailIngredient');
    const searchBtnEl = $('#searchBtn');
    // let randomMeal; //declare these variables outside the function incase it needs to be used later
    // let mealID;//declare these variables outside the function incase it needs to be used later
    // let queryRecipeURL;

    // Get a random meal
    function getMealId(name) {
        let queryFoodURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + name;

        // console.log(queryFoodURL);
        $.ajax({
            url: queryFoodURL,
            method: 'GET',
            success: function (response) {
                if (response.meals) {
                  window.location.href = './results.html';
                }
              },
        }).then(function (response) {
            let randomMeal = getRandom(response.meals) //choosed a random meal from the array of meals
            let mealID = (randomMeal.idMeal);// chooses that meals ID
            localStorage.setItem("meal-id", mealID);
        });
    }




    function getDrink(drink) {
        let queryDrinkURL = "https://thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
        $.ajax({
            url: queryDrinkURL,
            method: 'GET',
        }).then(function (response) {
            // console.log("drink URL: " +queryDrinkURL); 
            //now get random drink name
            let randomDrink = getRandom(response.drinks);
            // console.log(randomDrink);
            let drinkID = randomDrink.idDrink;
            // console.log(drinkID); 
            //now feed that ID into drink recipe API
            let drinkURL = "https://thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
            // console.log(drinkURL); 
            $.ajax({
                url: drinkURL,
                method: 'GET',
            }).then(function (response) {
                // console.log(response);
                let chosenDrink = response.drinks[0];
                let drinkName = chosenDrink.strDrink;
                console.log(chosenDrink);
                //drink thumbnail 
                let drinkImage = chosenDrink.strDrinkThumb;
                // console.log(drinkImage);
                let drinkGlass = chosenDrink.strGlass; //type of glass to put the drink in
                let drinkIngredient1 = chosenDrink.strIngredient1; //drink ingredient1, same issue as meal recipe
                // console.log(drinkIngredient1);
                let drinkMeasure1 = chosenDrink.strMeasure1; //drink measurement, again same issue as above,
                // console.log(drinkMeasure1);
                let drinkVid = chosenDrink.strVideo; //youtube video, not all drinks have a video
                // console.log(drinkVid);
            })

        })

    }

    // Randomize the meals/cocktails
    function getRandom(arr) {
        let random = arr[Math.floor(Math.random() * arr.length)];
        return random;
    }

    // On submit display one random meal
    searchBtnEl.on('click', function (e) {
        e.preventDefault();

        let foodInput = foodEl.val().trim().split(' ').join('_');
        let drinkInput = cocktailEl.val().trim().split(' ').join('_');

        getMealId(foodInput);//calls the getMeal function and takes the input 'foodInput' (replaces the input 'name' with foodInput)  
        // getDrink(drinkInput);
        
    });
});


//Meal of The Day name and image.

var randomInspo = $("#meal-text");

// Get a random meal

function getMealInspo() {
    let queryMealURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i';

    // console.log(queryMealURL);
    $.ajax({
        url: queryMealURL,
        method: 'GET',
    }).then(function (response) {
        var randomMeal = (response.meals) //choosed a random meal from the array of meals
        // var mealName = (randomInspo.strMeal);// chooses that meals Name
        // randomMeal.textcontent(mealName);

    });
}

// getMealInspo();