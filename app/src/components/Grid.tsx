import React from "react";
import { Grid, Col, Text, Metric } from "@tremor/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, CircularProgress } from "@nextui-org/react";


const numCols = [1, 2, 3, 4, 5, 6, 7];

const Circle = () => {
  return <div className="w-20 h-20 rounded-full bg-white m-3 "></div>;
};

type ClickAreaProps = {
    onClick: () => void;
    };
const ClickArea = ({onClick}: ClickAreaProps) => {
    return (
        <div className="w-full h-full bg-purple-500 hover:bg-purple-600" onClick={onClick}></div>
    );
    };

const Column = () => {
  return (
    <div className="w-fit">
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
    </div>
  );
};

type Props = {};

const GridTest = (props: Props) => {
  return (
    <>
          <div className="w-5/6 h-32 m-auto grid grid-cols-7">
              {numCols.map((num) => (
                  <ClickArea key={"clickArea"+num} onClick={() => alert("clicked")} />
                ))
                }
              
            </div>
      <Card isBlurred className="p-6 bg-gray-100 w-5/6 m-auto">
        <div className="grid grid-cols-7 gap-2">
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
        </div>
      </Card>
    </>
  );
};

export default GridTest;
