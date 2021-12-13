import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import React from "react";
import burger from "../images/burger-circle.svg";
import logo from "../images/chefsnacc-white.svg";
import styled from "styled-components";
import title from "../images/chefsnacc-text-white.svg";

const Logo = styled.img`
  height: 70px;
  padding: 5px;
  @media (max-width: 768px) {
    height: 70px;
    margin: 5px 15px 5px 0px;
  }
`;

const TitleText = styled.img`
  flex-grow: 1;
  height: 50px;
  width: auto;
  margin-left: 5px;
`;

const BurgerIcon = styled.img`
  height: 40px;
  padding: 5px;
  margin-right: 20px;
`;

const BurgerButton = styled.button`
  right: 10px;
  position: absolute;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const Nav = styled.nav`
  padding-left: 12%;
`;

const NavBarContainer = styled.div`
  margin:auto;
  width:85vw;
  display:flex;
`;

const NavItemsContainer = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const NavBar = ({ setOpenSidebar, isOpen }) => {
  return (
    <Nav className="navbar navbar-expand navbar-dark bg-dark">
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
        <BurgerButton onClick={() => setOpenSidebar(!isOpen)}>
          <BurgerIcon src={burger} alt="burger menu icon" />
        </BurgerButton>
      </NavBarContainer>
    </Nav>
  );
};
