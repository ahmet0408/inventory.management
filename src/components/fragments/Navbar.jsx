import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [openMenus, setOpenMenus] = useState({
    admin: false,
    company: false,
    department: false,
    employee: false,
    customer: false,
    category: false,
    product: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menuName, event) => {
    if (!isMobile) return;

    event.preventDefault();
    event.stopPropagation();

    setOpenMenus((prev) => {
      const newState = { ...prev };
      if (menuName !== "admin") {
        newState.admin = true;
      }
      newState[menuName] = !prev[menuName];
      return newState;
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const languages = [
    { code: "tk", name: "Türkmen", flag: "assets/images/county/01.png" },
    { code: "ru", name: "Rus", flag: "assets/images/county/03.png" },
    { code: "en", name: "Iňlis", flag: "assets/images/county/02.png" },
  ];

  const LanguageSwitcher = () => (
    <div
      className="language-switcher border-top d-xl-none"
      style={{ position: "absolute", bottom: "1rem", left: "3rem" }}
    >
      <div className="d-flex justify-content-center gap-3 py-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`btn btn-outline-secondary btn-sm ${
              currentLanguage === lang.code ? "active" : ""
            }`}
            onClick={() => changeLanguage(lang.code)}
          >
            <img src={lang.flag} width="30" alt="" className="me-1" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="primary-menu">
      <style>
        {`
          @media (max-width: 1199px) {
            .primary-menu {
              background: #fff;
            }

            .mobile-dropdown {
              display: none;
              padding: 0;
              background: transparent !important;
              border: none !important;
              transition: all 0.3s ease;
            }
            
            .mobile-dropdown.show {
              display: block;
              animation: slideDown 0.3s ease-out;
            }

            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .submenu-mobile {
              padding-left: 2.5rem !important;
              position: static !important;
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              margin: 0 !important;
            }

            .nav-item .nav-link {
              padding: 1rem 1.5rem;
              border-radius: 8px;
              margin: 0.3rem 1rem;
              transition: all 0.3s ease;
            }

            .nav-item .nav-link:active {
              transform: scale(0.98);
            }

            .dropdown-item {
              padding: 0.8rem 1.5rem;
              border-radius: 8px;
              margin: 0.2rem 1rem;
              transition: background-color 0.3s ease;
            }

            .dropdown-item:active {
              transform: scale(0.98);
            }

            .mobile-menu-icon {
              transition: transform 0.3s ease;
            }

            .mobile-menu-icon.open {
              transform: rotate(180deg);
            }

            .parent-icon {
              margin-right: 1rem;
              display: flex;
              align-items: center;
            }

            .parent-icon i {
              font-size: 1.5rem;
              color: #666;
            }

            .menu-title {
              font-weight: 500;
              color: #333;
            }

            .dropdown-item.active {
              background-color: rgba(0, 123, 255, 0.1);
              color: #007bff;
            }


            .offcanvas-body {
              padding-bottom: 80px !important;
            }
          }

          @media (min-width: 1200px) {
            .mobile-dropdown {
              display: none !important;
            }
            
            .dropdown-menu {
              display: none;
            }

            .dropdown-menu.show {
              display: block;
            }
          }
        `}
      </style>
      <nav className="navbar navbar-expand-xl align-items-center">
        <div
          className="offcanvas offcanvas-start w-260"
          tabIndex="-1"
          id="offcanvasNavbar"
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
          <div className="offcanvas-body p-0" style={{ position: "relative" }}>
            <ul className="navbar-nav align-items-center flex-grow-1">
              <li className="nav-item me-1">
                <Link to="/" className="nav-link">
                  <div className="parent-icon">
                    <i className="material-icons-outlined">home</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    {t("navbar.home.title")}
                  </div>
                </Link>
              </li>
              <li className="nav-item me-1">
                <Link to="/products" className="nav-link">
                  <div className="parent-icon">
                    <i className="material-icons-outlined">apps</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    {t("navbar.products.title")}
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown me-1">
                {/* Desktop version */}
                {!isMobile && (
                  <>
                    <a href="#" className="nav-link" data-bs-toggle="dropdown">
                      <div className="parent-icon">
                        <i className="material-icons-outlined">
                          medical_services
                        </i>
                      </div>
                      <div className="menu-title d-flex align-items-center">
                        {t("navbar.admin.title")}
                      </div>
                      <i className="material-icons-outlined">expand_more</i>
                    </a>
                    <ul className="dropdown-menu">
                      {[
                        {
                          title: "navbar.admin.company.title",
                          icon: "widgets",
                          links: [
                            {
                              path: "/companylist",
                              title: "navbar.admin.company.list",
                            },
                            {
                              path: "/addcompany",
                              title: "navbar.admin.company.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.department.title",
                          icon: "shopping_bag",
                          links: [
                            {
                              path: "/departmentlist",
                              title: "navbar.admin.department.list",
                            },
                            {
                              path: "/adddepartment",
                              title: "navbar.admin.department.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.employee.title",
                          icon: "free_breakfast",
                          links: [
                            {
                              path: "/employeelist",
                              title: "navbar.admin.employee.list",
                            },
                            {
                              path: "/addemployee",
                              title: "navbar.admin.employee.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.customer.title",
                          icon: "mail",
                          links: [
                            {
                              path: "/customerlist",
                              title: "navbar.admin.customer.list",
                            },
                            {
                              path: "/addcustomer",
                              title: "navbar.admin.customer.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.category.title",
                          icon: "pie_chart",
                          links: [
                            {
                              path: "/categorylist",
                              title: "navbar.admin.category.list",
                            },
                            {
                              path: "/addcategory",
                              title: "navbar.admin.category.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.product.title",
                          icon: "cases",
                          links: [
                            {
                              path: "/productlist",
                              title: "navbar.admin.product.list",
                            },
                            {
                              path: "/addproduct",
                              title: "navbar.admin.product.add",
                            },
                          ],
                        },
                      ].map((menu, index) => (
                        <li className="dropend" key={index}>
                          <a
                            href="#"
                            className="dropdown-item dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            <i className="material-icons-outlined">
                              {menu.icon}
                            </i>
                            {t(menu.title)}
                          </a>
                          <ul className="dropdown-menu">
                            {menu.links.map((link, i) => (
                              <li key={i}>
                                <Link
                                  to={link.path}
                                  className={`dropdown-item ${
                                    isActive(link.path) ? "active" : ""
                                  }`}
                                >
                                  <i className="material-icons-outlined">
                                    navigate_next
                                  </i>
                                  {t(link.title)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Mobile version */}
                {isMobile && (
                  <>
                    <a
                      href="#"
                      className="nav-link"
                      onClick={(e) => toggleDropdown("admin", e)}
                    >
                      <div className="parent-icon">
                        <i className="material-icons-outlined">
                          medical_services
                        </i>
                      </div>
                      <div className="menu-title d-flex align-items-center">
                        {t("navbar.admin.title")}
                      </div>
                      <div className="ms-auto dropy-icon">
                        <i
                          className={`material-icons-outlined mobile-menu-icon ${
                            openMenus.admin ? "open" : ""
                          }`}
                        >
                          expand_more
                        </i>
                      </div>
                    </a>
                    <ul
                      className={`mobile-dropdown ${
                        openMenus.admin ? "show" : ""
                      }`}
                    >
                      {[
                        {
                          title: "navbar.admin.company.title",
                          icon: "widgets",
                          links: [
                            {
                              path: "/companylist",
                              title: "navbar.admin.company.list",
                            },
                            {
                              path: "/addcompany",
                              title: "navbar.admin.company.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.department.title",
                          icon: "shopping_bag",
                          links: [
                            {
                              path: "/departmentlist",
                              title: "navbar.admin.department.list",
                            },
                            {
                              path: "/adddepartment",
                              title: "navbar.admin.department.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.employee.title",
                          icon: "free_breakfast",
                          links: [
                            {
                              path: "/employeelist",
                              title: "navbar.admin.employee.list",
                            },
                            {
                              path: "/addemployee",
                              title: "navbar.admin.employee.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.customer.title",
                          icon: "mail",
                          links: [
                            {
                              path: "/customerlist",
                              title: "navbar.admin.customer.list",
                            },
                            {
                              path: "/addcustomer",
                              title: "navbar.admin.customer.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.category.title",
                          icon: "pie_chart",
                          links: [
                            {
                              path: "/categorylist",
                              title: "navbar.admin.category.list",
                            },
                            {
                              path: "/addcategory",
                              title: "navbar.admin.category.add",
                            },
                          ],
                        },
                        {
                          title: "navbar.admin.product.title",
                          icon: "cases",
                          links: [
                            {
                              path: "/productlist",
                              title: "navbar.admin.product.list",
                            },
                            {
                              path: "/addproduct",
                              title: "navbar.admin.product.add",
                            },
                          ],
                        },
                      ].map((menu, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="nav-link ms-4"
                            onClick={(e) => toggleDropdown(menu.title, e)}
                          >
                            <div className="parent-icon">
                              <i className="material-icons-outlined">
                                {menu.icon}
                              </i>
                            </div>
                            <div className="menu-title d-flex align-items-center">
                              {t(menu.title)}
                            </div>
                            <div className="ms-auto dropy-icon">
                              <i
                                className={`material-icons-outlined mobile-menu-icon ${
                                  openMenus[menu.title] ? "open" : ""
                                }`}
                              >
                                expand_more
                              </i>
                            </div>
                          </a>
                          <ul
                            className={`mobile-dropdown submenu-mobile ${
                              openMenus[menu.title] ? "show" : ""
                            }`}
                          >
                            {menu.links.map((link, i) => (
                              <li key={i} style={{ listStyleType: "none" }}>
                                <Link
                                  to={link.path}
                                  className={`nav-link ${
                                    isActive(link.path) ? "active" : ""
                                  }`}
                                >
                                  <i className="material-icons-outlined">
                                    navigate_next
                                  </i>
                                  {t(link.title)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
