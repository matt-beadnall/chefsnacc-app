import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

// import CollapsibleTable from "./CollapsibleTable"
import axios from "axios";
import { formatDate } from "../functions/dateFunctions";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  contents: {
    [theme.breakpoints.down("sm")]: {
      width: "85vw",
    },
    width: "80vw",
    margin: "auto",
    // marginTop: "10px",
    // padding: "20px",
    // borderRadius: "20px",
    // backgroundColor: "white",
    // boxShadow: "0px 0px 14px rgb(182, 182, 182)",
    /* border: 1.5px solid var(--chefsnacc-pink); */
  },
  ingredientBox: {
    display: "flex",
    height: "40px",
    alignItems: "center",
    textAlign: "center",
    margin: "20px",
  },
  delete: {
    margin: "5px",
  },
}));

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [visible, setVisible] = useState(null);

  console.log(ingredients);
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/`
      )
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const classes = useStyles();

  const handleClick = (id, e) => {
    console.log(id);
    axios
      .delete(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/delete/${id}`
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  };

  const setHistoryVisibilty = (i) => {
    if (i === visible) {
      setVisible(null);
    } else {
      setVisible(i);
    }
  };

  const HistoryRow = styled.td`
    col-span: 4;
  `;

  return (
    <div className={classes.contents}>
      <CreateIngredient
        setIngredients={setIngredients}
        ingredients={ingredients}
      />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Ingredient</th>
            <th>Total Quanity</th>
            <th>Unit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, i) => {
            return (
              <>
                <tr key={i}>
                  <td>
                    <button onClick={() => setHistoryVisibilty(i)}>show</button>
                  </td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.history[0].quantity}</td>
                  <td>{ingredient.history[0].unit}</td>
                  <td>
                    <Button
                      className={classes.delete}
                      onClick={(e) => handleClick(ingredient._id, e)}
                      variant="outlined"
                      color="primary"
                      label="delete"
                    >
                      delete
                    </Button>
                  </td>
                  <td></td>
                </tr>

                {visible === i && (
                  <tr>
                    <td colSpan="4">
                      <p>History</p>
                      <table>
                        <tr>
                          <th>Date Bought</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Date Use-by</th>
                        </tr>
                        <tr>
                          <td>
                            {formatDate(ingredient.history[0].date_bought)}
                          </td>
                          <td>{ingredient.history[0].quantity}</td>
                          <td>{ingredient.history[0].unit}</td>
                          <td>
                            {formatDate(ingredient.history[0].date_useby)}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CreateIngredient = ({ setIngredients, ingredients }) => {
  const CicleButton = styled.button`
    display: block;
    border-radius: 50%;
    font-size: 25pt;
    width: 50px;
    height: 50px;
    margin-left: 20px;
    cursor: pointer;
    /* border: solid 1px #444444 */

    border-style: none;
  `;

  const emptyIngredient = {
    name: "",
    description: "",
    category: "",
    nutrition: {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    history: [
      {
        date_added: new Date(),
        date_bought: new Date(),
        date_useby: new Date(),
        sub_variety: "String",
        quantity: 0,
        unit: "g",
        price: 0,
      },
    ],
    variety: "",
    allergies: [],
    notes: "",
  };

  const [ingredient, setIngredient] = useState(emptyIngredient);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    var ingredientKey;
    var valueToSet;
    switch (e.target.id) {
      case "quantity":
      case "unit":
        valueToSet = {
          ...ingredient.history,
          [e.target.id]: e.target.value,
        };
        ingredientKey = "history";
        break;
      default:
        ingredientKey = e.target.id;
        valueToSet = e.target.value;
    }
    console.log(ingredientKey);
    console.log(valueToSet);
    setIngredient({
      ...ingredient,
      [ingredientKey]: valueToSet,
    });
  };

  const handleCreate = (e) => {
    console.log(ingredient);
    axios
      .post(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/add`,
        ingredient
      )
      .then((res) => {
        // console.log(res.data);
        console.log(ingredients.concat(ingredient));
        setIngredients(ingredients.concat(ingredient));
        // window.location.reload();
      });
    setOpen(false);
    // updateIngredients({..., newIngredient});
  };

  const cancelButton = () => {
    setOpen(false);
    setIngredient(emptyIngredient);
  };

  return (
    <>
      <CicleButton onClick={() => setOpen(true)}>+</CicleButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Ingredient</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Ingredient Information</DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Ingredient name"
            onChange={handleChange}
            value={ingredient.name}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            id="quantity"
            label="Amount"
            onChange={handleChange}
            value={ingredient.quantity}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            id="unit"
            label="Unit"
            onChange={handleChange}
            value={ingredient.unit}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            id="date_bought"
            label="Date bought"
            onChange={handleChange}
            value={formatDate(ingredient.date_bought)}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIngredient(emptyIngredient)}
            color="primary"
          >
            Clear
          </Button>
          <Button onClick={cancelButton} color="primary">
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
  return (
    <div>
        <IngredientList />
    </div>
  );
}
