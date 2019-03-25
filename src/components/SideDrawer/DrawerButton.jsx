import React from "react";
import Button from "./line-menu.svg";
import "./DrawerButton.css";

const drawerButton = props => (
  <button className="drawer-toggle-button" onClick={props.click}>
    <img src={Button} alt="Menu" width="20" height="20" />
  </button>
);

export default drawerButton;
