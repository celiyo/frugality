//load code when js doc is fully ready
$(document).ready(function () {

    const foodEl = $('#foodIngredient');
    const cocktailEl = $('#cocktailIngredient');
    const matcherEl = $('#matcher');
    let randomMeal; //declare these variables outside the function incase it needs to be used later
    let mealID;//declare these variables outside the function incase it needs to be used later
    let queryRecipeURL;

    // Get a random meal
    function getMealId(name) {
        let queryFoodURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + name;

        // console.log(queryFoodURL);
        $.ajax({
            url: queryFoodURL,
            method: 'GET',
        }).then(function (response) {
            randomMeal = getRandom(response.meals) //choosed a random meal from the array of meals
            mealID = (randomMeal.idMeal);// chooses that meals ID
            // console.log(randomMeal);
            //randomMeal.strMeal gives you the meal name
            // console.log(mealID); 
            queryRecipeURL = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + mealID; //create the URL for the API that gives the meal recipe
            // console.log(queryRecipeURL); 
            //now feed the recipe url into new ajax
            $.ajax({
                url: queryRecipeURL,
                method: 'GET',
            }).then(function (response) {
                // console.log(response);
                let chosenRecipe = response.meals[0]; //this selects the first array item which is the meal recipe 
                //  console.log(chosenRecipe);
                let ingredient1 = chosenRecipe.strIngredient1; // strIngredient1- strIngredient20 gives the 20 recipe ingredients, some meals only have lik 5 or 10 ingredients and the rest are "" or null
                // console.log("ingredient 1: " + ingredient1);
                //we need to figure out how to ignore those blank or null ingredientas 
                let recipeInstructions = chosenRecipe.strInstructions; //selects the recipe instructions 
                // console.log("instructions: " + recipeInstructions);
                let recipeIcon = chosenRecipe.strMealThumb; //gives the meal thumbnail/image 
                // console.log("icon link: " + recipeIcon);
                let recipeMeasure = chosenRecipe.strMeasure1; //strMeasure1-strMeasure20 gives the measurements (1cup etc, we need to figure out how to ignore blanks and null) 
                // console.log("measurements: " + recipeMeasure);
                var youtubeVid = chosenRecipe.strYoutube; //gives you the youtube video for the recipe 
                // console.log("youtube vid: " + youtubeVid);
                //is a 
            })

            // return randomDrink; //needed?
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
    matcherEl.on('click', function (e) {
        e.preventDefault();

        let foodInput = foodEl.val().trim().split(' ').join('_');
        let drinkInput = cocktailEl.val().trim().split(' ').join('_');

        getMeal(foodInput);//calls the getMeal function and takes the input 'foodInput' (replaces the input 'name' with foodInput)  
        getDrink(drinkInput);
    });
});
