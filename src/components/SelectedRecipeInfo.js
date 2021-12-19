import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  select_recipe_info: {
    // overflowX: "hidden",
    // overflowy: "auto",
    padding: "10px",
    width: "auto",
    height: "auto",
    backgroundColor: "#ffdc2e",
    position: "absolute",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px grey",
    zIndex: "2000",
    textAlign: 'right',
  },
  available: {
    color: "green",
    textDecoration: 'line-through',
  },
  unavailable: {
    color: "grey",
  },
  triangleUp: {
    position: 'absolute',
    top: -15,
    right: 0,
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "15px solid #ffdc2e",
  },
  ingredientCount: {
    color: "white",
  },
}));

export default function SelectedRecipeInfo(props) {
  const classes = useStyles();
  const recipe = props.selected;

  // eslint-disable-next-line
  const getSuitability = (matchedIngredients, totalIngredients) => {
    var result = matchedIngredients / totalIngredients;

    var formatter = new Intl.NumberFormat("en-EN", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(matchedIngredients === 0 ? 0 : result);
  };

  if (props.selected !== undefined) {
    const pantryIngredients = props.ingredients.map((ingredient) => {
      return ingredient.name;
    });

    var recipeIngredients = [];
    // eslint-disable-next-line
    let matchedIngredients = 0;

    recipe.ingredients.forEach((ingredient) => {
      let available;
      if (pantryIngredients.includes(ingredient.name)) {
        available = true;
        // eslint-disable-next-line
        matchedIngredients++;
      } else {
        available = false;
      }
      recipeIngredients.push({ name: ingredient.name, available: available });
    });

    let totalIngredients = recipeIngredients.length;

    console.log(recipeIngredients);
    return (
      <div className={classes.select_recipe_info}>
        <div className={classes.triangleUp} />
        <h3 className={classes.ingredientCount}>
          {totalIngredients} ingredients
        </h3>
        {recipeIngredients.map((ingredient) => {
          return (
            <div
              className={
                ingredient.available ? classes.available : classes.unavailable
              }
            >
              {ingredient.name}
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
