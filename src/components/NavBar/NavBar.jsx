import React from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import gif1 from "../../assets/gif1.gif";
import gif2 from "../../assets/gif2.gif";
import gif3 from "../../assets/gif3.gif";

const NavBar = () => {
  return (
    <section className="nav-section">
      <nav>
        {/* <img src={logo} alt="" /> */}
        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="logo">Weather App</span>
        </div> */}

        {/* <img src={gif1} style={{ width: "100px", height: "600px"}} alt="" className="gif" /> */}
        <ul>
          <li>
            {/* <ion-icon name="home-outline"></ion-icon> */}
            <span></span>
          </li>
          <li>
            {/* <ion-icon name="newspaper-outline"></ion-icon> */}
            <span></span>
          </li>
          <li>
            {/* <ion-icon name="locate-outline"></ion-icon> */}
            <span></span>
          </li>
          <li>
            {/* <ion-icon name="camera-outline"></ion-icon> */}
            <span></span>
          </li>
          <li>
            {/* <ion-icon name="videocam-outline"></ion-icon> */}
            <span></span>
          </li>
          <li>
            {/* <ion-icon name="call-outline"></ion-icon> */}
            <span></span>
          </li>
        </ul>
        
        <ul>
          <li>
            {/* <ion-icon name="log-out-outline"></ion-icon> */}
            <span></span>
          </li>
        </ul> 
      </nav>
    </section>
  );
};

export default NavBar;
