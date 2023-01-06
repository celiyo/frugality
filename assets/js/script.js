//load code when js doc is fully ready
$(document).ready(function () {
  ///variable that corrects value for input1=food ingredient
  //variable that collect value for input2=drink ingredient
  //variable that selects button to click to submit

  //when submit button is clicked input 1 is fed into API for food and input 2 is fed into API for drinks

  //once submit is clicked, the input sections, button, recent searched and suggested serached are hidden is hidden
  //as above, data attribute of the above changes to hidden?
  //then data attributes for cards with suggested menu and cocktail changes to visible

  const foodEl = $('#foodIngredient');
  const cocktailEl = $('#cocktailIngredient');
  const matcherEl = $('#matcher');

  // Get a random meal
  function getMeal(name) {
    let queryFoodURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + name;

    $.ajax({
      url: queryFoodURL,
      method: 'GET',
    }).then(function (response) {
      // getRandomMeal(response.meals);
      console.log(getRandom(response.meals));
    });
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

    getMeal(foodInput);
  });
});
