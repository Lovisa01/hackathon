import React from 'react';
import Board from '../components/gameComponents/Board';

const Game = () => {
    return (
        <div className="game">
            <h1>4-In-A-Row Game</h1>
            <Board />
        </div>
    );
};

export default Game;