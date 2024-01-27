import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowsExpandIcon } from "@heroicons/react/outline";
import {
  Button,
  Card,
  Text,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { Tab } from "@nextui-org/react";

const users = [
  {
    name: "Conor McFlow",
    country: "Ireland",
    lastActive: "1d ago",
    transactions: 41,
  },
  {
    name: "Lena Mayer",
    country: "Switzerland",
    lastActive: "2d ago",
    transactions: 5,
  },
  {
    name: "Paul String",
    country: "Germany",
    lastActive: "8min ago",
    transactions: 8,
  },
// ...
  {
    name: "John Done",
    country: "Switzerland",
    lastActive: "2min ago",
    transactions: 21,
  },
  {
    name: "Donald Blake",
    country: "Austria",
    lastActive: "4min ago",
    transactions: 15,
  },
  {
    name: "Lena Mayer",
    country: "Germany",
    lastActive: "12d ago",
    transactions: 1,
  },
];

export default function Scoreboard() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <h1 style={{textAlign: "center", marginTop: "20px"}}>Top Scores</h1>
      <Card className="relative max-w-xl mx-auto h-96 overflow-hidden mt-12">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell className="text-right">points</TableHeaderCell>
              <TableHeaderCell className="text-right">lastActive</TableHeaderCell>
              <TableHeaderCell className="text-right"># wins</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, i) => (
              <TableRow key={item.name}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  <Text>{item.country}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.lastActive}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.transactions}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-12 pb-8 absolute rounded-b-lg">
          <Button
            icon={ArrowsExpandIcon}
            className="bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            onClick={openModal}
          >
            Show more
          </Button>
        </div>
      </Card>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  <div className="relative mt-3">
                    <Table className="h-[450px]">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell className="bg-white">User</TableHeaderCell>
                          <TableHeaderCell className="bg-white text-right">country</TableHeaderCell>
                          <TableHeaderCell className="bg-white text-right">
                            lastActive
                          </TableHeaderCell>
                          <TableHeaderCell className="bg-white text-right">
                            transactions
                          </TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">
                              <Text>{item.country}</Text>
                            </TableCell>
                            <TableCell className="text-right">
                              <Text>{item.lastActive}</Text>
                            </TableCell>
                            <TableCell className="text-right">
                              <Text>{item.transactions}</Text>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-white z-0 h-20 w-full" />
                    </Table>
                  </div>
                  <Button
                    className="mt-5 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={closeModal}
                  >
                    Go back
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}