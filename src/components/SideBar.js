import { slide as Menu } from "react-burger-menu";
import NavItems from "./NavItems";
import React from "react";

export default function SideBar(props) {
  return (
    // Pass on our props
    <Menu {...props} right>
      <NavItems 
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
        }} 
        column
      ></NavItems>
    </Menu>
  );
}
