import { Button } from "@nextui-org/react";
import "../bg.scss";
import Interactive from "../components/Interactive";
import { Flex } from "@tremor/react";

export default function Home() {
  return (
    <>
      
      <Flex justifyContent="center" flexDirection="col" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 gap-20">
      <h1 className="text-9xl font-bold text-white text-center">CONNECT4</h1>
      <Button className="inline-block  px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all 
      rounded-lg cursor-pointer bg-gradient-to-tl from-pink-100/70 to-none leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 
      hover:scale-110 hover:rotate-1 hover:bg-purple-800/50 hover:text-pink-200 hover:shadow-lg active:opacity-85"
        variant="flat" style={{
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        zIndex: 100,
        height: "100px",
        width: "300px",
        borderRadius: "30px",
        // transform: "translate(-50%, -50%)",
        fontSize: "3rem",
        color: "white",
        }}
        onClick={() => {
          setTimeout(() => { window.location.href = "/newgame" }, 400);
          
        }}
      >
        Play!
        </Button>
        </Flex>
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <Interactive />
          {/* <div className="interactive"></div> */}
        </div>
      </div>
    </>
  );
}
