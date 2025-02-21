import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import "./styles.css";
import Middlebar from "./components/Middlebar/Middlebar";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Middlebar/>
    </div>
  );
};
export default App;
