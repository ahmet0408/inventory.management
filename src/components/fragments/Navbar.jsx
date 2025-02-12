import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="primary-menu">
      <nav className="navbar navbar-expand-xl align-items-center">
        <div
          className="offcanvas offcanvas-start w-260"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header border-bottom h-70">
            <div className="w-75 d-flex justify-content-center align-items-center gap-2">
              <Link to={"/"}>
                <img
                  src="assets/images/inventar.png"
                  className="logo-icon"
                  width="140"
                  alt="logo icon"
                />
              </Link>
            </div>
            <a
              href="#"
              className="primaery-menu-close"
              data-bs-dismiss="offcanvas"
            >
              <i className="material-icons-outlined">close</i>
            </a>
          </div>
          <div className="offcanvas-body p-0">
            <ul className="navbar-nav align-items-center flex-grow-1">
              <li className="nav-item dropdown me-1">
                <Link
                  to={"/"}
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">home</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Baş sahypa
                  </div>
                  <div className="ms-auto dropy-icon ">
                    <i className="material-icons-outlined">1</i>
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown me-1">
                <Link
                  to="/products"
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">apps</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Harytlar
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">1</i>
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown me-1">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">medical_services</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Administrator
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">widgets</i>
                      Kompaniýa
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li className={isActive("/companylist") ? "active" : ""}>
                        <Link
                          to="/companylist"
                          className={`dropdown-item ${
                            isActive("/companylist") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Kompaniýalar
                        </Link>
                      </li>
                      <li className={isActive("/addcompany") ? "active" : ""}>
                        <Link
                          to="/addcompany"
                          className={`dropdown-item ${
                            isActive("/addcompany") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Kompaniýa goşmak
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="material-icons-outlined">shopping_bag</i>
                      Bölüm
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li
                        className={isActive("/departmenlist") ? "active" : ""}
                      >
                        <Link
                          to="/departmentlist"
                          className={`dropdown-item ${
                            isActive("/departmentlist") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Bölümler
                        </Link>
                      </li>
                      <li
                        className={isActive("/adddepartment") ? "active" : ""}
                      >
                        <Link
                          to="/adddepartment"
                          className={`dropdown-item ${
                            isActive("/adddepartment") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Bölüm goşmak
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="material-icons-outlined">free_breakfast</i>
                      Işgär
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li className={isActive("/employeelist") ? "active" : ""}>
                        <Link
                          to="/employeelist"
                          className={`dropdown-item ${
                            isActive("/employeelist") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Işgärler
                        </Link>
                      </li>
                      <li className={isActive("/addemployee") ? "active" : ""}>
                        <Link
                          to="/addemployee"
                          className={`dropdown-item ${
                            isActive("/addemployee") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Işgär goşmak
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="material-icons-outlined">mail</i>
                      Müşderi
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li className={isActive("/customerlist") ? "active" : ""}>
                        <Link
                          to="/customerlist"
                          className={`dropdown-item ${
                            isActive("/customerlist") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Müşderiler
                        </Link>
                      </li>
                      <li className={isActive("/addcustomer") ? "active" : ""}>
                        <Link
                          to="/addcustomer"
                          className={`dropdown-item ${
                            isActive("/addcustomer") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Müşderi goşmak
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="material-icons-outlined">pie_chart</i>
                      Kategoriýa
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li className={isActive("/categorylist") ? "active" : ""}>
                        <Link
                          to="/categorylist"
                          className={`dropdown-item ${
                            isActive("/categorylist") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Kategoriýalar
                        </Link>
                      </li>
                      <li className={isActive("/addcategory") ? "active" : ""}>
                        <Link
                          to="/addcategory"
                          className={`dropdown-item ${
                            isActive("/addcategory") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Kategoriýa goşmak
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="material-icons-outlined">cases</i>Haryt
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li className={isActive("/productlist") ? "active" : ""}>
                        <Link
                          to="/productlist"
                          className={`dropdown-item ${
                            isActive("/productlist") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Harytlar
                        </Link>
                      </li>
                      <li className={isActive("/addproduct") ? "active" : ""}>
                        <Link
                          to="/addproduct"
                          className={`dropdown-item ${
                            isActive("/addproduct") ? "active" : ""
                          }`}
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Haryt goşmak
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
