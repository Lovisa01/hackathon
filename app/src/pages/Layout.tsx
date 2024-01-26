import { Outlet, Link } from "react-router-dom";
import Navigationbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="contentDiv">
      <Navigationbar />

      <Outlet />
    </div>
  )
};

export default Layout;