/**
   * Takes a recipe and all the ingredients 
   * TODO - take more parameters, such as available cooking time, and factor this in.
   */
 export default function getSuitability(recipe, ingredients) {
    var recipeIngredients = [];
    var matchedIngredients = 0;

    const pantry = ingredients.map((ingredient) => {
      return ingredient.name;
    });
    
    console.log(recipe.ingredients)

    recipe.ingredients.forEach((ingredient) => {
      let available;
      if (pantry.includes(ingredient.name)) {
        available = true;
        matchedIngredients++;
        console.log({matched:true})
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