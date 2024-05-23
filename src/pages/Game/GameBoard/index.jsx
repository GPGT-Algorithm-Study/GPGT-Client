import React, { useEffect, useState } from 'react';
import Cell from '../Cell';
import {
  BoardWrapper,
  RowWrapper,
  ControlsWrapper,
  Timer,
  RestartButton,
} from '../style';
import { CommonButton } from 'style/commonStyle';

const generateBoard = (rows, cols, mines) => {
  // 초기 보드 설정
  let board = Array(rows)
    .fill()
    .map(() =>
      Array(cols)
        .fill()
        .map(() => ({
          revealed: false,
          flagged: false,
          mine: false,
          adjacentMines: 0,
        })),
    );

  // 지뢰 배치
  let placedMines = 0;
  while (placedMines < mines) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);
    if (!board[row][col].mine) {
      board[row][col].mine = true;
      placedMines++;
    }
  }

  // 인접 지뢰 수 계산
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].mine) continue;
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          board[newRow][newCol].mine
        ) {
          board[row][col].adjacentMines++;
        }
      });
    }
  }

  return board;
};

const Board = ({ rows, cols, mines }) => {
  const [board, setBoard] = useState(generateBoard(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (!gameOver && !gameWon) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver, gameWon]);

  const handleClick = (row, col) => {
    if (
      gameOver ||
      board[row][col].revealed ||
      board[row][col].flagged ||
      board[row][col].questioned
    )
      return;

    const newBoard = board.slice();
    if (newBoard[row][col].mine) {
      setGameOver(true);
      revealBoard(newBoard);
      setBoard(newBoard);
      return; // 폭탄을 클릭한 경우 바로 리턴
    } else {
      revealCell(newBoard, row, col);
    }
    newBoard[row][col].revealed = true;
    setBoard(newBoard);
    checkWin(newBoard);
  };

  const handleContextMenu = (e, row, col) => {
    e.preventDefault();
    if (gameOver || board[row][col].revealed) return;

    const newBoard = board.slice();
    if (newBoard[row][col].questioned) {
      newBoard[row][col].questioned = false;
      newBoard[row][col].flagged = true;
    } else if (newBoard[row][col].flagged) {
      newBoard[row][col].flagged = false;
    } else {
      newBoard[row][col].questioned = true;
    }
    setBoard(newBoard);
  };

  const revealCell = (board, row, col) => {
    if (board[row][col].revealed) return;
    board[row][col].revealed = true;

    if (board[row][col].adjacentMines === 0) {
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];

      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          revealCell(board, newRow, newCol);
        }
      });
    }
  };

  const revealBoard = (board) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        board[row][col].revealed = true;
      }
    }
  };

  const checkWin = (board) => {
    let won = true;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!board[row][col].mine && !board[row][col].revealed) {
          won = false;
          break;
        }
      }
      if (!won) break;
    }
    if (won) {
      setGameWon(true);
      setGameOver(true);
      revealBoard(board);
      setBoard(board);
    }
  };

  const resetGame = () => {
    setBoard(generateBoard(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
    setTime(0);
  };

  return (
    <div>
      <ControlsWrapper>
        <Timer>{time}s</Timer>
      </ControlsWrapper>
      <BoardWrapper>
        {board.map((row, rowIndex) => (
          <RowWrapper key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={cell}
                onClick={() => handleClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex)}
              />
            ))}
          </RowWrapper>
        ))}
      </BoardWrapper>
      <ControlsWrapper>
        <CommonButton onClick={resetGame}>Restart</CommonButton>
      </ControlsWrapper>
      {gameWon && <h2>You won! 😎</h2>}
      {gameOver && !gameWon && <h2>You lost! 😛</h2>}
    </div>
  );
};

export default Board;
