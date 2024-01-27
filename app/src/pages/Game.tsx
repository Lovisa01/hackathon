import React from 'react';
import Board from '../components/gameComponents/Board';
import { Callout } from "@tremor/react";
import { useLocation } from 'react-router-dom';

const Game = () => {
    const location = useLocation();
    const user1 = location.state.player1;
    const user2 = location.state.player2;

    console.log(user1, user2)

    return (
        <div className="game bg-violet-100">
            {/* <h1>4-In-A-Row Game</h1> */}
            <Board />
            <Callout title={user1.name} className='absolute flex top-40 left-20 z-10 text-3xl px-6'>
            </Callout>
            <Callout title={user2.name} className='absolute flex top-40 right-20 z-10 text-3xl px-6' />

        </div>
    );
};

export default Game;