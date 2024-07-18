import React from 'react';
import { CellWrapper, CellContent } from '../style';

const Cell = ({ cell, onClick, onContextMenu }) => {
  return (
    <CellWrapper
      revealed={cell.revealed}
      flagged={cell.flagged}
      questioned={cell.questioned}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <CellContent>
        {cell.revealed && !cell.mine && cell.adjacentMines > 0
          ? cell.adjacentMines
          : ''}
        {cell.revealed && cell.mine ? '💣' : ''}
        {!cell.revealed && cell.flagged ? '🚩' : ''}
        {!cell.revealed && cell.questioned ? '?' : ''}
      </CellContent>
    </CellWrapper>
  );
};

export default Cell;
