import React from "react";
import "./Sidebar.css";
import home from "../../assets/icons/home.png"; // Ruta relativa

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
