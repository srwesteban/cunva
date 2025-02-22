import React, { useState, useEffect } from "react";
import "./Middlebar.css";
import Board from "../Board/Board";
import html2canvas from "html2canvas";
import Title from "../Title/Title";

const Middlebar = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const storedPages = localStorage.getItem("pages");
    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
  }, []);

  const handleDownload = (format) => {
    const canvasElement = document.querySelector("canvas");
    if (!canvasElement) return;

    html2canvas(canvasElement, { useCORS: true })
      .then((canvas) => {
        const imageURL = canvas.toDataURL(format === "jpeg" ? "image/jpeg" : "image/png", 0.8);
        const link = document.createElement("a");
        link.href = imageURL;
        link.download = `image-edited.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(console.error);
  };

  const handleExportJSON = () => {
    const editorState = pages[currentPage]?.elements;
    if (editorState) {
      const jsonStr = JSON.stringify(editorState);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "editor-state.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = () => {
    const canvasElement = document.querySelector("canvas");
    if (!canvasElement) return;

    html2canvas(canvasElement, { useCORS: true })
      .then((canvas) => {
        const imageURL = canvas.toDataURL("image/png", 0.8);
        setPreviewImage(imageURL);
        setPreviewVisible(true);
      })
      .catch(console.error);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setPreviewImage(null);
  };

  return (
    <div className="middlebar">
      <Title />
      <Board />
      <div className="download-buttons">
        <button onClick={() => handleDownload("png")}>Download PNG</button>
        <button onClick={() => handleDownload("jpeg")}>Download JPEG</button>
        <button onClick={handleExportJSON}>Export JSON</button>
        <button onClick={handlePreview}>Preview</button>
      </div>

      {previewVisible && (
        <div className="preview-modal">
          <div className="preview-content">
            <img src={previewImage} alt="Preview" />
            <button onClick={closePreview}>Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Middlebar;
