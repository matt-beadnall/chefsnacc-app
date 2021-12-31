import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

export const Logo = styled.img`
  width: 60px;
  margin: 5px;
  @media (max-width: 700px) {
    height: 70px;
    margin: 5px 15px 5px 0px;
  }
`;

export const LogoGroup = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  overflow: visible;
  z-index: 200;

`;

export const TitleText = styled.img`
  /* flex-grow: 1; */
  height: 50px;
  width: auto;
  margin-left: 5px;
  @media (max-width: 700px) {
    margin-left: 0px;
  }
`;

export const GridContent = styled.div`
  margin: 10px 10px 10px 20px;
  height: 100%;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  color: #444444;
  text-decoration: none;
`;

export const ListItem = styled.li`
  list-style-type: none;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const ItemsList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  align-items: center;
  text-decoration: none;
  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}
`;
