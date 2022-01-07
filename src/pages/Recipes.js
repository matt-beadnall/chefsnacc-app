import "./Recipes.css";

import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import AsyncSelect from 'react-select/async';
// import CircularProgress from "@material-ui/core/CircularProgress";
import CreateRecipeMenu from "../components/CreateRecipeMenu";
import RecipeDisplay from "../components/RecipeDisplay";
import Select from 'react-select';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
    color: "#59eae5",
  },
}));

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


export default function Recipes() {
  const [showArchived, setShowAll] = useState(false);
  const [sortingMethod, setSortingMethod] = useState({ value: 'ALPHA', label: 'Alphabetical' });
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

  const sortingCategories= [
    { value: 'ALPHA', label: 'Alphabetical' },
    { value: 'DATE', label: 'Date' },
    { value: 'SUIT', label: 'Suitability' }
  ]

  const setSorting = (method) => {
    setSortingMethod(method);
    // console.log(method.value);
  }

  return (
    <div>
      <RecipesHeader>
        <ControlsGroup>
        <AsyncSelect></AsyncSelect>
        <Select></Select>
        <div>categories</div>

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
          <div>Sorting: <Select options={sortingCategories} defaultValue={sortingMethod} onChange={method => setSorting(method)} /></div>
        </ControlsGroup>
        {/* <DescriptionLine>{buttonDesc}</DescriptionLine> */}
      </RecipesHeader>
      <RecipeDisplay displayArchived={false} sortingMethod={sortingMethod.value}/>
      <Button
        onClick={() => toggleDisplayAll()}
        variant="outlined"
        color="primary"
      >
        {showArchived ? "Hide Archived" : "Show Archived"}
      </Button>
      <div className={classes.container}>
        {showArchived && (
          <RecipeDisplay displayArchived={true} sortingMethod={sortingMethod.value} />
        )}
      </div>
    </div>
  );
}
