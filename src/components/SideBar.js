import { LogoGroup, StyledLink } from "../styled/CommonStyledComponents";
import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import logo from "../images/chefsnacc-logo-teal.svg";
import title from "../images/chefsnacc-text-teal.svg";

export default function SideBar(props) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [hoverOver, setHoverOver] = useState(false);
  const [animationsArmed, setAnimationsArmed] = useState(false);

  const arrowRight = ">>";
  const arrowLeft = "<<";

  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const hide = keyframes`
    0% {width: 300px;}
    100% {width: 50px;}
`;

  const show = keyframes`
    0% {width: 50px;}
    100% {width: 300px;}
`;

  const fade = keyframes`
    0% {opacity: 1;}
    100% {opacity: 0;}
`;

  const appear = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`;

  const TitleText = styled.img`
    display: inline-block;
    visibility: ${(props) => (props.collapsed ? "hidden" : "visible")};
    animation: ${(props) => (props.collapsed ? fade : appear)} 0.3s linear;
    transition: visibility 0.3s linear;
    height: 50px;
    width: auto;
    margin-left: 5px;
    @media (max-width: 700px) {
      margin-left: 0px;
    }
  `;

  const Logo = styled.img`
    animation-fill-mode: both;
    width: 40px;
    width: ${(props) => (props.collapsed ? "40px" : "60px")};
    /* transition: width 0.5s linear; */
    margin: 5px;
    @media (max-width: 700px) {
      height: 70px;
      margin: 5px 15px 5px 0px;
    }
  `;

  const ListItem = styled.li`
    list-style-type: none;
    padding: 12px 0px 12px 16px;
    &:hover {
      background: #d1d1d1;
      padding-left: 20px;
      transition: padding-left 0.1s;
    }
  `;

  const SiteFooter = styled.div`
    bottom: 0px;
    width: 100%;
    padding: 5px;
    position: absolute;
    background-color: #00b498;
  `;

  const SideBarArea = styled.div`
    /* overflow:hidden; */
    ${(props) => {
      if (props.animationsArmed) {
        return props.collapsed
          ? css`
              animation: ${hide} 0.2s 0s linear 1 forwards;
            `
          : css`
              animation: ${show} 0.2s 0s linear 1 forwards;
            `;
      }
    }};
    height: 100vh;
    position: relative;
    background: #e1e1e1;
  `;

  const CollapseArrow = styled.div`
    color: grey;
    border-radius: 7px;
    padding: 4px;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 55px;
    right: -14px;
    font-size: 1.2em;
    /* background: #e1e1e1; */
    background: #e1e1e1;
    z-index: 100;
    cursor: pointer;
    opacity: 1;
    &:hover {
      font-weight: bold;
    }
    /* opacity: ${(props) => (props.hover ? 1 : 0)}; */
    ${(props) =>
      props.hover &&
      css`
        opacity: 1;
      `};
  `;

  const Contents = styled.div`
    display: inline-block;
    visibility: ${(props) => (props.collapsed ? "hidden" : "visible")};
    animation: ${(props) => (props.collapsed ? fade : appear)} 0.3s linear;
    transition: visibility 0.3s linear;
  `;

  const hideAndShowDraw = () => {
    setAnimationsArmed(true);
    console.log(animationsArmed);
    setCollapsed(!collapsed);
  };

  return (
    <SideBarArea
      collapsed={collapsed}
      animationsArmed={animationsArmed}
      // onMouseOver={() => setHoverOver(true)}
      // onMouseOut={() => setHoverOver(false)}
    >
      <CollapseArrow onClick={hideAndShowDraw} hover={hoverOver}>
        {collapsed ? arrowRight : arrowLeft}
      </CollapseArrow>
      <LogoGroup>
        <Link to="/">
          <Logo collapsed={collapsed} src={logo} alt="logo"></Logo>
        </Link>
        <Link to="/">
          <TitleText
            src={title}
            alt="title"
            collapsed={collapsed}
            animationsArmed={animationsArmed}
          ></TitleText>
        </Link>
      </LogoGroup>
      <Contents collapsed={collapsed} animationsArmed={animationsArmed}>
        {currentUser && (
          <StyledLink to={"/user"}>
            <ListItem>Recipes</ListItem>
          </StyledLink>
        )}
        {currentUser && (
          <StyledLink to="/gallery">
            <ListItem>Gallery</ListItem>
          </StyledLink>
        )}
        {currentUser && (
          <StyledLink to="/pantry">
            <ListItem>Pantry</ListItem>
          </StyledLink>
        )}
        {currentUser && (
          <StyledLink to="/profile">
            <ListItem>Profile</ListItem>
          </StyledLink>
        )}
        {currentUser && (
          <StyledLink to="/friends">
            <ListItem>Friends</ListItem>
          </StyledLink>
        )}
        {currentUser && (
          <StyledLink to="/calendar">
            <ListItem>Calendar</ListItem>
          </StyledLink>
        )}
        {currentUser && (
          <StyledLink to="/playground">
            <ListItem>Dev: Code Playground</ListItem>
          </StyledLink>
        )}
        <SiteFooter>
          <div>
            <h4 style={{ padding: "0px", margin: "5px" }}>Chefsnacc, 2021</h4>
            <p style={{ padding: "0px", margin: "5px" }}>Version 0.91</p>
          </div>
        </SiteFooter>
      </Contents>
    </SideBarArea>
  );
}
