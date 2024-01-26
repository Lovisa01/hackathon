import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useLocation } from 'react-router-dom'
import { GameLogo } from "./GameLogo";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarBrand>
        <GameLogo />
        <p className="font-bold text-inherit">GAME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color={pathname === "/" ? undefined : "foreground"} href="/" size="lg">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/game"}>
          <Link color={pathname === "/game" ? undefined : "foreground"} href="/game" aria-current="page">
            <p className="text-3xl ">
              Game
            </p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/scoreboard"}>
          <Link color={pathname === "/scoreboard" ? undefined : "foreground"} href="/scoreboard" size="lg">
            Scoreboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
