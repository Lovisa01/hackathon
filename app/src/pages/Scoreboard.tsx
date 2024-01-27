import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import { Button, Card, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Flex } from "@tremor/react";
import { Select, SelectItem } from "@nextui-org/react";
import { BASE_URL } from "../../Constants";

// const users = [
//   {
//     name: "Conor McFlow",
//     country: "Ireland",
//     lastActive: "1d ago",
//     transactions: 41,
//   },
//   {
//     name: "Lena Mayer",
//     country: "Switzerland",
//     lastActive: "2d ago",
//     transactions: 5,
//   },
//   {
//     name: "Paul String",
//     country: "Germany",
//     lastActive: "8min ago",
//     transactions: 8,
//   },
// // ...
//   {
//     name: "John Done",
//     country: "Switzerland",
//     lastActive: "2min ago",
//     transactions: 21,
//   },
//   {
//     name: "Donald Blake",
//     country: "Austria",
//     lastActive: "4min ago",
//     transactions: 15,
//   },
//   {
//     name: "Lena Mayer",
//     country: "Germany",
//     lastActive: "12d ago",
//     transactions: 1,
//   },
// ];

export default function Scoreboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([{ id: 0, name: "", gamesWon: 0, totalGames: 0 }]);
  const [sort, setSort] = useState("winrate");

  const handleSelectionChange = (e: any) => {
    setSort(e.target.value);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(BASE_URL + "/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("error");
      } else {
        const data = await response.json();
        if (sort == "wins") {
          data.sort((a: { id: number; name: string; gamesWon: number; totalGames: number }, b: { id: number; name: string; gamesWon: number; totalGames: number }) => {
            if (a.gamesWon > b.gamesWon) {
              return -1;
            }
            if (a.gamesWon < b.gamesWon) {
              return 1;
            }
            return 0;
          });
        } else if (sort == "winrate") {
          data.sort((a: { id: number; name: string; gamesWon: number; totalGames: number }, b: { id: number; name: string; gamesWon: number; totalGames: number }) => {
            if (a.gamesWon / a.totalGames > b.gamesWon / b.totalGames) {
              return -1;
            }
            if (a.gamesWon / a.totalGames < b.gamesWon / b.totalGames) {
              return 1;
            }
            if (a.totalGames == 0 || b.totalGames == 0) {
              return -1;
            }
            return 0;
          });
        }

        setUsers(data);
      }
    };
    fetchUsers();
  }, [sort]);

  console.log(sort);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Top Scores</h1>
      <Flex justifyContent="center" className="mt-6">
        <Select
          aria-label="Select Sort"
          className="max-w-xs"
          selectedKeys={[sort]}
          // defaultSelectedKeys={["winrate"]}
          onChange={handleSelectionChange}
        >
          <SelectItem key={"winrate"} value={"winrate"}>
            Sort by Win Rate
          </SelectItem>
          <SelectItem key={"wins"} value={"wins"}>
            Sort by Wins
          </SelectItem>
        </Select>
      </Flex>
      <Card className="relative max-w-xl mx-auto h-96 overflow-hidden mt-12">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell className="text-right">Games Won</TableHeaderCell>
              <TableHeaderCell className="text-right">Total Games</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, i) => (
              <TableRow key={item.name + item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  <Text>{item.gamesWon}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.totalGames}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
