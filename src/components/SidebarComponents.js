import React from "react";
import styled, { css, keyframes } from "styled-components";


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

export const TitleText = styled.img`
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

export const Logo = styled.img`
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

export const ListItem = styled.li`
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

export const SiteFooter = styled.div`
  bottom: 0px;
  width: 100%;
  padding: 5px;
  position: absolute;
  background-color: #70e8c8;
`;

export const SideBarArea = styled.div`
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

export const CollapseArrow = styled.div`
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

export const LinkListContents = styled.div`
  width: 100%;
  display: inline-block;
  visibility: ${(props) => (props.collapsed ? "hidden" : "visible")};
  animation: ${(props) => (props.collapsed ? fade : appear)} 0.3s linear;
  transition: visibility 0.3s linear;
`;

export const SideBarContainer = styled.div`
  display: flex;
  box-shadow: 3px 3px 5px #ddd;
  z-index:1000;
`;

export const PageDivider = styled.div`
  height: 100vh;
  width: 4px;
  background-color: transparent;
  &:hover {
    cursor: col-resize;
  }
`;
