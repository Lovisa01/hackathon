import React from "react";
import { useLocation } from "react-router";
import { Card as TremorCard, Flex, Metric, DonutChart, Legend } from "@tremor/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

type Props = {};

const User = (props: Props) => {
  const location = useLocation();
  const user = location.state;
  const stats = [
    { name: "Games Won", value: user.gamesWon },
    { name: "Games Lost", value: user.totalGames - user.gamesWon },
  ];

  console.log(user);

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  // const valueFormatter = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()} %`;

  return (
    <Flex justifyContent="center" flexDirection="col">
      <div className="text-4xl m-8">{user.name}</div>
      <Flex justifyContent="center" flexDirection="row" className="gap-x-36">
        <Card className="min-w-[200px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Games Won</p>
              {/* <p className="text-small text-default-500">nextui.org</p> */}
            </div>
          </CardHeader>
          {/* <Divider/> */}
          <CardBody>
            <Metric>{user.gamesWon}</Metric>
          </CardBody>
        </Card>
        <Card className="min-w-[200px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Total Games Played</p>
              {/* <p className="text-small text-default-500">nextui.org</p> */}
            </div>
          </CardHeader>
          {/* <Divider/> */}
          <CardBody>
            <Metric>{user.totalGames}</Metric>
          </CardBody>
        </Card>
      </Flex>
      {/* <TremorCard className="max-w-lg my-12 shadow-lg"> */}
      {/* <Title>Sales</Title> */}
      {user.totalGames > 0 && (
        <div>
          <DonutChart
            className="mt-6"
            label={Math.round((user.gamesWon / user.totalGames) * 100) + "%"}
            data={stats}
            category="value"
            index="name"
            variant="donut"
            //   valueFormatter={valueFormatter}
            colors={["cyan", "rose"]}
          />
          <Legend className="mt-3" categories={["Games Won", "Games Lost"]} colors={["cyan", "rose"]} />
        </div>
      )}
      {/* </TremorCard> */}
    </Flex>
  );
};

export default User;
