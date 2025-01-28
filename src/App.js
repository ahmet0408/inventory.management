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
import DepartmentList from "./components/DepartmentList";
import CompanyList from "./components/CompanyList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <main className="main-wrapper">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/adddepartment" element={<AddDepartment />} />
            <Route path="/addcompany" element={<AddCompany />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/employeelist" element={<EmployeeList />} />
            <Route path="/departmentlist" element={<DepartmentList />} />
            <Route path="/companylist" element={<CompanyList />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
