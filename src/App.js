import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/fragments/Footer";
import Header from "./components/fragments/Header";
import Navbar from "./components/fragments/Navbar";
import Main from "./components/Main";
import AddDepartment from "./components/AddDepartment";
import AddCompany from "./components/AddCompany";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <main className="main-wrapper">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/addDepartment" element={<AddDepartment />} />
            <Route path="/addCompany" element={<AddCompany />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/employeeList" element={<EmployeeList />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
