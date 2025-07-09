import React, { useState } from 'react'


const Tictaktoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] !== null || winner !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    const winnerCombination = checkWinner(newBoard);
    if (winnerCombination) {
      setWinner(newBoard[winnerCombination[0]]);
    }
    setXIsNext(!xIsNext);
  };

  const checkWinner = (newBoard) => {
    const combinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
        return combinations[i];
      }
    }
    return null;
  };

  const renderSquare = (index) => {
    return (
      <button className='board-size' onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    )
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  return (
    <div className='container'>
      <div className='board'>
        <div className='row'>
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className='row'>
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className='row'>
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
      </div>
      <div className='status'>
        {winner ? (
          <h2>{winner} is the winner!</h2>
        ) : (
          <h3>Next player: {xIsNext ? 'X' : 'O'}</h3>
        )}
      </div>
      <button className='reset-btn' onClick={resetGame}>Reset Game</button>
    </div>
  )
}

export default Tictaktoe;
