import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

export default function NavItems({column}) {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const ItemsList = styled.ul`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    align-items: center;
    text-decoration: none;
    ${props =>
      props.column &&
      css`
        flex-direction: column;
      `}
  `;

const ListItem = styled.li`
`

const StyledLink = styled(Link)`
  color: #444444;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;


  return (
    <ItemsList column={column}>
        {showModeratorBoard && (
          <ListItem>
            <StyledLink to={"/mod"} >
              Moderator Board
            </StyledLink>
          </ListItem>
        )}
        {showAdminBoard && (
          <ListItem>
            <StyledLink to={"/admin"} >
              Admin Board
            </StyledLink>
          </ListItem>
        )}
        {currentUser && (
          <ListItem >
            <StyledLink to={"/user"} >
              Recipes
            </StyledLink>
          </ListItem>
        )}
        {currentUser &&(
        <ListItem>
          <StyledLink to="/gallery">
            Gallery
          </StyledLink>
        </ListItem>)}
        {currentUser &&(
        <li>
          <StyledLink to="/pantry" >
            Pantry
          </StyledLink>
        </li>)}

      {/* {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )} */}
    </ItemsList>
  );
}
