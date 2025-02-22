import React, { useState, Suspense } from "react";
import "./ImageEditor.css";
const FilerobotImageEditor = React.lazy(() => import("react-filerobot-image-editor"));

const ImageEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setIsOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-editor-container">
      {!image && <h2>Editor de Imágenes</h2>}
      {!image && <input type="file" accept="image/*" onChange={handleImageUpload} />}
      {image && isOpen && (
        <div id="editor-container" className="fullscreen-editor">
          <Suspense fallback={<div>Loading editor...</div>}>
            <FilerobotImageEditor
              source={image}
              onClose={() => setIsOpen(false)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
