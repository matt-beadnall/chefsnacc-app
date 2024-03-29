import "./Recipes.css";

import { Button, makeStyles, TextField } from "@material-ui/core";
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
  margin: 10px;
  padding: 10px;
  border: 3px solid #70E8C8;
  border-radius: 8px;
`;


export default function Recipes() {
  const [showArchived, setShowAll] = useState(false);
  const [sortingMethod, setSortingMethod] = useState({ value: 'ALPHA', label: 'Alphabetical' });
  const classes = useStyles();
  const [buttonDesc, setButtonDesc] = useState("null");
  const [filter, setFilter] = useState("");

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

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width: width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const setFilterName = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  }

  return (
    <div>
      <RecipesHeader>
        <ControlsGroup>
        <AsyncSelect styles={customStyles}></AsyncSelect>
        {/* <Select styles={{color: "aqua"}}></Select> */}
        <TextField
              label="Filter Recipe..."
              type="text"
              className="form_control"
              value={filter}
              onChange={(event) => setFilterName(event)}
              inputprops={{ readOnly: true }}
            />
        <div>categories</div>

          <CreateRecipeMenu />
          {/* <button
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
          </button> */}
          <div>Sorting: <Select options={sortingCategories} defaultValue={sortingMethod} onChange={method => setSorting(method)} /></div>
        </ControlsGroup>
        {/* <DescriptionLine>{buttonDesc}</DescriptionLine> */}
      </RecipesHeader>
      <RecipeDisplay filter={filter} displayArchived={false} sortingMethod={sortingMethod.value}/>
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
