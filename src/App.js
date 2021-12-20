import "./App.css";
import "./App.css";

import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import BoardAdmin from "./components/BoardAdmin";
// import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import DisplayImage from "./pages/DisplayImage";
import EditRecipe from "./pages/EditRecipe";
import Home from "./components/Home";
import LetsCook from "./pages/LetsCook";
import Login from "./components/Login";
import { NavBar } from "./components/NavBar";
import Pantry from "./pages/Pantry";
import Profile from "./components/Profile";
import RecipeList from "./pages/RecipeList/RecipeList";
import Register from "./components/Register";
import SideBar from "./components/SideBar";
import styled from "styled-components";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#f466d6",
      main: "#aaaaaaa",
      dark: "#aaaaaa",
    },
    secondary: {
      main: "#20cdd6",
    },
  },
});

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const AppContainer = styled.div`
    background: #fcfcfc;
`

  const Content = styled.main`
    width:80vw;
    margin:auto;
    @media (max-width: 700px) {
      width:95vw;
  }
  `

  return (
    // <HostContext.Provider value="192.168.1.161">
    <AppContainer id="App">
      <ThemeProvider theme={theme}>
        <SideBar
          onOpen={() => setOpenSidebar(!openSidebar)}
          onClose={() => setOpenSidebar(!openSidebar)}
          isOpen={openSidebar}
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
        />
        <main id="page-wrap">
          <NavBar setOpenSidebar={setOpenSidebar} isOpen={openSidebar} />
          <Content>
            <Switch>
              <Route exact path={["/"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              {/* <Route path="/user" component={BoardUser} /> */}
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/user" exact component={RecipeList} />
              <Route path="/edit/:id" component={EditRecipe} />
              <Route path="/pantry" component={Pantry} />
              <Route path="/gallery" component={DisplayImage} />
              <Route path="/letscook/:id" component={LetsCook} />
            </Switch>
            {/* </BrowserRouter> */}
          </Content>
        </main>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
