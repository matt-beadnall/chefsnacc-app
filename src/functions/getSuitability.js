/**
   * Takes a recipe and all the ingredients 
   * TODO - take more parameters, such as available cooking time, and factor this in.
   * @param {recipe} recipe 
   * @param {pantry ingredients} pantry_ingr 
   * @returns 
   */
 export default function getSuitability(recipe, pantry_ingr) {
    var recipeIngredients = [];
    var matchedIngredients = 0;

    recipe.ingredients.forEach((ingredient) => {
      let available;
      if (pantry_ingr.includes(ingredient.name)) {
        available = true;
        matchedIngredients++;
      } else {
        available = false;
      }
      recipeIngredients.push({ name: ingredient.name, available: available });
    });

    let totalIngredients = recipeIngredients.length;

    var result = matchedIngredients / totalIngredients;

    var formatter = new Intl.NumberFormat("en-EN", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(matchedIngredients === 0 ? 0 : result);
  }