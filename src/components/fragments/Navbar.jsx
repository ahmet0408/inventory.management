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
            <div className="w-75 d-flex justify-content-center align-items-center gap-2" >
                <Link to={"/"}>
                  <img
                    // src="assets/images/logo.ico"
                    src="assets/images/inventar.png"
                    className="logo-icon"
                    width="140"
                    alt="logo icon"
                  />
                </Link>
              {/* <div className="">
                <h4 className="logo-text">Inwentar</h4>
              </div> */}
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
            {/* style={{ marginRight: "10px" }} */}
              <li className="nav-item dropdown" >
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">apps</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Harytlar
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/products" className="dropdown-item">
                      <i className="material-icons-outlined">email</i>Harytlar
                    </NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" href="app-chat-box.html">
                      <i className="material-icons-outlined">chat</i>Arenda
                      berlenler
                    </a>
                  </li>
                  <li>
                    <Link to="/order" className="dropdown-item">
                      <i className="material-icons-outlined">task</i>Sargyt
                      edilenler
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="app-invoice.html">
                      <i className="material-icons-outlined">description</i>
                      Invoice
                    </a>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">layers</i>Pages
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li className="nav-item dropend">
                        <a
                          className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                          href="javascript:;"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Error
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="pages-error-403.html"
                            >
                              <i className="material-icons-outlined">
                                navigate_next
                              </i>
                              403 Error
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="pages-error-404.html"
                            >
                              <i className="material-icons-outlined">
                                navigate_next
                              </i>
                              404 rror
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="pages-error-505.html"
                            >
                              <i className="material-icons-outlined">
                                navigate_next
                              </i>
                              505 rror
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="pages-coming-soon.html"
                            >
                              <i className="material-icons-outlined">
                                navigate_next
                              </i>
                              Coming Soon
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="pages-starter-page.html"
                            >
                              <i className="material-icons-outlined">
                                navigate_next
                              </i>
                              Blank Page
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a className="dropdown-item" href="user-profile.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          User Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="timeline.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Timeline
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="faq.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="pricing-table.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">account_circle</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Authentication
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
                      <i className="material-icons-outlined">event</i>Basic
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-basic-login.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Sign In
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-basic-register.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Sign Up
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-basic-forgot-password.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Forgot Password
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-basic-reset-password.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Reset Password
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">perm_identity</i>
                      Cover
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-cover-login.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Sign In
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-cover-register.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Sign Up
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-cover-forgot-password.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Forgot Password
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-cover-reset-password.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Reset Password
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">assignment</i>Boxed
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-boxed-login.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Sign In
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-boxed-register.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Sign Up
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-boxed-forgot-password.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Forgot Password
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-boxed-reset-password.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Reset Password
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item dropdown">
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
                          className={`dropdown-item ${isActive("/companylist") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/addcompany") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/departmentlist") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/adddepartment") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/employeelist") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/addemployee") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/customerlist") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/addcustomer") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/categorylist") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/addcategory") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/productlist") ? "active" : ""
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
                          className={`dropdown-item ${isActive("/addproduct") ? "active" : ""
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
