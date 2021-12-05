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

  const ItemsList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    ${props =>
      props.column &&
      css`
        flex-direction: column;
      `}
  `;

  return (
    <ItemsList column={column}>
      <div className="navbar-nav mr-auto">
        {showModeratorBoard && (
          <li className="nav-link">
            <Link to={"/mod"} className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}
        {showAdminBoard && (
          <li className="nav-link">
            <Link to={"/admin"} className="nav-link">
              Admin Board
            </Link>
          </li>
        )}
        {currentUser && (
          <li className="nav-link">
            <Link to={"/user"} className="nav-link">
              Recipes
            </Link>
          </li>
        )}
        <li className="nav-link">
          <Link to="/gallery" className="nav-link">
            Gallery
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/pantry" className="nav-link">
            Pantry
          </Link>
        </li>
      </div>

      {currentUser ? (
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
      )}
    </ItemsList>
  );
}
