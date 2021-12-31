import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { applyChange, diff, revertChange } from "deep-diff";
import { useHistory, useParams } from "react-router-dom";

import Gallery from "./Gallery.js";
import HeartRating from "../components/HeartRating.js";
import Select from "react-select";
import UploadImage from "../components/UploadImage.js";
import axios from "axios";
import edit from "../images/Edit.svg";

const options = [
  { value: "vegan", label: "vegan" },
  { value: "gluten-free", label: "gluten-free" },
  { value: "vegetarian", label: "vegetarian" },
  { value: "omni", label: "omni" },
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

const useStyles = makeStyles((theme) => ({
  grid_container: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    /* border: 1.5px solid var(--chefsnacc-pink); */
  },
  grid_items: {},
  button_group: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-around",
    },
  },
  contents: {
    [theme.breakpoints.down("sm")]: {
      width: "85vw",
    },
    width: "80vw",
    margin: "auto",
    marginTop: "10px",
    padding: "20px",
    borderRadius: "0px",
    backgroundColor: "white",
    // boxShadow: "0px 0px 14px rgb(182, 182, 182)",
  },
  recipe_field: {
    margin: "5px 0px 5px 0px",
    display: "flex",
    // height: '40px',
  },
  form_group: {
    margin: "12px 0 12px 0px",
    display: "flex",
    flexDirection: "column",
  },
  form_control: {
    height: "100%",
  },
  edit_mode_button: {
    height: "30px",
    width: "40px",
    marginLeft: "auto",
  },
  sidebar_item: {
    // width: "100%",
    border: "solid 2px lightgrey",
    borderRadius: theme.spacing(2),
    // blockSize: "fit-content",
    // marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  // sidebar: {
  //   width: "100%",
  // },
  submit_button: {
    margin: theme.spacing(0.5),
  },
  delete: {
    marginLeft: "5px",
    color: "white",
    backgroundColor: "red",
    borderColor: "red",
    "&:hover": {
      color: "red",
      backgroundColor: "pink",
    },
  },
  edit_mode: {
    position: "absolute",
    top: "-20px",
    color: "#ffdc2e",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  header_image: {
    objectFit: "cover",
    objectPosition: "center",
    height: "200px",
    width: "100%",
  },
  header_image_box: {
    width: "1000px",
  },
}));

export default function EditRecipe() {
  const classes = useStyles();


  const INITIAL = {
    id: "",
    name: "",
    chef: "",
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
  const history = useHistory();
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
    axios
      .get(`http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/${id}`)
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
    console.log("diff");
    console.log(diff(originalRecipe, currentRecipe));
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
    // console.log(diff(originalRecipe, recipe));
    const newValue = {
      ...currentRecipe,
      [key]: e.target.value,
    };
    setCurrentRecipe(newValue);
    setChanges(diff(originalRecipe, newValue));
  };

  const onChangeIngredients = (i, e) => {
    const newValue = e.target.value;
    if (e.target.name === "name") {
      setCurrentRecipe({
        ...currentRecipe,
        ingredients: currentRecipe.ingredients.map((ingredient, n) =>
          i === n ? { ...ingredient, name: newValue } : ingredient
        ),
      });
    } else if (e.target.name === "amount") {
      setCurrentRecipe({
        ...currentRecipe,
        ingredients: currentRecipe.ingredients.map((ingredient, n) =>
          i === n ? { ...ingredient, amount: newValue } : ingredient
        ),
      });
    } else if (e.target.name === "unit") {
      setCurrentRecipe({
        ...currentRecipe,
        ingredients: currentRecipe.ingredients.map((ingredient, n) =>
          i === n ? { ...ingredient, unit: newValue } : ingredient
        ),
      });
    }
    // set the diff
    setChanges(diff(originalRecipe, currentRecipe));
  };

  const onChangeMethod = (i, e) => {
    e.preventDefault();
    const newValue = e.target.value;
    setCurrentRecipe({
      ...currentRecipe,
      method: currentRecipe.method.map((entry, n) =>
        i === n ? { ...entry, description: newValue } : entry
      ),
    });
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

  const deleteIngredient = (i, e) => {
    e.preventDefault();
    setCurrentRecipe({
      ...currentRecipe,
      ingredients: currentRecipe.ingredients.slice().filter((ingredient, n) => {
        return i !== n;
      }),
    });
    setChanges(diff(originalRecipe, currentRecipe));
  };

  const doCancel = () => {
    history.push("/user");
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
        history.push("/user");
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
            setCurrentRecipe({
              ...currentRecipe,
              name: modifiedRecipe.name,
              chef: modifiedRecipe.chef,
              description: modifiedRecipe.description,
              version: targetVersion,
              ingredients: modifiedRecipe.ingredients.slice().filter((ingredient) => {
                return ingredient.amount !== 0;
              }),
              method: modifiedRecipe.method,
              hidden: modifiedRecipe.hidden,
              rating: modifiedRecipe.rating,
            });
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
              chef: modifiedRecipe.chef,
              description: modifiedRecipe.description,
              version: targetVersion,
              // remove blank lines
              ingredients: modifiedRecipe.ingredients.slice().filter((ingredient) => {
                return ingredient.amount !== 0 && ingredient.amount !== 'g';
              }),
              method: modifiedRecipe.method,
              hidden: modifiedRecipe.hidden,
            });
          });
        });
    }

  };

  return (
    <>
      <div className={classes.contents}>
        <div className={classes.header}>
          <div style={{ position: "relative" }}>
            {readOnly ? null : <h3 className={classes.edit_mode}>EDIT MODE</h3>}
            {/* <Paper className={classes.header_image_box}>
            <img className={classes.header_image} src={hummus} />
          </Paper> */}
            <h1>{currentRecipe.name}</h1>
            <Select options={options} />
          </div>
          <div>
            <Button
              className={(classes.edit_mode_button, classes.sidebar_item)}
              variant="outlined"
              color="primary"
              value="Cancel"
              onClick={changeEditMode}
            >
              <img className={classes.edit} src={edit} alt="edit icon" />
            </Button>
          </div>
        </div>
        <div className={classes.grid_container}>
          <div className={classes.grid_items}>
            <form className={classes.form_group} onSubmit={onSubmit}>
              <TextField
                label="name"
                type="text"
                className={classes.form_control}
                value={currentRecipe.name}
                onChange={(event) => onChangeRecipe(event, "name")}
                inputprops={{ readOnly: readOnly }}
              />
              <TextField
                label="chef"
                type="text"
                className={classes.form_control}
                value={currentRecipe.chef}
                onChange={(event) => onChangeRecipe(event, "chef")}
                inputprops={{ readOnly: readOnly }}
              />
              <TextField
                label="description"
                type="text"
                className={classes.form_control}
                value={currentRecipe.description}
                onChange={(event) => onChangeRecipe(event, "description")}
                inputprops={{ readOnly: readOnly }}
              />
              <TextField
                label="version"
                type="text"
                className={classes.form_control}
                value={currentRecipe.version}
                onChange={(event) => onChangeRecipe(event, "version")}
                inputprops={{ readOnly: readOnly }}
              />

              <div style={{ display: "flex", marginTop: "20px" }}>
                <h3>Ingredients</h3>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="outlined"
                  onClick={handleIngredientVisibility}
                >
                  {showIngredients ? "collapse" : "expand"}
                </Button>
              </div>
              {showIngredients ? IngredientForm() : null}
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
              {/* <MethodForm syle={{display: showMethod ? "block" : "none"}} */}
              {showMethod ? MethodForm() : null}
              <div>
                <h3>Rating</h3>
                <HeartRating
                  rating={currentRecipe.rating}
                  onChange={onChangeRecipe}
                />
              </div>
              <div className={classes.form_group}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Archived"
                      checked={currentRecipe.hidden}
                      id="hidden"
                      className="btn btn-primary"
                      onChange={(event) => onChangeRecipe(event, "hidden")}
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
              <div className={classes.button_group}>
                <Button
                  className={classes.submit_button}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  value="Update Recipe"
                  disabled={changes === undefined ? true : false}
                >
                  Save
                </Button>
                <Button
                  className={classes.submit_button}
                  // type="submit"
                  variant="outlined"
                  color="primary"
                  value="Cancel"
                  onClick={doCancel}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.submit_button}
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
          <div className={classes.grid_items}>
            <div className={classes.sidebar_item}>
              <h2>Nutrition</h2>
              <p>Estimated nutrition:</p>
            </div>
            <div className={classes.sidebar_item}>
              <h2>Pictures</h2>
              <UploadImage
                recipeName={currentRecipe.name}
                recipeId={currentRecipe.id}
                recipeDescription={currentRecipe.description}
              />
              <Gallery currentPageId={currentRecipe.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function MethodForm() {
    const textAreaEl = useRef([]);

    useEffect(() => {
      textAreaEl.current = textAreaEl.current.slice(
        0,
        currentRecipe.method.length
      );
    }, []);
    // }, [currentRecipe.method]);

    // const auto_grow = (e) => {
    //   textAreaEl.current.height = "5px";
    //   textAreaEl.current.height = textAreaEl.current.scrollHeight + "px";
    //   console.log(textAreaEl.current[0].height);
    // };

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
   * TODO: Add ingredients sections.
   * @returns
   */
  function IngredientForm() {
    return (
      <div>
        {currentRecipe.ingredients.map((ingredient, i) => {
          return (
            <div className={classes.recipe_field} key={i}>
              <input
                style={{ width: "75px" }}
                type="text"
                name="amount"
                value={ingredient.amount}
                onChange={(e) => onChangeIngredients(i, e)}
                inputprops={{ readOnly: readOnly }}
              />
              {/* <Select
                onChange={(e) => onChangeIngredients(i, e)}
                options={measures}
                style={{ width: "75px", marginLeft: "5px" }}
                inputprops={{ readOnly: readOnly }}
                value={ingredient.unit}
                name="unit"
                inputprops={{ readOnly: readOnly }}
              /> */}
              <select
                style={{ width: "75px", marginLeft: "5px" }}
                name="unit"
                value={ingredient.unit}
                onChange={(e) => onChangeIngredients(i, e)}
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
                onChange={(e) => onChangeIngredients(i, e)}
                inputprops={{ readOnly: readOnly }}
              />
              {readOnly ? null : (
                <Button
                  variant="outlined"
                  onClick={(e) => deleteIngredient(i, e)}
                  className={classes.delete}
                >
                  X
                </Button>
              )}
            </div>
          );
        })}
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
