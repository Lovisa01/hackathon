import { Outlet, Link } from "react-router-dom";
import Navigationbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/contact">404</Link>
          </li>
        </ul>
      </nav> */}
      <Navigationbar />

      <Outlet />
    </>
  )
};

export default Layout;