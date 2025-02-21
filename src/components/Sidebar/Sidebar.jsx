import React from "react";
import "./Sidebar.css";
import home from "/Users/williamesteban/Desktop/ProyectosReact/canva-project/src/assets/icons/home.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="home" src={home} alt="Home Icon" />
      <h4 className="texto">inicio</h4>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </div>
  );
};

export default Sidebar;
