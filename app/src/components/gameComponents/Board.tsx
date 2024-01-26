import React, { useState } from 'react';
import Cell from './Cell';


// The game board to be played on, which also handles the game state

const Board = () => {
    const [board, setBoard] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]);

    const [currPlayer, setPlayer] = useState(1)

    // Implement game logic (e.g., handling player moves, checking for a winner)

    return (
        <div className="board">
            
        </div>
    );
};

export default Board;