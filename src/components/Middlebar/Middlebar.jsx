import React, { useState, useEffect } from "react";
import "./Middlebar.css";
import Board from "../Board/Board";
import BotonExport from "../BotonExport/BotonExport";
import BotonDownload from "../BotonDownload/BotonDownload";

const Middlebar = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState(localStorage.getItem(`image-${currentPage}`) || null); // Guardar la imagen

  useEffect(() => {
    const storedPages = localStorage.getItem("pages");
    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
  }, []);

  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem("pages", JSON.stringify(pages));
    }
  }, [pages]);

  const addPage = () => {
    const newPage = { id: pages.length + 1, elements: [] };
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    setCurrentPage(updatedPages.length - 1);
  };

  const removePage = () => {
    if (pages.length > 1) {
      localStorage.removeItem(`image-${currentPage}`);
      localStorage.removeItem(`isOpen-${currentPage}`);

      const newPages = pages.filter((_, index) => index !== currentPage);
      setPages(newPages);
      localStorage.setItem("pages", JSON.stringify(newPages));

      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const updatePageElements = (newElements) => {
    const updatedPages = pages.map((page, index) =>
      index === currentPage ? { ...page, elements: newElements } : page
    );
    setPages(updatedPages);
  };

  const handleImageLoaded = (loaded) => {
    setImageLoaded(loaded);
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

      <div className="page-controls">
        <button onClick={addPage} className="agregar">+ add new page</button>
        <button onClick={removePage} className="agregar" disabled={pages.length === 1}>- delete page</button>
      </div>

      <p>Página {currentPage + 1} de {pages.length}</p>

      <div className="navigation-buttons">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
          Anterior
        </button>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pages.length - 1}>
          Siguiente
        </button>
      </div>

      <Board
        key={pages[currentPage]?.id}
        pageIndex={currentPage}
        elements={pages[currentPage]?.elements || []} // Pasamos los elementos de la página actual
        updatePageElements={updatePageElements} // Función para actualizar los elementos de la página
        onImageLoaded={handleImageLoaded} // Callback para saber cuando se carga una imagen
      />
      <BotonExport
        pageIndex={currentPage}
        elements={pages[currentPage]?.elements || []}
        setPages={setPages}
      />
      <BotonDownload image={image} /> {/* Pasa la imagen actual a BotonDownload */}
    </div>
  );
};

export default Middlebar;
