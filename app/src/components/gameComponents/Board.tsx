import React, { useState } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
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

    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [hasWon, setWinner] = useState(0)

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleCellClick = (col : number) => {

        // Implement logic to drop the piece to the lowest available position in the selected column, maybe konva.js?

        const updatedBoard = [...board];
        for (let row = 5; row >= 0; row--) {
            if (updatedBoard[row][col] === 0) {
                updatedBoard[row][col] = currentPlayer;
                break;
            }
        }

        setBoard(updatedBoard);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };


    const handleMouseMove = (e) => {
        // Update the position to follow the mouse pointer
        setPosition({ x: e.clientX, y: e.clientY - 120 });
    };

    // Implement game logic (e.g., handling player moves, checking for a winner)

    return (
        <div className="board" onMouseMove={handleMouseMove}>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Circle
                        // TODO Fix this, just a concept
                        x={position.x}
                        y={position.y}
                        radius={20}
                        fill="red"
                    />
                </Layer>
            </Stage>
            
        </div>
    );
};

export default Board;