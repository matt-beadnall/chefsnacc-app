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

    console.log({pantry_ingr:pantry_ingr, recipe_ingredients:recipe.ingredients})
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
    
    // console.log({totalIngredients: totalIngredients, matchedIngredients: matchedIngredients});

    return matchedIngredients === 0 ? 0 : result * 100;
  }