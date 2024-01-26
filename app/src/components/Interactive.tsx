import { useMouse } from "@uidotdev/usehooks";
import { useEffect } from "react";

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

// blob that follows mouse on homepage
export default function Interactive() {
  const [mouse] = useMouse();

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    requestAnimationFrame(() => {
      move();
    });
  }

  useEffect(() => {
    move();
  }, []);

  useEffect(() => {
    tgX = mouse.x;
    tgY = mouse.y;
    // move();
  }, [mouse]);

  return <div className="interactive" style={{ transform: `translate(${Math.round(curX)}px, ${Math.round(curY)}px)` }}></div>;
}
