import React, { useEffect, useState } from "react";

import { ColorfulButton } from "./common.jsx";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import styled from "styled-components";

const Home = () => {
  const [content, setContent] = useState("");

  const HeaderBox = styled.div`
    margin-top:10%;
    margin-bottom:10%;
    width: 40%;
    @media (max-width: 700px) {
      width: 100%;
  }
  `

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
      <header className="jumbotron">
      <HeaderBox>
      <h1>The place to track, improve, and collaborate on your cooking sensations.</h1>
      </HeaderBox>
        <h4>Be the chef. Be the snacc.</h4>
        {/* <p>Welcome to chefsnacc, the place to create, share and collaborate on your cooking projects.</p> */}
        <Link to="/register"><ColorfulButton>GET STARTED</ColorfulButton></Link>
        <br/>
        {/* <h3>{content}</h3> */}
      </header>
    </div>
  );
};

export default Home;
