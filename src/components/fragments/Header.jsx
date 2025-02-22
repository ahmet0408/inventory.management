import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { api } from "../../env";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { logout, user } = useAuth();
  const { getCartTotals } = useCart();
  const [company, setCompany] = useState([]);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  // Fetch companies
  useEffect(() => {
    fetch(`${api}/company`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(setCompany)
      .catch((error) => setError(error.message));
  }, []);

  const LanguageSwitcher = () => {
    const { currentLanguage, changeLanguage } = useLanguage();

    const languages = [
      { code: "tk", name: "Türkmen", flag: "assets/images/county/01.svg" },
      { code: "ru", name: "Rus", flag: "assets/images/county/03.svg" },
      { code: "en", name: "Iňlis", flag: "assets/images/county/02.svg" },
    ];

    return (
      <li className="nav-item dropdown d-none d-sm-block d-md-flex">
        <a
          className="nav-link dropdown-toggle dropdown-toggle-nocaret"
          href="#"
          data-bs-toggle="dropdown"
        >
          <img
            src={languages.find((lang) => lang.code === currentLanguage)?.flag}
            width="22"
            alt=""
          />
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          {languages.map((lang) => (
            <li key={lang.code}>
              <a
                className="dropdown-item d-flex align-items-center py-2"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeLanguage(lang.code);
                }}
              >
                <img src={lang.flag} width="20" alt="" />
                <span className="ms-2">{lang.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  };
  return (
    <header className="top-header">
      <nav className="navbar navbar-expand align-items-center justify-content-between gap-4 border-bottom">
        <div
          className="logo-header d-none d-xl-flex align-items-center gap-2"
          style={{ borderRight: "none", borderLeft: "none" }}
        >
          <div className="logo-icon">
            <Link to={"/"}>
              <img
                src="assets/images/inventar.png"
                className="logo-img"
                width="140"
                alt=""
              />
            </Link>
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
        <div className="d-flex justify-content-center align-items-center text-white py-3 rounded">
          {company.length > 0 && (
            <h5 className="fw-bold text-uppercase">{company[0].name}</h5>
          )}
        </div>
        <ul className="navbar-nav gap-1 nav-right-links align-items-center">
          <LanguageSwitcher />

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative m-0"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <i className="material-icons-outlined">notifications</i>
              <span className="badge-notify">0</span>
            </a>
            <div className="dropdown-menu dropdown-notify dropdown-menu-end shadow">
              <div className="px-3 py-1 d-flex align-items-center justify-content-between border-bottom">
                <h5 className="notiy-title mb-0">{t("notifications.title")}</h5>
              </div>
              {/* <div className="notify-list">
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
              </div> */}
            </div>
          </li>
          <li className="nav-item d-md-flex">
            <Link to="/orderdetail" className="nav-link position-relative m-0">
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
                alt={t("profile.avatar")}
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
                    alt={t("profile.avatar")}
                  />
                  <h5 className="user-name mb-0 fw-bold">
                    {" "}
                    {t("profile.greeting", { name: user })}
                  </h5>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <i className="material-icons-outlined">person_outline</i>
                {t("profile.label")}
              </a>
              <hr className="dropdown-divider" />
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2 cursor-pointer"
                onClick={logout}
              >
                <i className="material-icons-outlined">power_settings_new</i>
                {t("auth.logout")}
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
