import React from "react";
import "./BotonExport.css";

const BotonExport = ({ pageIndex, elements, setPages }) => {

  const exportConfig = () => {
    if (elements.length === 0) {
      alert("Save for created a Json");
      return;
    }

    const config = { elements }; // Exportar solo los elementos de la página actual
    const jsonBlob = new Blob([JSON.stringify(config)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = `config-page-${pageIndex + 1}.json`;
    link.click();
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const config = JSON.parse(reader.result);
        const newPages = [...pages];
        newPages[pageIndex] = { ...newPages[pageIndex], elements: config.elements };
        setPages(newPages);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="export-import-buttons">
      <button onClick={exportConfig}>Exportar Configuración</button>
      {/* Input oculto */}
      <input
        type="file"
        accept="application/json"
        onChange={importConfig}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default BotonExport;
