import React from 'react';
import './Board.css';
import ImageEditor from '../ImageEditor/ImageEditor';

const Board = ({ pageIndex }) => {
  return (
    <div className="board">
      <ImageEditor pageIndex={pageIndex} />
    </div>
  );
};

export default Board;
