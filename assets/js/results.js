$(document).ready(function () {
    function getMeal() {
        let mealID = localStorage.getItem("meal-id");
        let queryRecipeURL = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + mealID; //create the URL for the API that gives the meal recipe
        //console.log(queryRecipeURL);
        let ingredientsEl = $("#ingredients");
        let methodEl = $("#info");
        let videoLink = $("#videoLink");
        let mealImg = $("#randomMealImg"); 
        let mealName = $("#meal-name");

        $.ajax({
            url: queryRecipeURL,
            method: 'GET',
        }).then(function (response) {
            //  console.log(response);
            let chosenRecipe = response.meals[0]; //this selects the first array item which is the meal recipe 
             let recipeName = response.meals[0].strMeal; 
            //  console.log(recipeName); 
            mealName.text(recipeName);
            let ingredient1 = chosenRecipe.strIngredient1; // strIngredient1- strIngredient20 gives the 20 recipe ingredients, some meals only have lik 5 or 10 ingredients and the rest are "" or null
            console.log("ingredient 1: " + ingredient1);
            //we need to figure out how to ignore those blank or null ingredientas 
            let recipeInstructions = chosenRecipe.strInstructions; //selects the recipe instructions  
            // console.log("instructions: " + recipeInstructions);  
            let methodText = $("<p>"); 
            methodText.text(recipeInstructions);
            // console.log(methodText);
            methodEl.append(methodText); 
            let recipeIcon = chosenRecipe.strMealThumb; //gives the meal thumbnail/image 
            mealImg.attr("src", recipeIcon);
            // console.log("icon link: " + recipeIcon);
            let recipeMeasure = chosenRecipe.strMeasure1; //strMeasure1-strMeasure20 gives the measurements (1cup etc, we need to figure out how to ignore blanks and null) 
            // console.log("measurements: " + recipeMeasure);
            var youtubeVid = chosenRecipe.strYoutube; //gives you the youtube video for the recipe 
            // console.log("youtube vid: " + youtubeVid); 
            var youtubeEmbd = youtubeVid.split('watch?v=').join('embed/')
            videoLink.attr("src", youtubeEmbd);
            // Get ingredients 

            let rawIngredients = $.map(Object.keys(chosenRecipe), function (val) {
                if (val.indexOf('strIngredient') != -1) {
                    return chosenRecipe[val];
                }
            });
            let filteredIngredients = rawIngredients.filter(function (val) {
                return val !== '';
            });
            // Get quantities
            let rawQty = $.map(Object.keys(chosenRecipe), function (val) {
                if (val.indexOf('strMeasure') != -1) {
                    return chosenRecipe[val];
                }
            });
            let filteredQty = rawQty.filter(function (val) {
                return val !== ' ';
            });
            // Display quantities and ingredients
            for (let i = 0; i < filteredQty.length, i < filteredIngredients.length; i++) {
                let qty = filteredQty[i];
                let ingredient = filteredIngredients[i];
                let ingredientEl = $('<p>')
                    .addClass('mb-1')
                    .text(qty + ' ' + ingredient);
                ingredientsEl.append(ingredientEl);
            }
        })
    }

    getMeal();
});
