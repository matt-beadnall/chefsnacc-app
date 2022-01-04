import "./Recipes.css";

import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import CreateRecipeMenu from "../components/CreateRecipeMenu";
import EditRecipe from "./EditRecipe/index";
import Recipe from "../components/Recipe.js";
import RecipeModal from "../components/RecipeModal";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import axios from "axios";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
    color: "#59eae5",
  },
}));

const RecipeDisplay = ({ displayArchived, sortingMethod }) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(undefined);

  const close = () => {
    setModalOpen(false);
    setSelectedRecipe(undefined);
  };
  const open = (recipe) => {
    setModalOpen(true);
    setSelectedRecipe(recipe);
  };

  let sorted;

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/`
      )
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let filterType = displayArchived
    ? (current) => current.hidden
    : (current) => !current.hidden;
  if (sortingMethod === "alpha") {
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

  const item = {
    hidden: { opacity: 0, y: 200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.6,
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <div>
          {/* <React.Fragment> */}
      <motion.div
        className="recipes-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sorted.filter(filterType).map((recipe, i) => (
            <motion.div
              key={i}
              variants={item}
              // whileHover={{ scale: 1.03 }}
              // whileTap={{ scale: 1 }}
              // onClick={() => (modalOpen ? close() : open(recipe))}
            >
              <Recipe
                recipe={recipe}
                ingredients={ingredients}
                // selectRecipe={selectCurrentRecipe(currentRecipe)}
              />
            </motion.div>
        ))}
      </motion.div>
          {/* </React.Fragment> */}
      <AnimatePresence
        // Disable any initial animations on children that
        // are present when the component is first rendered
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        exitBeforeEnter={true}
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        {modalOpen && (
          <RecipeModal
            modalOpen={modalOpen}
            handleClose={close}
            recipe={selectedRecipe}
          >
            <EditRecipe recipeIdentifier={selectedRecipe._id} />
          </RecipeModal>
        )}
      </AnimatePresence>
    </div>
  );
};

const ControlsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background: coral; */
`;

const RecipesHeader = styled.div`
  vertical-align: middle;
  width: 100%;
  margin: auto;
`;

const DescriptionLine = styled.div`
  /* background: cyan; */
  text-align: center;
  /* visibility: ${(props) => (props.collapsed ? "hidden" : "visible")}; */
  /* transition: visibility 0.3s linear; */
`;

export default function Recipes() {
  const [showArchived, setShowAll] = useState(false);
  const [sortingMethod, setSortingMethod] = useState("date");
  const classes = useStyles();
  const [buttonDesc, setButtonDesc] = useState("null");

  const toggleDisplayAll = () => {
    setShowAll(!showArchived);
  };

  const handleSorting = (event, newSorting) => {
    setSortingMethod(newSorting);
  };

  const setButtonDescription = (message) => {
    if (message !== "") {
      setButtonDesc(message);
    } else {
      setButtonDesc(":)");
    }
  };

  return (
    <div>
      <RecipesHeader>
        <ControlsGroup>
          <CreateRecipeMenu />
          <button
            style={{ width: "50px" }}
            onMouseOver={() => setButtonDescription("Tell me what to cook")}
            onMouseLeave={() => setButtonDescription("")}
          >
            *
          </button>
          <button
            style={{ width: "50px" }}
            onMouseOver={() => setButtonDescription("Random")}
            onMouseLeave={() => setButtonDescription("")}
          >
            ?!
          </button>
          <ToggleButtonGroup
            value={sortingMethod}
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
        </ControlsGroup>
        <DescriptionLine>{buttonDesc}</DescriptionLine>
      </RecipesHeader>
      <RecipeDisplay displayArchived={false} />
      <Button
        onClick={() => toggleDisplayAll()}
        variant="outlined"
        color="primary"
      >
        {showArchived ? "Hide Archived" : "Show Archived"}
      </Button>
      <div className={classes.container}>
        {showArchived && (
          <RecipeDisplay displayArchived={true} sortingMethod={sortingMethod} />
        )}
      </div>
    </div>
  );
}
