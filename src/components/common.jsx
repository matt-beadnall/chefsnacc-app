import styled from "styled-components";

export const Button = styled.button`
  margin-top: 20px;
  font-weight: bold;
  height: 38px;
  width: 100%;
  border: none;
`;

export const LightButton = styled.button`
  margin-top: 20px;
  height: 38px;
  background: none;
  width: 100%;
  border: none;
`;

export const ColorfulButton = styled.button`
  margin-top: 20px;
  height: 38px;
  background: none;
  border: 2px solid #e63ec1;
  color: #e63ec1;
  width: 200px;
  &:hover {
    border-color: #38e0c2;
    color: #38e0c2;
  }
`;
