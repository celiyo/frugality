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




    function getDrinkId(drink) {
        let queryDrinkURL = "https://thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink; 
        console.log(queryDrinkURL);
        $.ajax({
            url: queryDrinkURL,
            method: 'GET',
        }).then(function (response) {
            // console.log("drink URL: " +queryDrinkURL); 
            //now get random drink name
            let randomDrink = getRandom(response.drinks);
            // console.log(randomDrink);
            let drinkID = (randomDrink.idDrink);
            console.log("drink ID" + drinkID); 
            //store 
            localStorage.setItem("drink-id", drinkID);


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
        getDrinkId(drinkInput);
        
    });
});


//Meal of The Day name and image.



// Get a random meal

function getMealInspo() {
    let queryMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    // console.log(queryMealURL);
    var randomInspo = $("#meal-text");
    var inspoImg = $("#inspo-img");

    $.ajax({
        url: queryMealURL,
        method: 'GET',
    }).then(function (response) {
        // console.log(response);
         //random meal
        var randomMealInspo = response.meals[0];
        var randomImg = (randomMealInspo.strMealThumb);
        var mealInspoName = (randomMealInspo.strMeal);
        randomInspo.text(mealInspoName);
        inspoImg.attr("src", randomImg);
        // localStorage.setItem("Inspo-Name", mealInspoName);
    });
}

getMealInspo();