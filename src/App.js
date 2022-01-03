import "./App.css";
import "./App.css";

import { Route, Routes, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import About from "./pages/About";
import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import Calendar from "./pages/Calendar";
import CodePlayground from "./pages/CodePlayground";
import Contact from "./pages/Contact";
import EditRecipe from "./pages/EditRecipe/index";
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

const theme = createTheme({
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

  const PageContent = styled.div`
    overflow: scroll; 
    height:100vh;
    width:100%;
    /* margin: 10px 10px 0px 20px; */
  `

  return (
    // <HostContext.Provider value="192.168.1.161">
    <AppContainer>
      <ThemeProvider theme={theme}>
        <main>
          <SiteContent>
            <SideBar />
            <PageContent>
              <Routes>
                <Route exact path={"/"} element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/profile" element={<Profile />} />
                {/* <Route path="/user" element={BoardUser} /> */}
                <Route path="/mod" element={<BoardModerator />} />
                <Route path="/admin" element={<BoardAdmin />} />
                <Route path="/user" exact element={<RecipeList />} />
                <Route path="/edit/:id" element={<EditRecipe />} />
                <Route path="/pantry" element={<Pantry />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/playground" element={<CodePlayground />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/letscook/:id" element={<LetsCook />} />
              </Routes>
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
