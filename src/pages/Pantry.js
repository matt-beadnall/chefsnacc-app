import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CollapsibleTable from "./CollapsibleTable"
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  contents: {
    [theme.breakpoints.down("sm")]: {
      width: "85vw",
    },
    width: "80vw",
    margin: "auto",
    marginTop: "10px",
    padding: "20px",
    borderRadius: "20px",
    backgroundColor: "white",
    boxShadow: "0px 0px 14px rgb(182, 182, 182)",
    /* border: 1.5px solid var(--chefsnacc-pink); */
  },
  ingredientBox: {
    display: "flex",
    height: "40px",
    verticalAlign: "middle",
    textAlign: "center",
    backgroundColor: "#ebebeb",
    margin: "20px",
  },
  delete: {
    margin: "5px",
  },
}));

const IngredientList = ({ ingredients, setIngredients }) => {
  const classes = useStyles();
  console.log("3. ingredients");
  console.log(ingredients);

  const handleClick = (id, e) => {
    console.log(id);
    axios
      .delete(`http://${process.env.REACT_APP_HOST}:4000/chefsnacc/ingredients/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  };

  return (
    <div className={classes.contents}>
      <CreateIngredient updateIngredients={setIngredients} />
      {ingredients.map((ingredient, i) => {
        return (
          <div key={i} className={classes.ingredientBox}>
            <h3>{ingredient.name}</h3>
            <Button
              className={classes.delete}
              onClick={(e) => handleClick(ingredient._id, e)}
              variant="outlined"
              color="primary"
              label="delete"
            >
              delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const CreateIngredient = ({ updateIngredients }) => {
  const emptyIngredient = {
    name: "",
    description: "",
    quantity: 0,
    unit: "",
    date_bought: new Date(),
    date_useby: new Date(),
    variety: "",
    notes: "",
  };

  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState(0);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "name":
        setIngredient(e.target.value);
        break;
      case "amount":
        setAmount(e.target.value);
        break;
      case "unit":
        setUnit(e.target.value);
        break;
      default:
        console.log("invalid");
    }
  };

  const handleCreate = (e) => {
    let newIngredient = emptyIngredient;
    newIngredient.name = ingredient;
    newIngredient.amount = amount;
    newIngredient.unit = unit;
    console.log(newIngredient);
    axios
      .post(`http://${process.env.REACT_APP_HOST}:4000/chefsnacc/ingredients/add`, newIngredient)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
    setOpen(false);
    // updateIngredients({..., newIngredient});
    setIngredient("");
    setAmount(0);
    setUnit("");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary" variant="outlined">
        Add an Ingredient
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Ingredient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Ingredient Information
          </DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Ingredient name" onChange={handleChange} value={ingredient} type="text" fullWidth/>
          <TextField autoFocus margin="dense" id="amount" label="Amount" onChange={handleChange} value={amount} type="text" fullWidth/>
          <TextField autoFocus margin="dense" id="unit" label="Unit" onChange={handleChange} value={unit} type="text" fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function Pantry() {
  const [ingredients, setIngredients] = useState([]);
  console.log("1. ingredients");
  console.log(ingredients);
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_HOST}:4000/chefsnacc/ingredients/`)
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* <CollapsibleTable ingredients={ingredients}/> */}
      <IngredientList
        updateIngredients={setIngredients}
        ingredients={ingredients}
      ></IngredientList>
    </div>
  );
}
