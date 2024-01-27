import React, {useEffect, useState} from 'react';
import {Circle} from "react-konva";

interface BallProps {
    key:number
    x: number
    y: number
    player: number
    fallingHandler?: (bool: boolean) => void
    leftxBound?: number
    rightxBound?: number
    bottomyBound?: number
    topyBound?: number
    isFront?: boolean
}

const playerColors = {1: '#6366f1', 2: '#de2a49'}
const Ball: React.FC<BallProps> = ({x,y,player, fallingHandler,
                                       leftxBound, rightxBound,
                                       bottomyBound, topyBound, isFront=false}) => {

    const [ballPosition, setBallPosition] = useState({ x: x, y: y });
    const [falling, setFalling] = useState(true)

    const gravity = 5; // Adjust gravity as needed
    const radius = 40;

    useEffect(() => {
        const updatePosition = () => {

            if (fallingHandler == undefined) {return}
            if(falling && ballPosition.x >= leftxBound && ballPosition.x <= rightxBound &&
                ballPosition.y >= topyBound + radius + 5 && ballPosition.y <= bottomyBound - radius - 5){
                setFalling(false)
                fallingHandler(false)
            }

            if (falling) {
                setBallPosition((prevPosition) => ({
                    x: prevPosition.x,
                    y: Math.min(prevPosition.y + gravity, window.innerHeight - 140),
                }));
            }

        };
        const animationFrame = requestAnimationFrame(updatePosition);

        return () => cancelAnimationFrame(animationFrame);
    }, [falling, ballPosition, fallingHandler, leftxBound, rightxBound, bottomyBound, topyBound]);

    return(
        <Circle
            x={ballPosition.x}
            y={ballPosition.y}
            radius={radius}
            fill={playerColors[player]}
            zIndex={isFront ? 0 : 5}
        />
    )
}

export default Ball;