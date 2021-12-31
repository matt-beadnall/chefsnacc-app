import React, { useEffect, useState } from "react";

import { ColorfulButton } from "./common.jsx";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import UserService from "../services/user.service";
import styled from "styled-components";

const Home = () => {
  const [content, setContent] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const HeaderBox = styled.div`
    margin-top: 60px;
    margin-bottom: 10%;
    width: 100%;
    height: 300px;
    display:flex;
    @media (max-width: 700px) {
      width: 100%;
    }
  `;
  const MainHeader = styled.h1`
    padding: 50px;
  `;

  const MainArtwork = styled.div`
    width: 100%;
    height: 100%;
    background: red;
  `;

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
     <NavBar setOpenSidebar={setOpenSidebar} isOpen={openSidebar} />

      <header >
        <HeaderBox>
          <MainHeader>
            The place to track, improve, and collaborate on your cooking
            sensations.
          </MainHeader>
          <MainArtwork />
        </HeaderBox>
        <h4>Be the chef. Be the snacc.</h4>
        {/* <p>Welcome to chefsnacc, the place to create, share and collaborate on your cooking projects.</p> */}
        <Link to="/register">
          <ColorfulButton>GET STARTED</ColorfulButton>
        </Link>
        <br />
        {/* <h3>{content}</h3> */}
      </header>
    </div>
  );
};

export default Home;
