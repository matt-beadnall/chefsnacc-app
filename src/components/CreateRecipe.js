import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

export default function CreateRecipe() {

  const CREATE_RECIPE_BUTTON = "New Recipe +";

  const history = useHistory();
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
      .post(`http://${process.env.REACT_APP_HOST}:4000/chefsnacc/recipes/add`, newRecipe)
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
