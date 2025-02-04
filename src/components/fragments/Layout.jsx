import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {

  const {token } = useAuth();

  if (!token){
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <Navbar />
      <main className="main-wrapper">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
