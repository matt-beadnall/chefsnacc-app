import "./SideBar.css";

import { LogoGroup, StyledLink } from "../styled/CommonStyledComponents";
import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import AuthService from "../services/auth.service";
import { NavLink } from "react-router-dom";
import logo from "../images/chefsnacc-logo-teal.svg";
import { red } from "@material-ui/core/colors";
import title from "../images/chefsnacc-text-teal.svg";

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
  background-color: inherit;
  width: 100%;
  &:hover {
    font-weight: bold;
    padding-left: 20px;
    transition: padding-left 0.1s;
  }
`;

const SiteFooter = styled.div`
  bottom: 0px;
  width: 100%;
  padding: 5px;
  position: absolute;
  background-color: #70e8c8;
`;

const SideBarArea = styled.div`
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
  width: 100%;
  height: 100vh;
  position: relative;
  background: white;
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
  opacity: ${(props) => (props.hover ? 1 : 0)};
  ${(props) =>
    props.hover &&
    css`
      opacity: 1;
    `};
`;

const LinkListContents = styled.div`
  width: 100%;
  display: inline-block;
  visibility: ${(props) => (props.collapsed ? "hidden" : "visible")};
  animation: ${(props) => (props.collapsed ? fade : appear)} 0.3s linear;
  transition: visibility 0.3s linear;
`;

const SideBarContainer = styled.div`
  display: flex;
  box-shadow: 3px 3px 5px #ddd;
  margin-right: 10px;
`;

const PageDivider = styled.div`
  height: 100vh;
  width: 4px;
  background-color: transparent;
  &:hover {
    cursor: col-resize;
  }
`;

export default function SideBar(props) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [hoverOver, setHoverOver] = useState(false);
  const [animationsArmed, setAnimationsArmed] = useState(false);

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(380);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const maxWidth = 380;
        const width = mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left;
        setSidebarWidth(Math.max(maxWidth,width));
      }
    },
    [isResizing]
  );

  const arrowRight = ">>";
  const arrowLeft = "<<";

  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const hideAndShowDraw = () => {
    setAnimationsArmed(true);
    console.log(animationsArmed);
    setCollapsed(!collapsed);
  };

  return (
    <SideBarContainer
      onMouseDown={(e) => e.preventDefault()}
      style={{ width: sidebarWidth }}
      ref={sidebarRef}
    >
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
          <NavLink to="/">
            <Logo collapsed={collapsed} src={logo} alt="logo"></Logo>
          </NavLink>
          <NavLink to="/">
            <TitleText
              src={title}
              alt="title"
              collapsed={collapsed}
              animationsArmed={animationsArmed}
            ></TitleText>
          </NavLink>
        </LogoGroup>
        <LinkListContents
          collapsed={collapsed}
          animationsArmed={animationsArmed}
        >
            {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to={"/dashboard"}
            >
              <ListItem>Dashboard</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to={"/user"}
            >
              <ListItem>Recipes</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to="/gallery"
            >
              <ListItem>Gallery</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to="/pantry"
            >
              <ListItem>Pantry</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to="/profile"
            >
              <ListItem>Profile</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to="/friends"
            >
              <ListItem>Friends</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to="/calendar"
            >
              <ListItem>Calendar</ListItem>
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to="/playground"
            >
              <ListItem>Dev: Code Playground</ListItem>
            </NavLink>
          )}
        </LinkListContents>
        <SiteFooter>
          <div>
            <h4 style={{ padding: "0px", margin: "5px" }}>Chefsnacc, 2022</h4>
            <p style={{ padding: "0px", margin: "5px" }}>Version 0.91</p>
          </div>
        </SiteFooter>
      </SideBarArea>
      <PageDivider onMouseDown={startResizing}></PageDivider>
    </SideBarContainer>
  );
}
