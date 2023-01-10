$(document).ready(function () {
  function getMeal() {
    let mealID = localStorage.getItem('meal-id');
    let queryRecipeURL = 'https://themealdb.com/api/json/v1/1/lookup.php?i=' + mealID; //create the URL for the API that gives the meal recipe
    //console.log(queryRecipeURL);
    let ingredientsEl = $('#ingredients');
    let methodEl = $('#info');
    let videoLink = $('#videoLink');
    let mealImg = $('#randomMealImg');
    let mealName = $('#randomMealName');
    const categoryEl = $('#category');
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
      console.log('ingredient 1: ' + ingredient1);
      //we need to figure out how to ignore those blank or null ingredientas
      let recipeInstructions = chosenRecipe.strInstructions; //selects the recipe instructions
      // console.log("instructions: " + recipeInstructions);
      let methodText = $('<p>');
      methodText.text(recipeInstructions);
      // console.log(methodText);
      methodEl.append(methodText);
      let recipeIcon = chosenRecipe.strMealThumb; //gives the meal thumbnail/image
      mealImg.attr('src', recipeIcon);

      // Display the meal category
      categoryEl.text(chosenRecipe.strCategory);

      // console.log("icon link: " + recipeIcon);
      let recipeMeasure = chosenRecipe.strMeasure1; //strMeasure1-strMeasure20 gives the measurements (1cup etc, we need to figure out how to ignore blanks and null)
      // console.log("measurements: " + recipeMeasure);
      var youtubeVid = chosenRecipe.strYoutube; //gives you the youtube video for the recipe
      // console.log("youtube vid: " + youtubeVid);
      var youtubeEmbd = youtubeVid.split('watch?v=').join('embed/');
      videoLink.attr('src', youtubeEmbd);
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
    });
  }
  function getRandom(arr) {
    let random = arr[Math.floor(Math.random() * arr.length)];
    return random;
  }
  function getDrink() {
    let drinkId = localStorage.getItem('drink-id');
    let drinkURL = 'https://thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId;
    // console.log(drinkId);
    // console.log(drinkURL);
    let drinkNameEl = $('#drink-name');
    let drinkImgEl = $('#drink-image');
    let drinkDesc = $('#description');

    $.ajax({
      url: drinkURL,
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      let chosenDrink = response.drinks[0];
      let drinkName = chosenDrink.strDrink;
      drinkNameEl.text(drinkName);
      console.log(chosenDrink);
      //drink thumbnail
      let drinkImage = chosenDrink.strDrinkThumb;
      drinkImgEl.attr('src', drinkImage);
      var compliments = ['Try one of these pairings with your meal!', 'Fancy a drink? '];
      let randomCompliment = getRandom(compliments);
      drinkDesc.text(randomCompliment);

      // // console.log(drinkImage);
      // let drinkGlass = chosenDrink.strGlass; //type of glass to put the drink in
      // let drinkIngredient1 = chosenDrink.strIngredient1; //drink ingredient1, same issue as meal recipe
      // // console.log(drinkIngredient1);
      // let drinkMeasure1 = chosenDrink.strMeasure1; //drink measurement, again same issue as above,
      // // console.log(drinkMeasure1);
      // let drinkVid = chosenDrink.strVideo; //youtube video, not all drinks have a video
      // // console.log(drinkVid);
    });
  }

  getMeal();
  getDrink();
});
