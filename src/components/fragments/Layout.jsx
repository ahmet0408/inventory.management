import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />
      <Navbar />
      <main className="main-wrapper">
        <style>
          {`
      @media (min-width: 1366px) {
        .main-wrapper {
          margin-top: 90px;
        }
      }
    `}
        </style>
        {/* main-wrapper uchin main.css 396, 403 row update */}
        <div className="main-content">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
