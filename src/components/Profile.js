import AuthService from "../services/auth.service";
import React from "react";
import plus from "../images/plus.jpg";
import styled from "styled-components";


const ProfileImage = styled.img`
  border-radius: 100%;
  width: 100px;
  height: 100px;
  border: 2px solid #70e8c8
`

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
        <div className="container">
          <header className="jumbotron">
            <ProfileImage src={plus}></ProfileImage>
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
            ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
    </div>
  );
};

export default Profile;
