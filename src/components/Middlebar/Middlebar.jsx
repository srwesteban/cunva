import React from "react";
import "./Middlebar.css"; // Estilos para el Middlebar
import Board from "../Board/Board";

const Middlebar = () => {
  return (
    <div className="middlebar">
      <div class="titulo">
        <span class="letra1">C</span>
        <span class="letra2">u</span>
        <span class="letra3">n</span>
        <span class="letra4">v</span>
        <span class="letra5">a</span>
      </div>
      <button className="agregar">+ agregar nueva pagina</button>
      <div>
        <Board />
      </div>
    </div>
  );
};

export default Middlebar;
