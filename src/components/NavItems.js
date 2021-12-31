import { ItemsList, ListItem, StyledLink } from "../styled/CommonStyledComponents"
import React, { useEffect, useState } from "react";

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
        {currentUser &&(
        <li>
          <StyledLink to="/about" >
            About
          </StyledLink>
        </li>)}
        {currentUser &&(
        <li>
          <StyledLink to="/contact" >
            Contact
          </StyledLink>
        </li>)}

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
            Profile
              {/* {currentUser.username} */}
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
