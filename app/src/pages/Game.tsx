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
        <div className="game bg-gradient-to-r from-violet-200 from-10% via-violet-100 to-90% to-pink-200 -z-10">
            {/* <h1>4-In-A-Row Game</h1> */}
            <Board user1={user1} user2={user2}/>
            <Callout title={user1.name} color={"violet"}  className='absolute flex top-40 left-20 text-xl px-6'>
            </Callout>
            <Callout title={user2.name} color={"pink"} className='absolute flex top-40 right-20 text-xl px-6' />

        </div>
    );
};

export default Game;