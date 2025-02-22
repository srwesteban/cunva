import React, { useState } from "react";
import FilerobotImageEditor from "react-filerobot-image-editor";
import "./ImageEditor.css";

const ImageEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-editor-container">
      <h2>Editor de Imágenes</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && <button onClick={() => setIsOpen(true)}>Abrir Editor</button>}

      {isOpen && image && (
        <div className="fullscreen-editor">
          <FilerobotImageEditor
            source={image}
            onClose={() => setIsOpen(false)}
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
