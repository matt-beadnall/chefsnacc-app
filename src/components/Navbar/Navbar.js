import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/chefsnacc-white.svg";
import title from "../../images/chefsnacc-text.svg";
// import recipes from "../../images/recipes-text.svg";
// import pantry from "../../images/pantry-text.svg";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
// import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: "white",
    color: "white",
  },
  toolbar: {
    [theme.breakpoints.up("md")]: {
      width: "80vw",
      margin: "auto",
    },
    [theme.breakpoints.down("md")]: {
      width: "100vw",
      margin: "auto",
    },
  },
  menuButton: {
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(2),
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    height: "50px",
    width: "auto",
    marginLeft: theme.spacing(1),
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },
  searchIcon: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  navigation: {
    marginLeft: "auto",
    width: "30vw",
    padding: "0px",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center",
    listStyle: "none",
    zIndex: "1000",
    /* width: 100vw; */
  },
  nav_item: {
    width: "auto",
    color: "#bfbfbf",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      display: "none",
      color: "red",
    },
  },
  logo: {
    [theme.breakpoints.up("md")]: {
      height: "70px",
      padding: "5px",
    },
    [theme.breakpoints.down("md")]: {
      height: "70px",
      margin: "5px 15px 5px 0px",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <>
      <nav className={classes.root}>
        <AppBar color="inherit" styles={classes.appbar}>
          <Toolbar color="secondary" className={classes.toolbar}>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="logo"></img>
            </Link>
            <Link to="/">
              <img className={classes.title} src={title} alt="title"></img>
            </Link>
            <div className="navbar-nav mr-auto">
              {/* <ul className={classes.navigation}> */}
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link className={classes.nav_item} to="/">
                  {/* <img className="nav-item" src={recipes} alt="recipes"></img> */}
                  <h1>Recipes</h1>
                </Link>
              </li>
              <li>
                <Link className={classes.nav_item} to="/gallery">
                  <h1>Gallery</h1>
                </Link>
              </li>
              <li>
                <Link className={classes.nav_item} to="/pantry">
                  <h1>Pantry</h1>
                </Link>
              </li>
              <li>
                <Link className={classes.nav_item} to="/login">
                  <h1>Login</h1>
                </Link>
              </li>
              {/* </ul> */}
            </div>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </nav>
      <div style={{ height: "90px" }}></div>
    </>
  );
}
