import React, { useState } from "react";
import "./Middlebar.css";
import Board from "../Board/Board";

const Middlebar = () => {
  const [pages, setPages] = useState([{ id: 1 }]); // Manejamos páginas
  const [currentPage, setCurrentPage] = useState(0); // Página actual

  const addPage = () => {
    setPages([...pages, { id: pages.length + 1 }]);
    setCurrentPage(pages.length); // Cambia a la nueva página automáticamente
  };

  const removePage = () => {
    if (pages.length > 1) {
      const newPages = pages.filter((_, index) => index !== currentPage);
      setPages(newPages);
      setCurrentPage(Math.max(0, currentPage - 1)); // Ajusta el índice
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex); // Cambia la página actual
  };

  return (
    <div className="middlebar">
      <div className="titulo">
        <span className="letra1">C</span>
        <span className="letra2">u</span>
        <span className="letra3">n</span>
        <span className="letra4">v</span>
        <span className="letra5">a</span>
      </div>

      {/* Controles de navegación */}
      <div className="page-controls">
        <button onClick={addPage} className="agregar">+ add new page</button>
        <button onClick={removePage} className="agregar" disabled={pages.length === 1}>- delete page</button>
      </div>

      <p>Página {currentPage + 1} de {pages.length}</p>

      {/* Botones para navegar entre páginas */}
      <div className="navigation-buttons">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
          Anterior
        </button>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pages.length - 1}>
          Siguiente
        </button>
      </div>

      {/* Renderizar el Board de la página actual */}
      <Board key={pages[currentPage].id} pageIndex={currentPage} />
    </div>
  );
};

export default Middlebar;
