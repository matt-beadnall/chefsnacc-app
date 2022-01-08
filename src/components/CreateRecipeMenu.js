import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateRecipeMenu() {

  const CREATE_RECIPE_BUTTON = "New Recipe";

  const history = useNavigate();
  const [name, setName] = useState("");

  const blankRecipe = {
    name: "",
    chef: JSON.parse(localStorage.getItem('user')).username,
    description: "",
    time: 0,
    ingredients: [],
    method: [],
    version: 0,
    pictures: "",
    empoji: "",
    rating: 0,
    date_added: new Date(),
    date_modified: new Date(),
    hidden: false,
  };

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = () => {
    let newRecipe = blankRecipe;
    newRecipe.name = name;
    axios
      .post(`http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/add`, newRecipe)
      .then((res) => {
        history.push("/edit/" + res.data.newRecipe._id);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant={"outlined"}
        marginbottom={"auto"}
      >
        {CREATE_RECIPE_BUTTON}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>New Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of your new recipe.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Recipe name"
            onChange={handleChange}
            value={name}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
