import React, {useEffect, useRef, useState} from 'react';
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
}

const playerColors = {1: '#6366f1', 2: '#de2a49'}
const Ball: React.FC<BallProps> = ({x,y,player, fallingHandler,
                                       leftxBound, rightxBound,
                                       bottomyBound, topyBound}) => {

    const [ballPosition, setBallPosition] = useState({ x: x, y: y });
    const [falling, setFalling] = useState(true)

    const gravity = 6; // Adjust gravity as needed
    const radius = 40;
    const initialBounceStrength = 50; // Adjust initial bounce strength as needed
    const dampingFactor = 0.05; // Adjust damping factor as needed
    let hasBounced = false

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

    const circleRef = useRef(null);

    useEffect(() => {
        const circle = circleRef.current;

        const animation = new window.Konva.Animation(frame => {
            if (falling && !hasBounced){
                return
            }

            const timeout = 1400;
            // Bouncing animation logic with damping
            const bounceStrength =
                initialBounceStrength * Math.pow(dampingFactor, frame.time / timeout);
            // Bouncing animation logic
            const newY = ballPosition.y  - Math.abs(Math.sin(frame.time / (timeout / 10)) * bounceStrength);
            circle.y(newY);
        }, circle.getLayer());

        // Start the animation when the component mounts
        animation.start();
        // Stop the animation after 2 seconds
        const stopAnimationTimeout = setTimeout(() => {
            animation.stop();
        }, 1400);

        // Cleanup on component unmount
        return () => {
            animation.stop();
            clearTimeout(stopAnimationTimeout);
            hasBounced = true
        };
    }, [falling, ballPosition]);

    return(
        <Circle
            ref={circleRef}
            x={ballPosition.x}
            y={ballPosition.y}
            radius={radius}
            fill={playerColors[player]}
        />
    )
}

export default Ball;