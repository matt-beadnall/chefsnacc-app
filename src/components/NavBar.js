import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import React from "react";
import logo from "../images/chefsnacc-dark-grey.svg";
import styled from "styled-components";
import title from "../images/chefsnacc-text-grey.svg";

const Logo = styled.img`
  width: 70px;
  @media (max-width: 700px) {
    height: 70px;
    margin: 5px 15px 5px 0px;
  }
`;

const TitleText = styled.img`
  flex-grow: 1;
  height: 50px;
  width: auto;
  margin-left: 10px;
    @media (max-width: 700px) {
      margin-left: 0px;
  }
`;

const Nav = styled.nav`
`;

const NavBarContainer = styled.div`
  margin:auto;
  width:80vw;
  padding: 8px;
  display:flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 700px) {
      width:100vw;

  }
`;

const NavItemsContainer = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const NavBar = ({ setOpenSidebar, isOpen }) => {
  return (
    <Nav>
      <NavBarContainer>
        <Link to="/">
          <Logo src={logo} alt="logo"></Logo>
        </Link>
        <Link to="/">
          <TitleText src={title} alt="title"></TitleText>
        </Link>
        <NavItemsContainer>
          <NavItems />
        </NavItemsContainer>
        {/* <BurgerButton onClick={() => setOpenSidebar(!isOpen)}>
          <BurgerIcon src={burger} alt="burger menu icon" />
        </BurgerButton> */}
      </NavBarContainer>
    </Nav>
  );
};
