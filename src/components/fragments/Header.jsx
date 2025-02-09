import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
const Header = () => {
  const { logout, user } = useAuth();
  const { getCartTotals } = useCart();
  return (
    <header className="top-header">
      <nav className="navbar navbar-expand align-items-center justify-content-between gap-4 border-bottom">
        <div className="logo-header d-none d-xl-flex align-items-center gap-2">
          <div className="logo-icon">
            <Link to={"/"}>
              <img
                src="assets/images/logo.ico"
                className="logo-img"
                width="65"
                alt=""
              />
            </Link>
          </div>
          <div className="logo-name mt-1">
            <h6 className="mb-0">Inwentar</h6>
          </div>
        </div>
        <div
          className="btn-toggle d-xl-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <i className="material-icons-outlined">menu</i>
          </a>
        </div>
        <div className="search-bar">
          <div className="position-relative">
            <input
              className="form-control rounded-5 px-5 search-control d-lg-block d-none"
              type="text"
              placeholder="Gözle"
            />
            <span className="material-icons-outlined position-absolute d-lg-block d-none ms-3 translate-middle-y start-0 top-50">
              search
            </span>
            <span className="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 search-close">
              close
            </span>
            <div className="search-popup p-3">
              <div className="card rounded-4 overflow-hidden">
                <div className="card-header d-lg-none">
                  <div className="position-relative">
                    <input
                      className="form-control rounded-5 px-5 mobile-search-control"
                      type="text"
                      placeholder="Search"
                    />
                    <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50">
                      search
                    </span>
                    <span className="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 mobile-search-close">
                      close
                    </span>
                  </div>
                </div>
                <div className="card-body search-content">
                  <p className="search-title">Recent Searches</p>
                  <div className="d-flex align-items-start flex-wrap gap-2 kewords-wrapper">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="kewords"
                    >
                      <span>Angular Template</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="kewords"
                    >
                      <span>Dashboard</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="kewords"
                    >
                      <span>Admin Template</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="kewords"
                    >
                      <span>Bootstrap 5 Admin</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="kewords"
                    >
                      <span>Html eCommerce</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a onClick={(e) => e.preventDefault()} className="kewords">
                      <span>Sass</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="kewords"
                    >
                      <span>laravel 9</span>
                      <i className="material-icons-outlined fs-6">search</i>
                    </a>
                  </div>
                  <hr />
                  <p className="search-title">Tutorials</p>
                  <div className="search-list d-flex flex-column gap-2">
                    <div className="search-list-item d-flex align-items-center gap-3">
                      <div className="list-icon">
                        <i className="material-icons-outlined fs-5">
                          play_circle
                        </i>
                      </div>
                      <div className="">
                        <h5 className="mb-0 search-list-title ">
                          Wordpress Tutorials
                        </h5>
                      </div>
                    </div>
                    <div className="search-list-item d-flex align-items-center gap-3">
                      <div className="list-icon">
                        <i className="material-icons-outlined fs-5">
                          shopping_basket
                        </i>
                      </div>
                      <div className="">
                        <h5 className="mb-0 search-list-title">
                          eCommerce Website Tutorials
                        </h5>
                      </div>
                    </div>

                    <div className="search-list-item d-flex align-items-center gap-3">
                      <div className="list-icon">
                        <i className="material-icons-outlined fs-5">laptop</i>
                      </div>
                      <div className="">
                        <h5 className="mb-0 search-list-title">
                          Responsive Design
                        </h5>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <p className="search-title">Members</p>

                  <div className="search-list d-flex flex-column gap-2">
                    <div className="search-list-item d-flex align-items-center gap-3">
                      <div className="memmber-img">
                        <img
                          src="assets/images/avatars/01.jpg"
                          width="32"
                          height="32"
                          className="rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="mb-0 search-list-title ">
                          Andrew Stark
                        </h5>
                      </div>
                    </div>

                    <div className="search-list-item d-flex align-items-center gap-3">
                      <div className="memmber-img">
                        <img
                          src="assets/images/avatars/02.png"
                          width="32"
                          height="32"
                          className="rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="mb-0 search-list-title ">
                          Snetro Jhonia
                        </h5>
                      </div>
                    </div>

                    <div className="search-list-item d-flex align-items-center gap-3">
                      <div className="memmber-img">
                        <img
                          src="assets/images/avatars/03.png"
                          width="32"
                          height="32"
                          className="rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="mb-0 search-list-title">Michle Clark</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-center bg-transparent">
                  <a onClick={(e) => e.preventDefault()} className="btn w-100">
                    See All Search Results
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="navbar-nav gap-1 nav-right-links align-items-center">
          <li className="nav-item d-lg-none mobile-search-btn">
            <a
              className="nav-link"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="material-icons-outlined">search</i>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret"
              href="avascript:;"
              data-bs-toggle="dropdown"
            >
              <img src="assets/images/county/02.png" width="22" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/01.png" width="20" alt="" />
                  <span className="ms-2">English</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/02.png" width="20" alt="" />
                  <span className="ms-2">Catalan</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/03.png" width="20" alt="" />
                  <span className="ms-2">French</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/04.png" width="20" alt="" />
                  <span className="ms-2">Belize</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/05.png" width="20" alt="" />
                  <span className="ms-2">Colombia</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/06.png" width="20" alt="" />
                  <span className="ms-2">Spanish</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/07.png" width="20" alt="" />
                  <span className="ms-2">Georgian</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center py-2"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src="assets/images/county/08.png" width="20" alt="" />
                  <span className="ms-2">Hindi</span>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown position-static  d-md-flex d-none">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="material-icons-outlined">done_all</i>
            </a>
            <div className="dropdown-menu dropdown-menu-end mega-menu shadow-lg p-4 p-lg-5">
              <div className="mega-menu-widgets">
                <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4 g-lg-5">
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <div className="mega-menu-icon flex-shrink-0 bg-danger">
                            <i className="material-icons-outlined">
                              question_answer
                            </i>
                          </div>
                          <div className="mega-menu-content">
                            <h5>Marketing</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/02.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Website</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/03.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Subscribers</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/01.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Hubspot</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/11.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Templates</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/13.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Ebooks</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/12.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Sales</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/08.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Tools</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card rounded-4 shadow-none border mb-0">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            src="assets/images/megaIcons/09.png"
                            width="40"
                            alt=""
                          />
                          <div className="mega-menu-content">
                            <h5>Academy</h5>
                            <p className="mb-0 f-14">
                              In publishing and graphic design, Lorem ipsum is a
                              placeholder text commonly used to demonstrate the
                              visual form of a document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="material-icons-outlined">apps</i>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-apps shadow-lg p-3">
              <div className="border rounded-4 overflow-hidden">
                <div className="row row-cols-3 g-0 border-bottom">
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/01.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Gmail</p>
                      </div>
                    </div>
                  </div>
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/02.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Skype</p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/03.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Slack</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row-cols-3 g-0 border-bottom">
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/04.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">YouTube</p>
                      </div>
                    </div>
                  </div>
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/05.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Google</p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/06.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Instagram</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row-cols-3 g-0 border-bottom">
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/07.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Spotify</p>
                      </div>
                    </div>
                  </div>
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/08.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Yahoo</p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/09.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Facebook</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row-cols-3 g-0">
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/10.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Figma</p>
                      </div>
                    </div>
                  </div>
                  <div className="col border-end">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/11.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Paypal</p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="app-wrapper d-flex flex-column gap-2 text-center">
                      <div className="app-icon">
                        <img
                          src="assets/images/apps/12.png"
                          width="36"
                          alt=""
                        />
                      </div>
                      <div className="app-name">
                        <p className="mb-0">Photo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="material-icons-outlined">notifications</i>
              <span className="badge-notify">5</span>
            </a>
            <div className="dropdown-menu dropdown-notify dropdown-menu-end shadow">
              <div className="px-3 py-1 d-flex align-items-center justify-content-between border-bottom">
                <h5 className="notiy-title mb-0">Notifications</h5>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle dropdown-toggle-nocaret option"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="material-icons-outlined">more_vert</span>
                  </button>
                  <div className="dropdown-menu dropdown-option dropdown-menu-end shadow">
                    <div>
                      <a
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="material-icons-outlined fs-6">
                          inventory_2
                        </i>
                        Archive All
                      </a>
                    </div>
                    <div>
                      <a
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="material-icons-outlined fs-6">done_all</i>
                        Mark all as read
                      </a>
                    </div>
                    <div>
                      <a
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="material-icons-outlined fs-6">mic_off</i>
                        Disable Notifications
                      </a>
                    </div>
                    <div>
                      <a
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="material-icons-outlined fs-6">grade</i>
                        What's new ?
                      </a>
                    </div>
                    <div>
                      <hr className="dropdown-divider" />
                    </div>
                    <div>
                      <a
                        className="dropdown-item d-flex align-items-center gap-2 py-2"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="material-icons-outlined fs-6">
                          leaderboard
                        </i>
                        Reports
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="notify-list">
                <div>
                  <a
                    className="dropdown-item border-bottom py-2"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="">
                        <img
                          src="assets/images/avatars/01.jpg"
                          className="rounded-circle"
                          width="45"
                          height="45"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="notify-title">Congratulations Jhon</h5>
                        <p className="mb-0 notify-desc">
                          Many congtars jhon. You have won the gifts.
                        </p>
                        <p className="mb-0 notify-time">Today</p>
                      </div>
                      <div className="notify-close position-absolute end-0 me-3">
                        <i className="material-icons-outlined fs-6">close</i>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    className="dropdown-item border-bottom py-2"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="user-wrapper bg-primary text-primary bg-opacity-10">
                        <span>RS</span>
                      </div>
                      <div className="">
                        <h5 className="notify-title">New Account Created</h5>
                        <p className="mb-0 notify-desc">
                          From USA an user has registered.
                        </p>
                        <p className="mb-0 notify-time">Yesterday</p>
                      </div>
                      <div className="notify-close position-absolute end-0 me-3">
                        <i className="material-icons-outlined fs-6">close</i>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    className="dropdown-item border-bottom py-2"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="">
                        <img
                          src="assets/images/apps/13.png"
                          className="rounded-circle"
                          width="45"
                          height="45"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="notify-title">Payment Recived</h5>
                        <p className="mb-0 notify-desc">
                          New payment recived successfully
                        </p>
                        <p className="mb-0 notify-time">1d ago</p>
                      </div>
                      <div className="notify-close position-absolute end-0 me-3">
                        <i className="material-icons-outlined fs-6">close</i>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    className="dropdown-item border-bottom py-2"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="">
                        <img
                          src="assets/images/apps/14.png"
                          className="rounded-circle"
                          width="45"
                          height="45"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="notify-title">New Order Recived</h5>
                        <p className="mb-0 notify-desc">
                          Recived new order from michle
                        </p>
                        <p className="mb-0 notify-time">2:15 AM</p>
                      </div>
                      <div className="notify-close position-absolute end-0 me-3">
                        <i className="material-icons-outlined fs-6">close</i>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    className="dropdown-item border-bottom py-2"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="">
                        <img
                          src="assets/images/avatars/06.png"
                          className="rounded-circle"
                          width="45"
                          height="45"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h5 className="notify-title">Congratulations Jhon</h5>
                        <p className="mb-0 notify-desc">
                          Many congtars jhon. You have won the gifts.
                        </p>
                        <p className="mb-0 notify-time">Today</p>
                      </div>
                      <div className="notify-close position-absolute end-0 me-3">
                        <i className="material-icons-outlined fs-6">close</i>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    className="dropdown-item py-2"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="user-wrapper bg-danger text-danger bg-opacity-10">
                        <span>PK</span>
                      </div>
                      <div className="">
                        <h5 className="notify-title">New Account Created</h5>
                        <p className="mb-0 notify-desc">
                          From USA an user has registered.
                        </p>
                        <p className="mb-0 notify-time">Yesterday</p>
                      </div>
                      <div className="notify-close position-absolute end-0 me-3">
                        <i className="material-icons-outlined fs-6">close</i>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item d-md-flex d-none">
            <Link to="/orderdetail" className="nav-link position-relative">
              <i className="material-icons-outlined">shopping_cart</i>
              <span className="badge-notify">{getCartTotals().itemCount}</span>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              href="#"
              className="dropdown-toggle dropdown-toggle-nocaret"
              data-bs-toggle="dropdown"
            >
              <img
                src="assets/images/avatars/01.jpg"
                className="rounded-circle p-1 border"
                width="45"
                height="45"
                alt=""
              />
            </a>
            <div className="dropdown-menu dropdown-user dropdown-menu-end shadow">
              <a
                className="dropdown-item  gap-2 py-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <div className="text-center">
                  <img
                    src="assets/images/avatars/01.jpg"
                    className="rounded-circle p-1 shadow mb-3"
                    width="90"
                    height="90"
                    alt=""
                  />
                  <h5 className="user-name mb-0 fw-bold">Hello, {user}</h5>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <i className="material-icons-outlined">person_outline</i>Profil
              </a>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <i className="material-icons-outlined">local_bar</i>Halanlarym
              </a>
              <hr className="dropdown-divider" />
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2 cursor-pointer"
                onClick={logout}
              >
                <i className="material-icons-outlined">power_settings_new</i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
