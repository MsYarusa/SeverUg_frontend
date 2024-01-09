import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import "./layoutStyles/Layout.css";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
