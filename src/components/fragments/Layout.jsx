import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <main className="main-wrapper">
        <div className="main-content">
          <Outlet /> {/* This renders the child routes */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
