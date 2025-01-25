const Navbar = () => {
  return (
    <div className="primary-menu">
      <nav className="navbar navbar-expand-xl align-items-center">
        <div
          className="offcanvas offcanvas-start w-260"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header border-bottom h-70">
            <div className="d-flex align-items-center gap-2">
              <div className="">
                <img
                  src="assets/images/logo-icon.png"
                  className="logo-icon"
                  width="45"
                  alt="logo icon"
                />
              </div>
              <div className="">
                <h4 className="logo-text">Maxton</h4>
              </div>
            </div>
            <a
              href="javascript:;"
              className="primaery-menu-close"
              data-bs-dismiss="offcanvas"
            >
              <i className="material-icons-outlined">close</i>
            </a>
          </div>
          <div className="offcanvas-body p-0">
            <ul className="navbar-nav align-items-center flex-grow-1">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">home</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Dashboard
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="index.html">
                      <i className="material-icons-outlined">insights</i>
                      Analysis
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index2.html">
                      <i className="material-icons-outlined">shopping_cart</i>
                      eCommerce
                    </a>
                  </li>
                </ul>
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
                    Apps & Pages
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="app-emailbox.html">
                      <i className="material-icons-outlined">email</i>Email
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="app-chat-box.html">
                      <i className="material-icons-outlined">chat</i>Chat Box
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="app-file-manager.html">
                      <i className="material-icons-outlined">folder</i>File
                      Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="app-to-do.html">
                      <i className="material-icons-outlined">task</i>Todo
                    </a>
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">note_alt</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Forms
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-elements.html">
                      <i className="material-icons-outlined">source</i>Form
                      Elements
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-input-group.html">
                      <i className="material-icons-outlined">work_outline</i>
                      Input Groups
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      className="dropdown-item"
                      href="form-radios-and-checkboxes.html"
                    >
                      <i className="material-icons-outlined">timeline</i>Radios
                      & Checkboxes
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-layouts.html">
                      <i className="material-icons-outlined">label</i>Forms
                      Layouts
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-validations.html">
                      <i className="material-icons-outlined">
                        tips_and_updates
                      </i>
                      Form Validation
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-wizard.html">
                      <i className="material-icons-outlined">dns</i>Form Wizard
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-file-upload.html">
                      <i className="material-icons-outlined">hourglass_empty</i>
                      File Upload
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      className="dropdown-item"
                      href="form-date-time-pickes.html"
                    >
                      <i className="material-icons-outlined">backup</i>Date
                      Pickers
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-select2.html">
                      <i className="material-icons-outlined">
                        integration_instructions
                      </i>
                      Select2
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a className="dropdown-item" href="form-repeater.html">
                      <i className="material-icons-outlined">mark_as_unread</i>
                      Form Repeater
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
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
              </li>
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
                    UI Elements
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
                      <i className="material-icons-outlined">widgets</i>Widgets
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a className="dropdown-item" href="widgets-data.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Data
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="widgets-static.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Static
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">shopping_bag</i>
                      eCommerce
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="ecommerce-products.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Products
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="ecommerce-add-product.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Add Product
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="ecommerce-customers.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Customer
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="ecommerce-customer-details.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Customer Details
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="ecommerce-orders.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Orders
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="ecommerce-order-details.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Order Details
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">free_breakfast</i>
                      Components
                    </a>
                    <ul className="dropdown-menu scroll-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-alerts.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Alerts
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-accordions.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Accordions
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-badges.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Badges
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-buttons.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Buttons
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="cards.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Cards
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-carousels.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Carousels
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-media-object.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Media Objects
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-modals.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Modals
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-navs-tabs.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Navs & Tabs
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-navbar.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Navbar
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-paginations.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Pagination
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-popovers-tooltips.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Popovers & Tooltips
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-progress-bars.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Progress
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-spinners.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Spinners
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-notifications.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Notifications
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="component-avtars-chips.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Avatrs & Chips
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">cases</i>Icons
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="icons-line-icons.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Line Icons
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="icons-boxicons.html">
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Boxicons
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="icons-feather-icons.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Feather Icons
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">pie_chart</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Charts
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="charts-apex-chart.html">
                      <i className="material-icons-outlined">leaderboard</i>Apex
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="charts-chartjs.html">
                      <i className="material-icons-outlined">analytics</i>
                      Chartjs
                    </a>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="dropdown-item dropdown-toggle dropdown-toggle-nocaret"
                      href="javascript:;"
                    >
                      <i className="material-icons-outlined">pie_chart</i>Maps
                    </a>
                    <ul className="dropdown-menu submenu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="map-google-maps.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Google Maps
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="map-vector-maps.html"
                        >
                          <i className="material-icons-outlined">
                            navigate_next
                          </i>
                          Vector Maps
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                  href="javascript:;"
                  data-bs-toggle="dropdown"
                >
                  <div className="parent-icon">
                    <i className="material-icons-outlined">table_chart</i>
                  </div>
                  <div className="menu-title d-flex align-items-center">
                    Tables
                  </div>
                  <div className="ms-auto dropy-icon">
                    <i className="material-icons-outlined">expand_more</i>
                  </div>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="table-basic-table.html">
                      <i className="material-icons-outlined">navigate_next</i>
                      Basic Table
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="table-datatable.html">
                      <i className="material-icons-outlined">navigate_next</i>
                      Data Table
                    </a>
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
