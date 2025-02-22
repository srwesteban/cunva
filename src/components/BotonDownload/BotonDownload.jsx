import React from 'react';

const BotonDownload = ({ image }) => {
  const handleDownload = (format) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.download = `image.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    };
  };

  return (
    <div>
      {image && (
        <div>
          <button onClick={() => handleDownload('png')}>Descargar PNG</button>
          <button onClick={() => handleDownload('jpeg')}>Descargar JPEG</button>
        </div>
      )}
    </div>
  );
};

export default BotonDownload;
