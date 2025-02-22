import React from 'react';
import './Board.css';
import ImageEditor from "../ImageEditor/ImageEditor";

const Board = ({ pageIndex, elements, updatePageElements, isPhoneScreen, showTabsDrawer }) => {
  return (
    <div className="board">
      <ImageEditor
        pageIndex={pageIndex}
        elements={elements}
        updatePageElements={updatePageElements}
        isPhoneScreen={isPhoneScreen}
        showTabsDrawer={showTabsDrawer}
      />
    </div>
  );
};

export default Board;