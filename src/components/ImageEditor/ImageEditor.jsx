import React, { useState, useEffect } from "react";
import FilerobotImageEditor from "react-filerobot-image-editor";
import "./ImageEditor.css";

const ImageEditor = ({ pageIndex, elements, updatePageElements }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const request = indexedDB.open("ImageEditorDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images");
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("images", "readonly");
      const store = transaction.objectStore("images");
      const getRequest = store.get(`image-${pageIndex}`);

      getRequest.onsuccess = (e) => {
        setImage(e.target.result);
      };
    };
  }, [pageIndex]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImage(imageData);

        const request = indexedDB.open("ImageEditorDB", 1);

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction("images", "readwrite");
          const store = transaction.objectStore("images");
          store.put(imageData, `image-${pageIndex}`);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorClose = (editedImage) => {
    setIsOpen(false);
    localStorage.setItem(`isOpen-${pageIndex}`, false);

    if (editedImage) {
      const request = indexedDB.open("ImageEditorDB", 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
        store.put(editedImage, `image-${pageIndex}`);
      };

      updatePageElements([...elements, { image: editedImage }]);
    }
  };

  const handleEditorOpen = () => {
    setIsOpen(true);
    localStorage.setItem(`isOpen-${pageIndex}`, true);
  };

  return (
    <div className="image-editor-container">
      {!image && <h2>Editor de Imágenes</h2>}
      {!image && (
        <>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </>
      )}
      {image && !isOpen && (
        <button onClick={handleEditorOpen}>Abrir Editor</button>
      )}
      {isOpen && image && (
        <div className="fullscreen-editor">
          <FilerobotImageEditor
            source={image}
            onSave={(editedImage) => handleEditorClose(editedImage)}
            onClose={() => handleEditorClose(null)}
            annotationsCommon={{ fill: "#ff0000" }}
            Text={{ text: "Texto de ejemplo" }}
            Rotate={{ angle: 90, componentType: "buttons" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;