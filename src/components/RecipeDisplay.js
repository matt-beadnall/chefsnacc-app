import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import React,{ useEffect, useState } from 'react'

import EditRecipe from "../pages/EditRecipe/index";
import Recipe from "../components/Recipe.js";
import RecipeModal from "./RecipeModal"
import axios from 'axios';

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
      
    if (sortingMethod === "ALPHA") {
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
          {sorted.filter(filterType).map((recipe) => (
              <motion.div
                key={recipe._id}
                variants={item}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 1 }}
                onClick={() => (modalOpen ? close() : open(recipe))}
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

export default RecipeDisplay
