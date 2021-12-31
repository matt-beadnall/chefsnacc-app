import "./App.css";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import About from "./pages/About";
import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import Calendar from "./pages/Calendar";
import CodePlayground from "./pages/CodePlayground";
import Contact from "./pages/Contact";
import EditRecipe from "./pages/EditRecipe";
import Friends from "./pages/Friends";
import Gallery from "./pages/Gallery";
import Home from "./components/Home";
import LetsCook from "./pages/LetsCook";
import Login from "./components/Login";
import Pantry from "./pages/Pantry";
import Profile from "./components/Profile";
import React from "react";
import RecipeList from "./pages/Recipes";
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
  const AppContainer = styled.div`
    /* background: #fcfcfc; */
  `;

  const SiteContent = styled.main`
    width: 100vw;
    display: flex;
    margin: auto;
    @media (max-width: 700px) {
      width: 95vw;
    }
  `;

  const PageContent = styled.section`
    /* margin: 10px 10px 0px 20px; */
  `

  return (
    // <HostContext.Provider value="192.168.1.161">
    <AppContainer>
      <ThemeProvider theme={theme}>
        <main>
          <SiteContent>
            <SideBar />
            {/* <GridContent> */}
            <PageContent>
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
                <Route path="/friends" component={Friends} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/playground" component={CodePlayground} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/letscook/:id" component={LetsCook} />
              </Switch>
            </PageContent>
            {/* </GridContent> */}
            {/* </BrowserRouter> */}
          </SiteContent>
        </main>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
