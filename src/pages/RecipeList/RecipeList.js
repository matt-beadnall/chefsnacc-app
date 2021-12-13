import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import CreateRecipe from "../../components/CreateRecipe";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Recipe from "../../components/Recipe.js";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import axios from "axios";

// import styled from "styled-components";

// const BoxContainer = styled.div`
//   width: 280px;
//   min-height: 550px;
//   display: flex;
//   flex-direction: column;

//   background-color: #fff;
//   box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
//   position: relative;
//   overflow: hidden;
// `;

const useStyles = makeStyles((theme) => ({
  sort_button: {
    height: "40px",
    top: "50%",
  },
  list_content: {
    backgroundColor: "light grey",
  },
  header: {
    padding: "15px",
    borderRadius: "0px",
    verticalAlign: "middle",
    width: "80vw",
    margin: "auto",
    zIndex: 0,
  },

  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
    color: "#59eae5",
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    width: "80vw",
    margin: "auto",
  },
  control_group: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  progress: {},
}));

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showArchived, setShowAll] = useState(false);
  const [sorting, setSorting] = useState("date");
  const [currentlySelected, setSelected] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://chefsnaccbackend-env.eba-unycwpym.eu-west-2.elasticbeanstalk.com/chefsnacc/recipes/`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://chefsnaccbackend-env.eba-unycwpym.eu-west-2.elasticbeanstalk.com/chefsnacc/ingredients/`)
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectCurrentRecipe = (currentRecipe) => {
    if (currentRecipe._id === currentlySelected) {
      console.log("recipe deselect");
      setSelected(null);
    } else {
      setSelected(currentRecipe._id);
    }
  };

  const RecipeDisplay = ({ displayArchived }) => {
    /* <table style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Chef</th>
            <th>Description</th>
            <th>Version</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{recipeList()}</tbody>
      </table> */
    // deal with sorting first:
    let sorted;
    let filter = displayArchived
      ? (current) => current.hidden
      : (current) => !current.hidden;
    if (sorting === "alpha") {
      sorted = recipes.slice().sort((a, b) => {
        a.name = a.name === undefined ? "" : a.name; // make sure nothing is undefined before sorting
        b.name = b.name === undefined ? "" : b.name;
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      sorted = recipes.slice().sort((a, b) => a.date_added - b.date_added);
    }
    return (
      // displayGrid(sorted, filter)
      displayGrid(sorted, filter)
    );
  };

  const toggleDisplayAll = () => {
    setShowAll(!showArchived);
  };

  const handleSorting = (event, newSorting) => {
    setSorting(newSorting);
  };

  return (
    <>
      <div className={classes.list_content}>
          <div className={classes.header}>
            <div className={classes.control_group}>
              <CreateRecipe />
              <ToggleButtonGroup
                value={sorting}
                exclusive
                onChange={handleSorting}
                aria-label="recipe sorting"
              > 
                <ToggleButton value="alpha" aria-label="alpha">
                  ALPHA
                </ToggleButton>
                <ToggleButton value="date" aria-label="date">
                   DATE 
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
        <RecipeDisplay displayArchived={false} />
        <Button onClick={() => toggleDisplayAll()} variant="outlined" color="primary">
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
        <div className={classes.container}>
          {showArchived ? <RecipeDisplay displayArchived={true} /> : null}
        </div>
    </>
  );

  function displayGrid(sorted, filter) {
    return (
      <div className={classes.container}>
        {sorted.length === 0 ? (
          <CircularProgress className={classes.progress}></CircularProgress>
        ) : (
          sorted.filter(filter).map((currentRecipe, i) => {
            return (
              <div onClick={() => selectCurrentRecipe(currentRecipe)} key={i}>
                <Recipe
                  recipe={currentRecipe}
                  ingredients={ingredients}
                  currentlySelected={currentlySelected}
                  // selectRecipe={selectCurrentRecipe(currentRecipe)}
                  key={i}
                  _id={i}
                />
              </div>
            );
          })
        )}
      </div>
    );
  }

  /**
   * Material-ui version of the display
   * @param {*} sorted
   * @param {*} filter
   * @returns
   */
  // eslint-disable-next-line
  function displayGridList(sorted, filter) {
    return (
      <div>
        <GridList cellHeight={160} cols={3}>
          {sorted.filter(filter).map((currentRecipe, i) => (
            <GridListTile key={currentRecipe._id} cols={1}>
              <Recipe
                selected={
                  currentRecipe._id === currentlySelected ? true : false
                }
                recipe={currentRecipe}
                key={i}
                _id={currentRecipe._id}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
