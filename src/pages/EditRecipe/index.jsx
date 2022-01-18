import "./index.css";

import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { applyChange, diff, revertChange } from "deep-diff";
import { useNavigate, useParams } from "react-router-dom";

import Gallery from "./../Gallery.js";
import HeartRating from "../../components/HeartRating.js";
import { Reorder } from "framer-motion/dist/framer-motion";
import Select from "react-select";
import UploadImage from "../../components/UploadImage.js";
import axios from "axios";
import back from "../../images/back.svg";
import { motion } from "framer-motion/dist/framer-motion";
import reorder from "../../images/reorder.svg";

const options = [
  { value: "vegan", label: "vegan", code: "VGN" },
  { value: "gluten-free", label: "gluten-free", code: "GLF" },
  { value: "vegetarian", label: "vegetarian", code: "VGT" },
  { value: "omni", label: "omni", code: "ALL" },
];
// const measures = [
//   { value: "lb", label: "lb" },
//   { value: "x", label: "x" },
//   { value: "g", label: "g" },
//   { value: "cup", label: "cup" },
//   { value: "ml", label: "ml" },
//   { value: "tsp", label: "tsp" },
//   { value: "tbsp", label: "tbsp" },
// ];

export default function EditRecipe({ recipeIdentifier }) {
  const INITIAL = {
    id: "",
    name: "",
    chef: {},
    description: "",
    category: "",
    ingredients: [],
    method: [],
    time: 0,
    version: 0,
    pictures: "",
    emoji: "",
    rating: 0,
    date_created: new Date(),
    date_modified: new Date(),
    changes: [],
    hidden: false,
    notes: "",
  };

  const [originalRecipe, setOriginalRecipe] = useState(INITIAL);
  const [currentRecipe, setCurrentRecipe] = useState(INITIAL);
  // const [historicalRecipe, setHistoricalRecipe] = useState(INITIAL);

  const [changes, setChanges] = useState(undefined);

  // const [recipe, dispatch] = useReducer(reducer, INITIAL);

  const [showMethod, setShowMethod] = useState(true);
  const [showIngredients, setShowIngredients] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // const reducer = (recipe, action) => {
  //   switch (action.type) {
  //     case "chef":
  //       return {
  //         ...recipe,
  //         chef: e.target.value,
  //       };
  //   }
  // };

  useEffect(() => {
    const recipeId = recipeIdentifier === undefined ? id : recipeIdentifier;
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/recipe/${recipeId}`
      )
      .then((response) => {
        setCurrentRecipe(response.data);
        setOriginalRecipe(response.data);
        // setHistoricalRecipe(recipe);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const changeEditMode = () => {
    setReadOnly(!readOnly);
    console.log(readOnly);
  };

  /**
   * If no changes, auto accept, otherwise list changes.
   */
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({originalRecipe: originalRecipe});
    console.log({currentRecipe: currentRecipe});
    console.log({
      diff: diff(originalRecipe, currentRecipe),
      currentRecipe: currentRecipe,
      originalRecipe: originalRecipe
    });
    // 1: Create the change object:
    if (changes !== undefined) {
      const recipeChange = {
        date_changed: new Date(),
        version: currentRecipe.version + 1, // these changes represent the changes needed to get to the next version.
        changes: changes,
      };
      // 2: increment the recipe's version
      currentRecipe.version = currentRecipe.version + 1;
      // 3: add the change to the recipe change list
      currentRecipe.changes.push(recipeChange);
      // recipe.changes = [];

      if (window.confirm("Please confirm changes")) {
        axios
          .post(
            `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/update/${id}`,
            currentRecipe
          )
          .then((res) => {
            window.location.reload();
          });
      }
    }
  };

  const onChangeRecipe = (e, key) => {
    e.preventDefault();
    console.log("change recipe, value: " + e.target.value + " key: " + key);
    const newValue = {
      ...currentRecipe,
      [key]: e.target.value,
    };
    setCurrentRecipe(newValue);
    setChanges(diff(originalRecipe, newValue));
  };

  const onChangeRating = (e, val) => {
    e.preventDefault();
    const newValue = {
      ...currentRecipe,
      rating: val,
    };
    setCurrentRecipe(newValue);
    setChanges(diff(originalRecipe, newValue));
  };


  const onAddMethodEntry = (e) => {
    e.preventDefault();
    let newArray = currentRecipe.method;
    if (
      newArray.length !== 0 &&
      newArray[newArray.length - 1].description === ""
    ) {
      alert("please fill in the blank method!");
    } else {
      newArray.push({ step: 0, description: "", notes: "", time: 0 });
      setCurrentRecipe({
        ...currentRecipe,
        method: newArray,
      });
    }
    setChanges(diff(originalRecipe, currentRecipe));
  };

  const deleteIngredient = (e, ingredientId) => {
    e.preventDefault();
    setCurrentRecipe({
      ...currentRecipe,
      ingredients: currentRecipe.ingredients.slice().filter((ingredient) => {
        return ingredientId !== ingredient._id;
      }),
    });
    setChanges(diff(originalRecipe, currentRecipe));
  };

  const doCancel = () => {
    navigate("/user");
  };

  const deleteRecipe = (e) => {
    e.preventDefault();
    axios
      .delete(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/delete/${id}`,
        currentRecipe
      )
      .then((res) => {
        console.log(res.data);
        navigate("/user");
      });
  };

  const handleMethodVisibility = (e) => {
    e.preventDefault();
    setShowMethod(!showMethod);
  };

  const handleIngredientVisibility = (e) => {
    e.preventDefault();
    setShowIngredients(!showIngredients);
  };

  const revertToVersion = (e, changeHeader) => {
    e.preventDefault();
    // get the recipe version we want to display. ChangeHeader is from the version record selected in the UI.
    const targetVersion = changeHeader.version;
    // if this version is greater than current version, then we need to apply changes
    if (targetVersion > currentRecipe.version) {
      console.log("targetVersion > recipe.version");
      console.log("targetVersion: " + targetVersion);
      currentRecipe.changes
        .filter(
          (change) =>
            targetVersion >= change.version &&
            change.version > currentRecipe.version
        )
        .sort((a, b) => a.version - b.version)
        .forEach((changeSet) => {
          changeSet.changes.forEach((change) => {
            console.log("change");
            console.log(change);
            let modifiedRecipe = currentRecipe;
            applyChange(modifiedRecipe, true, change);
            // setCurrentRecipe({
            //   ...currentRecipe,
            //   name: modifiedRecipe.name,
            //   chef: modifiedRecipe.chef,
            //   description: modifiedRecipe.description,
            //   version: targetVersion,
            //   ingredients: modifiedRecipe.ingredients
            //     .slice()
            //     .filter((ingredient) => {
            //       return ingredient.amount !== 0;
            //     }),
            //   method: modifiedRecipe.method,
            //   hidden: modifiedRecipe.hidden,
            //   rating: modifiedRecipe.rating,
            // });
            setCurrentRecipe(modifiedRecipe);
          });
        });
    }
    // if this version is less than current version, then we need to apply changes
    // otherwise no chnge
    if (targetVersion < currentRecipe.version) {
      console.log("targetVersion < recipe.version");
      console.log("targetVersion: " + targetVersion);
      currentRecipe.changes
        .filter(
          (change) =>
            targetVersion < change.version &&
            change.version <= currentRecipe.version
        )
        .sort((a, b) => b.version - a.version)
        .forEach((version) => {
          version.changes.forEach((change) => {
            console.log("change");
            console.log(change);
            let modifiedRecipe = currentRecipe;
            console.log(modifiedRecipe);
            revertChange(modifiedRecipe, true, change);
            console.log(modifiedRecipe);
            setCurrentRecipe({
              ...currentRecipe,
              name: modifiedRecipe.name,
              description: modifiedRecipe.description,
              version: targetVersion,
              // remove blank lines
              ingredients: modifiedRecipe.ingredients
                .slice()
                .filter((ingredient) => {
                  return ingredient.amount !== 0 && ingredient.amount !== "g";
                }),
              method: modifiedRecipe.method,
              hidden: modifiedRecipe.hidden,
            });
          });
        });
    }
  };

  const setIngredients = (recipe, ingredients) => {
    setCurrentRecipe({
      ...recipe,
      ingredients: ingredients,
    });
  };

  return (
    <div className="contents">
      <div className="header">
        {readOnly ? null : <h3 className="edit_mode">EDIT MODE</h3>}
        <div
          className="back-button"
          onClick={() => navigate("/user")}
        >
          <img
            className="back-icon"
            src={back}
            alt="navigate back"
          ></img>
          <p style={{ padding: "10px" }}>Back to Recipes</p>
        </div>
          <h1 className="recipe-header">{currentRecipe.name}</h1>
      </div>
      <div className="grid_container">
        <div className="main_panel">
          <form className="form_group" onSubmit={onSubmit}>
            <Select options={options} onChange={(val) => console.log(val)} />
            {/* <TextField
              label="name"
              type="text"
              className="form_control"
              value={currentRecipe.name}
              onChange={(event) => onChangeRecipe(event, "name")}
              inputprops={{ readOnly: readOnly }}
            /> */}
            <TextField
              label="chef"
              type="text"
              className="form_control"
              value={currentRecipe.chef.username}
              inputprops={{ readOnly: true }}
            />
            <TextField
              label="description"
              type="text"
              className="form_control"
              value={currentRecipe.description}
              onChange={(event) => onChangeRecipe(event, "description")}
              inputprops={{ readOnly: readOnly }}
            />
            <TextField
              label="version"
              type="text"
              className="form_control"
              value={currentRecipe.version}
              onChange={(event) => onChangeRecipe(event, "version")}
              inputprops={{ readOnly: readOnly }}
            />

            <div style={{ display: "flex", marginTop: "20px" }}>
              <h4>Ingredients</h4>
              <button
                className="collapseButton"
                onClick={handleIngredientVisibility}
              >
                {showIngredients ? "COLLAPSE" : "EXPAND"}
              </button>
            </div>
            {showIngredients
              ? IngredientForm(currentRecipe, setIngredients, setCurrentRecipe, setChanges)
              : null}
            <div style={{ display: "flex", marginTop: "20px" }}>
              <h3>Method</h3>
              <Button
                style={{ marginLeft: "10px" }}
                variant="outlined"
                onClick={handleMethodVisibility}
              >
                {showMethod ? "collapse" : "expand"}
              </Button>
            </div>
            {showMethod ? MethodForm(showMethod) : null}
            <div>
              <h3>Rating</h3>
              <HeartRating
                rating={currentRecipe.rating}
                changeMethod={(e, val) => onChangeRating(e, val)}
              />
            </div>
            <div className="form_group">
              <FormControlLabel
                control={
                  <Checkbox
                    name="Archived"
                    checked={currentRecipe.hidden}
                    id="hidden"
                    className="btn btn-primary"
                    onChange={(e) => onChangeRecipe(e, "hidden")}
                  />
                }
                label="Archived"
              />
            </div>
            <h2>History</h2>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Date</th>
                  <th scope="col">Version</th>
                  <th scope="col">Changes</th>
                  <th scope="col">Selected</th>
                </tr>
              </thead>
              {currentRecipe.changes
                .slice(0)
                .reverse()
                .map((changeHeader, i) => {
                  return (
                    <tbody key={i}>
                      <tr>
                        <th scope="row">
                          <button
                            onClick={(event) =>
                              revertToVersion(event, changeHeader)
                            }
                          >
                            Select
                          </button>
                        </th>
                        <td>{changeHeader.date_changed}</td>
                        <td>{changeHeader.version}</td>
                        <td>
                          {changeHeader.changes.length}
                          {/* {changeHeader.changes.map((change, i) => {
                              return <p>{change.path}</p>;
                            })} */}
                        </td>
                        <td>
                          {currentRecipe.version === changeHeader.version
                            ? "*"
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
            <div className="button_group">
              <Button
                className="submit_button"
                type="submit"
                variant="outlined"
                color="primary"
                value="Update Recipe"
                disabled={currentRecipe === originalRecipe}
              >
                Save
              </Button>
              <Button
                className="submit_button"
                // type="submit"
                variant="outlined"
                color="primary"
                value="Cancel"
                onClick={doCancel}
              >
                Cancel
              </Button>
              <Button
                className="submit_button"
                // type="submit"
                variant="outlined"
                color="secondary"
                value="Delete Recipe"
                onClick={deleteRecipe}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
        <div className="sidebar">
          <div className="sidebar_item">
            <h2>Nutrition</h2>
            <p>Estimated nutrition:</p>
          </div>
          <div className="sidebar_item">
            <h2>Pictures</h2>
            <UploadImage
              recipeName={currentRecipe.name}
              recipeId={currentRecipe._id}
              recipeDescription={currentRecipe.description}
            />
            <Gallery currentPageId={currentRecipe._id} />
          </div>
        </div>
      </div>
    </div>
  );

  function MethodForm(showMethod) {
    const textAreaEl = useRef([]);

    // useEffect(() => {
    //   textAreaEl.current = textAreaEl.current.slice(
    //     0,
    //     currentRecipe.method.length
    //   );
    // }, []);

    const onChangeMethod = async (i, e) => {
      e.preventDefault();
      
      const newValue = e.target.value;
      const method = currentRecipe.method.map((entry, n) =>
      i === n ? { ...entry, description: newValue } : entry
    )
      const delta = diff(originalRecipe, currentRecipe);
      setCurrentRecipe({
        ...currentRecipe,
        method: method,
      });
      setChanges(delta);
    };

    return (
      <div style={{ marginTop: "5px" }}>
        {currentRecipe.method.map((method, i) => {
          return (
            <div key={i} style={{ display: "flex" }}>
              <div style={{ width: "20px", height: "20px", paddingTop: "3px" }}>
                <label style={{ margin: "auto" }} htmlFor={i + 1}>
                  {i + 1}
                </label>
              </div>
              <textarea
                minheight="50px"
                maxheight="100px"
                scrollheight="100px"
                ref={(el) => (textAreaEl.current[i] = el)}
                style={{
                  width: "100%",
                  resize: "none",
                  overflow: "hidden",
                  marginBottom: "5px",
                  height:
                    textAreaEl.current[i] !== undefined
                      ? `${textAreaEl.current[i].scrollHeight}px`
                      : "10px",
                }}
                variant="outlined"
                id={i + 1}
                type="text"
                name="description"
                value={method.description}
                onChange={(e) => onChangeMethod(i, e)}
                // onInput={auto_grow}
              />
            </div>
          );
        })}
        <button
          style={{
            visibility: readOnly,
            borderRadius: "5px",
            marginBottom: "5px",
            width: "100%",
            borderStyle: "dashed",
            borderWidth: 1,
            backgroundColor: "#FFF",
          }}
          onClick={onAddMethodEntry}
        >
          ADD
        </button>
      </div>
    );
  }

  /**
   * Re-orderable ingredients list
   */
  function IngredientForm(recipe, setIngredientsOnRecipe, setCurrentRecipe, setChanges) {
    // I believe it is necessary to store the current ingredient state on this component so we can capture the reorder state correctly.
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
      setIngredients(recipe.ingredients);
    }, [recipe.ingredients]);

    const onChangeIngredients = (e, ingredientId) => {
      const newValue = e.target.value;
      if (e.target.name === "name") {
        setCurrentRecipe({
          ...currentRecipe,
          ingredients: currentRecipe.ingredients.map((ingredient) =>
            ingredientId === ingredient._id
              ? { ...ingredient, name: newValue }
              : ingredient
          ),
        });
      } else if (e.target.name === "amount") {
        setCurrentRecipe({
          ...currentRecipe,
          ingredients: currentRecipe.ingredients.map((ingredient) =>
            ingredientId === ingredient._id
              ? { ...ingredient, amount: newValue }
              : ingredient
          ),
        });
      } else if (e.target.name === "unit") {
        setCurrentRecipe({
          ...currentRecipe,
          ingredients: currentRecipe.ingredients.map((ingredient) =>
            ingredientId === ingredient._id
              ? { ...ingredient, unit: newValue }
              : ingredient
          ),
        });
      }
      // set the diff
      setChanges(diff(originalRecipe, currentRecipe));
    };

    const onAddIngredient = (e) => {
      e.preventDefault();
      // add check to see if the last ingredient in list is blank! We don't want multiple blanks
      let newArray = currentRecipe.ingredients;
      if (newArray.length !== 0 && newArray[newArray.length - 1].name === "") {
        alert("please fill in the blank ingredient!");
      } else {
        newArray.push({ name: "", amount: 0, unit: "g" });
        setCurrentRecipe({
          ...currentRecipe,
          ingredients: newArray,
        });
      }
  
      setChanges(diff(originalRecipe, currentRecipe));
    };

    return (
      <div>
        <Reorder.Group
          style={{ paddingLeft: "0px" }}
          axis="y"
          values={ingredients}
          onReorder={(ingredients) =>
            setIngredientsOnRecipe(recipe, ingredients)
          }
        >
          {ingredients.map((ingredient, i) => (
            <Reorder.Item
              key={ingredient._id}
              className="recipe_field"
              value={ingredient}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  lineHeight: "30px",
                  color: "#bbb",
                }}
              >
                {i}
              </div>
              <input
                style={{ width: "60px" }}
                type="text"
                name="amount"
                value={ingredient.amount}
                onChange={(e) => onChangeIngredients(e, ingredient._id)}
                inputprops={{ readOnly: readOnly }}
              />
              <select
                style={{ width: "75px", marginLeft: "5px" }}
                name="unit"
                value={ingredient.unit}
                onChange={(e) => onChangeIngredients(e, ingredient._id)}
                inputprops={{ readOnly: readOnly }}
              >
                <option value="">select...</option>
                <option value="lb">lb</option>
                <option value="x">x</option>
                <option value="g">g</option>
                <option value="cup">cup</option>
                <option value="ml">ml</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
              </select>
              <input
                style={{ width: "100%", marginLeft: "5px" }}
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => onChangeIngredients(e, ingredient._id)}
                inputprops={{ readOnly: readOnly }}
              />
              {readOnly ? null : (
                <Button
                  variant="outlined"
                  onClick={(e) => deleteIngredient(e, ingredient._id)}
                  className="delete"
                >
                  X
                </Button>
              )}
              <motion.button
                className="reorder-button"
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <img
                  className="reorder"
                  src={reorder}
                  alt="reorder icon"
                  draggable="false"
                />
              </motion.button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <Button
          variant="outlined"
          onClick={onAddIngredient}
          style={{ marginBottom: "5px", width: "100%", borderStyle: "dashed" }}
        >
          Add new ingredient
        </Button>
      </div>
    );
  }
}
