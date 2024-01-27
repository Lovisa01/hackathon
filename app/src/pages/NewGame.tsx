import React from "react";
import "../bg.scss";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, RadioGroup, Radio } from "@nextui-org/react";
import { Flex } from "@tremor/react";
import { BASE_URL } from "../../Constants";
import { PlusIcon } from "@heroicons/react/outline";

type Props = {};

const NewGame = (props: Props) => {
  const [users, setUsers] = React.useState([{ id: 0, name: "", gamesWon: 0, totalGames: 0 }]);
  const [selectedPlayer1, setSelectedPlayer1] = React.useState(new Set([""]));
  const [selectedPlayer2, setSelectedPlayer2] = React.useState(new Set([""]));

  React.useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(BASE_URL + "/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <Flex justifyContent="center" flexDirection="col" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 gap-20">
        <h1 className="text-6xl text-white">New Game</h1>

        <Flex justifyContent="center" flexDirection="row" className="gap-40">
          <Dropdown>
            <DropdownTrigger>
              <Button className="min-h-20 min-w-40 rounded-3xl text-2xl text-white" color={"default"} variant={"flat"}>
                {selectedPlayer1.values().next().value == "" ? "Select Player 1" : selectedPlayer1}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Variants" color={"primary"} variant={"flat"} selectionMode="single" selectedKeys={selectedPlayer1} disabledKeys={selectedPlayer2}>
              {users.map((item, i) => (
                <DropdownItem key={item.name} onClick={() => setSelectedPlayer1(new Set([item.name]))}>
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button className="min-h-20 min-w-40 rounded-3xl text-2xl text-white" color={"default"} variant={"flat"}>
                {selectedPlayer2.values().next().value == "" ? "Select Player 2" : selectedPlayer2}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Variants" color={"primary"} variant={"flat"} selectionMode="single" selectedKeys={selectedPlayer2} disabledKeys={selectedPlayer1}>
              {users.map((item, i) => (
                <DropdownItem key={item.name} onClick={() => setSelectedPlayer2(new Set([item.name]))}>
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Flex>
              <Button variant="flat" className="text-white"
                  onClick={() => { window.location.href = "/signup" }}
              >
          <PlusIcon className="h-5 w-5 text-white" />
          Add New Player
        </Button>
        <Button
          className="inline-block  px-6 py-3 mr-3 font-bold text-center text-white align-middle transition-all 
      rounded-lg cursor-pointer bg-gradient-to-tl from-pink-100/70 to-none leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 
      hover:scale-110 hover:rotate-1 hover:bg-purple-800/50 hover:text-pink-200 hover:shadow-lg active:opacity-85"
          variant="flat"
          style={{
            zIndex: 100,
            height: "100px",
            width: "300px",
            borderRadius: "30px",
            // transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            color: "white",
          }}
          onClick={() => {
            if (selectedPlayer1.values().next().value == "" || selectedPlayer2.values().next().value == "") {
              return;
            }
            setTimeout(() => {
              window.location.href = "/game";
            }, 400);
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
          {/* <div className="interactive"></div> */}
        </div>
      </div>
    </div>
  );
};

export default NewGame;
