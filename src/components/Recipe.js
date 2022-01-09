import "./Recipe.css"

import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import HeartRating from "./HeartRating.js";
import SelectedRecipeInfo from "./SelectedRecipeInfo.js";
import axios from "axios";
import { formatDate } from "../functions/dateFunctions";
import getSuitability from "../functions/getSuitability";
// import { grey } from "@material-ui/core/colors";
import logoGrey from "../images/chefsnacc-grey.svg";
// import { motion } from "framer-motion/dist/framer-motion";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  floating: {
    background: "red",
    position: "fixed",
    top: "20px",
    zIndex: 1000,
  },
  recipe_button: {
    textDecoration: "none",
    margin: theme.spacing(0.5),
  },
  button_group: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-around",
    },
  },
  options: {},
  p: {
    color: "#c2c2c2",
  },
}));

const RecipeHeader = styled.div`
  display: "flex";
  justify-content: "space-between";
  overflow: hidden;
`;

const RecipeTitleBox = styled.div``;

const RecipeTitle = styled.h3`
  font-size: 2ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
`;
const RecipeInfo = styled.h2`
  font-size: 12pt;
  margin: 0;
  margin-bottom: 7px;
  padding: 0;
`;

const TextContainer = styled.div`
  padding: 15px;
`;
const RecipeImage = styled.img`
  width: 100%;
  animation: fadeInAnimation ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Logo = styled.img`
  width: 80%;
  /* display: none; */
`;

const RecipeImageBox = ({ className, pictures }) => {
  return (
    <div className={className}>
      {pictures[0] === undefined ? (
        <Logo src={logoGrey} alt="recipe image"></Logo>
      ) : (
        <RecipeImage src={pictures[0]} alt="recipe image"></RecipeImage>
      )}
    </div>
  );
};

const RecipeImageBoxStyled = styled(RecipeImageBox)`
  width: 100%;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0px 0px;
`;



export default function Recipe(props) {
  // eslint-disable-next-line
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const [pictures, setPictures] = useState([]);
  const [pantryIngredients, setPantryIngredients] = useState([]);

  useEffect(() => {
    console.log(props.recipe._id);
    setSelected(props.recipe._id === props.currentlySelected ? true : false);
    const pantry = props.ingredients.map((ingredient) => {
      return ingredient.name;
    });
    setPantryIngredients(pantry);
    getPictures();
    // eslint-disable-next-line
  }, []);

  const getPictures = () => {
    // setPictures([]);
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/gallery/recipes/recipe/${props.recipe._id}`
      )
      .then((res) => {
        res.data
          .filter((picture) => picture.recipeId === props.recipe._id)
          .forEach((picture) => {
            var imageBase64 = `data:${
              picture.img.contentType
            };base64,${Buffer.from(picture.img.data.data).toString("base64")}`;
            setPictures(pictures.concat(imageBase64));
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // can expand this in future to return more photos
    // console.log(pictureArray);
  };

  return (
    <div 
      className="recipe-container"
    >
      <RecipeImageBoxStyled pictures={pictures}></RecipeImageBoxStyled>
      <TextContainer>
        <RecipeHeader>
          <RecipeTitleBox>
            <RecipeTitle>
              {props.recipe.name}
              {/* <span style={{ color: "rgb(180,180,180)" }}>
              {" "}
              v.{props.recipe.version}
            </span> */}
            </RecipeTitle>
          </RecipeTitleBox>
        </RecipeHeader>
        <HeartRating rating={props.recipe.rating} />
        <RecipeInfo>
          Suitability: {getSuitability(props.recipe, pantryIngredients)}
        </RecipeInfo>
        <RecipeInfo>Chef: {props.recipe.chef.username}</RecipeInfo>
        <RecipeInfo>Created: {formatDate(props.recipe.date_added)}</RecipeInfo>
        <div className={classes.button_group}>
          {selected ? (
            <SelectedRecipeInfo
              ingredients={props.ingredients}
              selected={props.recipe} //{props.recipe.find((x) => x._id === props.currentlySelected)
            />
          ) : null}
        </div>
      </TextContainer>
    </div>
    // </Link>
  );
}
