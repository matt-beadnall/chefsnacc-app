import "./SideBar.css";

import { LogoGroup, StyledLink } from "../styled/CommonStyledComponents";
import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import AuthService from "../services/auth.service";
import logo from "../images/chefsnacc-logo-teal.svg";
import { red } from "@material-ui/core/colors";
import title from "../images/chefsnacc-text-teal.svg";
import { ListItem, SideBarContainer, SideBarArea, CollapseArrow, Logo, LinkListContents, TitleText, PageDivider, SiteFooter } from "./SidebarComponents";

const types = {
  main: "main",
  sub: "sub",
}

const sidebarItems = [
  {
    route: "dashboard",name: "Dashboard", type: types.main
  },
  {
    route: "user", name: "Recipes", type: types.main, sub:[{route: "all", name: "All", type: types.sub}]
  },
  {
    route: "all", name: "All", type: types.sub
  },
  {
    route: "gallery", name: "Gallery", type: types.main
  },
  {
    route: "pantry", name: "Pantry", type: types.main
  },
  {
    route: "profile", name: "Profile", type: types.main
  },
  {
    route: "friends", name: "Friends", type: types.main
  },
  {
    route: "playground", name: "Playground", type: types.main
  },
]

export default function SideBar(props) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [hoverOver, setHoverOver] = useState(false);
  const [animationsArmed, setAnimationsArmed] = useState(false);
  let location = useLocation();

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
        setSidebarWidth(Math.max(maxWidth, width));
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
    location.pathname !== "/" &&
    <SideBarContainer
      onMouseDown={(e) => e.preventDefault()}
      style={{ width: sidebarWidth }}
      ref={sidebarRef}
    >
      {console.log({ location: location })}
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
          {currentUser && sidebarItems.map((item,i) =>
             (
              <NavLink key = {i}
                className={(navData) =>
                  navData.isActive ? `selected ${item.type}` : `normal ${item.type}`
                }
                // className={item.type==="main" ? "main" : "sub"}
                to={item.route.toLowerCase()}
              >
                <ListItem>{item.name}<button onClick={() => {}}>+</button></ListItem>
                
              </NavLink>
            )
          )}
          {/* {currentUser && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "selected" : "normal"
              }
              to={"/dashboard"}
            >
              <ListItem>Dashboard</ListItem>
            </NavLink>
          )}
          {/* {currentUser && (
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
          )} */}
        </LinkListContents>
        <SiteFooter>
          <div>
            <h4 style={{ padding: "0px", margin: "5px" }}>Chefsnacc, 2022</h4>
            <p style={{ padding: "0px", margin: "5px" }}>Version 0.91</p>
          </div>
        </SiteFooter>
      </SideBarArea>
      <PageDivider onMouseDown={startResizing}></PageDivider>
      {/* <PageDivider></PageDivider> */}
    </SideBarContainer>
  );
}
