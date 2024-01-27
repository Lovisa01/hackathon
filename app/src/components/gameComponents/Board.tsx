import React, {useEffect, useState} from 'react';
import {Stage, Layer, Circle, Rect} from 'react-konva';
import Ball from './Ball.tsx'
import { useMouse } from '@uidotdev/usehooks';



// The game board to be played on, which also handles the game state

const Board = () => {
    const [mouse] = useMouse();
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

    const [droppingBall, setDropBall] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [balls, setBalls] = useState([])

    const rows = 6;
    const columns = 7;
    const boxWidth = 110;
    const boxHeight = 110;

    const [boxes, setBoxes] = useState(generateBoxGrid)

    function checkFourInARow(array) {

        // Function to check for four in a row in a specific direction
        const checkDirection = (startRow, startCol, rowDelta, colDelta) => {
            const player: number = array[startRow][startCol];

            if (player == 0){return}

            for (let i = 1; i < 4; i++) {
                const row = startRow + i * rowDelta;
                const col = startCol + i * colDelta;

                // Check if the index is within bounds
                if (row >= 0 && row < rows && col >= 0 && col < columns) {
                    if (array[row][col] !== player) {
                        return false; // If any element doesn't match, break the loop
                    }
                } else {
                    return false; // If index is out of bounds, break the loop
                }
            }
            setWinner(player)
            return true; // Four in a row found in this direction
        };

        // Check in all directions: horizontal, vertical, and both diagonals
        for (let row = 0; row < columns; row++) {
            for (let col = 0; col < rows; col++) {
                if (
                    checkDirection(row, col, 0, 1) || // Horizontal
                    checkDirection(row, col, 1, 0) || // Vertical
                    checkDirection(row, col, 1, 1) || // Diagonal \
                    checkDirection(row, col, -1, 1)   // Diagonal /
                ) {
                    return true; // Four in a row found
                }
            }
        }

        return false; // No four in a row found
    }

    const handleDropBall = (bool: boolean) => {
        setDropBall(bool)

        let winner = checkFourInARow(board)
        if (winner){
            console.log("let him cook")
        }
    }
    function generateBoxGrid() {

        const grid = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const x = window.innerWidth / 2 - (columns/2) * boxWidth + col * (boxWidth); // Adjust spacing as needed
                const y = window.innerHeight / 2 - (rows/2) * boxHeight + row * (boxHeight); // Adjust spacing as needed

                grid.push({ x, y, width: boxWidth, height: boxHeight });
            }
        }

        return grid;
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if (droppingBall){return}

        setDropBall(true)

        let currCol = null
        let leftx = null
        let rightx = null

        for (let col = 0; col < columns; col++) {
            const x = window.innerWidth / 2 - (columns / 2) * boxWidth + col * (boxWidth);
            if (position.x >= x && position.x <= x + boxWidth) {
                currCol = col;
                leftx = x
                rightx = x + boxWidth
                break
            }
        }

        if (currCol == null) {
            return
        }

        let currRow = null
        let bottomy = null
        let topy = null

        for (let i = rows - 1; i >= 0; i--) {
            if (board[i][currCol] != 0) {
                continue
            }

            const y = window.innerHeight / 2 - (rows/2) * boxHeight + i * (boxHeight);
            currRow = i
            bottomy = y + boxHeight
            topy = y
            break
        }

        if (currRow == null){
            return
        }

        const boardCopy = board
        boardCopy[currRow][currCol] = currentPlayer
        setBoard(boardCopy)

        const ballsCopy = balls;

        ballsCopy.push({x: position.x, y: position.y, player: currentPlayer, leftxBound: leftx, rightxBound: rightx,
            bottomyBound: bottomy, topyBound: topy})
        setBalls(ballsCopy)


        // Implement logic to drop the piece to the lowest available position in the selected column, maybe konva.js?
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };


    const handleMouseMove = (e: { clientX: any; clientY: number; }) => {
        setPosition({ x: mouse.x, y: mouse.y});
        // Update the position to follow the mouse pointer
    };

    // Implement game logic (e.g., handling player moves, checking for a winner)

    // The falling ball effect



    return (
        <div className="board" onMouseMove={handleMouseMove} onClick={handleClick}>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {!droppingBall && <Ball key={Math.random()}
                           x={position.x}
                           y={position.y}
                           player={currentPlayer}
                    />}
                    {balls.map((ball, ballIndex) => (
                        <Ball key={ballIndex}
                              x={ball.x}
                              y={ball.y}
                              player={ball.player}
                              fallingHandler={handleDropBall}
                              leftxBound={ball.leftxBound}
                              rightxBound={ball.rightxBound}
                              bottomyBound={ball.bottomyBound}
                              topyBound={ball.topyBound}
                        />
                    ))}
                    {boxes.map((box, index) => (
                        <Rect key={index}
                              x={box.x}
                              y={box.y}
                              width={box.width}
                              height={box.height}
                              fillEnabled={false}
                              stroke="blue"
                              strokeWidth={2} />
                    ))}
                </Layer>
            </Stage>

        </div>
    );
};

export default Board;