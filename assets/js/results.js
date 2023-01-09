// $.ajax({
//     //     url: queryRecipeURL,
//     //     method: 'GET',
//     // }).then(function (response) {
//     //     // console.log(response);
//     //     let chosenRecipe = response.meals[0]; //this selects the first array item which is the meal recipe 
//     //     //  console.log(chosenRecipe);
//     //     let ingredient1 = chosenRecipe.strIngredient1; // strIngredient1- strIngredient20 gives the 20 recipe ingredients, some meals only have lik 5 or 10 ingredients and the rest are "" or null
//     //     // console.log("ingredient 1: " + ingredient1);
//     //     //we need to figure out how to ignore those blank or null ingredientas 
//     //     let recipeInstructions = chosenRecipe.strInstructions; //selects the recipe instructions 
//     //     // console.log("instructions: " + recipeInstructions);
//     //     let recipeIcon = chosenRecipe.strMealThumb; //gives the meal thumbnail/image 
//     //     // console.log("icon link: " + recipeIcon);
//     //     let recipeMeasure = chosenRecipe.strMeasure1; //strMeasure1-strMeasure20 gives the measurements (1cup etc, we need to figure out how to ignore blanks and null) 
//     //     // console.log("measurements: " + recipeMeasure);
//     //     var youtubeVid = chosenRecipe.strYoutube; //gives you the youtube video for the recipe 
//     //     // console.log("youtube vid: " + youtubeVid);
//     //     //is a 
//     let queryRecipeURL = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + mealID; //create the URL for the API that gives the meal recipe
//     // console.log(queryRecipeURL); 
//     // })