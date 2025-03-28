import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import Products from "./components/Products";
import CustomerList from "./components/CustomerList";
import Rent from "./components/Rent";
import Basket from "./components/Basket";
import AddCustomer from "./components/AddCustomer";
import Register from "./components/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/departmentlist" element={<DepartmentList />} />
          <Route path="/companylist" element={<CompanyList />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/rent" element={<Rent />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
