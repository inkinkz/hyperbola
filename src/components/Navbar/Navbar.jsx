import React from "react";
import "./Navbar.css";
import DrawerButton from "../SideDrawer/DrawerButton";
// import Logo from "./hyperbola-logo.png";
// import Cart from "./shopping-cart.svg";

const navbar = props => (
  <header className="navbar">
    <nav className="navbar_navigation">
      <div className="toggle-button">
        <div>
          <DrawerButton click={props.drawerClickHandler} />
        </div>
      </div>

      <div className="space" />
      {/* <div className="navbar_logo">
        <img src={Logo} alt="Hyperbola" height="50" width="50" />
      </div> */}
      <p className="brand-text">Hyperbola</p>
      <div className="navbar_items">
        <ul className="cart_icon">
          <li>{/* <img src={Cart} alt="Cart" height="26" width="26" /> */}</li>
        </ul>
      </div>
    </nav>
  </header>
);

export default navbar;
