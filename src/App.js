import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import AddDepartment from "./components/AddDepartment";
import AddCompany from "./components/AddCompany";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import DepartmentList from "./components/DepartmentList";
import CompanyList from "./components/CompanyList";
import CategoryList from "./components/CategoryList";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Login from "./components/auth/Login";
import Layout from "./components/fragments/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route without Layout */}
        <Route path="/login" element={<Login />} />

        {/* All other routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/departmentlist" element={<DepartmentList />} />
          <Route path="/companylist" element={<CompanyList />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
