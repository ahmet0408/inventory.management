import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [companyImages, setCompanyImages] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch companies
  useEffect(() => {
    if (!isOffline) {
      fetch(`${api}/company`, { credentials: "include" })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(setCompanies)
        .catch((error) => setError(error.message));
    }
  }, [isOffline]);

  // Image fetching
  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = companies.map(async (company) => {
        if (!company.logo) return null;

        try {
          const response = await fetch(`${api}/image/company/${company.logo}`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Image fetch failed");

          const blob = await response.blob();
          return {
            companyId: company.id,
            imageUrl: URL.createObjectURL(blob),
          };
        } catch (error) {
          console.error(`Image fetch error for ${company.id}:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(imagePromises);
      const fetchedImages = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value) {
          acc[result.value.companyId] = result.value.imageUrl;
        }
        return acc;
      }, {});

      setCompanyImages(fetchedImages);
    };

    if (companies.length > 0) {
      fetchImages();
    }

    return () => {
      Object.values(companyImages).forEach(URL.revokeObjectURL);
    };
  }, [companies]);

  const handleAddCompany = () => navigate("/addcompany");
  const handleEditCompany = (companyId) =>
    navigate(`/editcompany/${companyId}`);
  const handleDeleteCompany = async (companyId) => {
    if (window.confirm("Kompaniýa maglumatlary pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(`${api}/company/${companyId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Delete operation failed");
        setCompanies(companies.filter((comp) => comp.id !== companyId));
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Kompaniýa maglumatlaryny pozmak başartmady");
      }
    }
  };

  const filteredCompanies = companies.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  // Mobile view
  const MobileView = () => (
    <>
      {currentItems.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-auto">
                <div
                  style={{ width: "80px", height: "80px", overflow: "hidden" }}
                  className="rounded"
                >
                  {companyImages[item.id] ? (
                    <img
                      src={companyImages[item.id]}
                      alt={item.name}
                      className="img-fluid h-100 w-100 object-fit-cover rounded-circle"
                    />
                  ) : (
                    <div className="bg-secondary h-100 w-100 d-flex align-items-center justify-content-center text-white rounded-circle">
                      No img
                    </div>
                  )}
                </div>
              </div>
              <div className="col">
                <h5 className="card-title mb-1">{item.name}</h5>
                <p className="card-text small mb-1">{item.description}</p>
                <p className="card-text small mb-1">Salgy: {item.address}</p>
                <p className="card-text small mb-1">
                  <i className="bi bi-telephone me-1"></i>
                  {item.phone}
                </p>
                <p className="card-text small mb-1">
                  <i className="bi bi-envelope me-1"></i>
                  {item.email}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                onClick={() => handleEditCompany(item.id)}
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                onClick={() => handleDeleteCompany(item.id)}
                className="btn btn-sm btn-outline-danger"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  // Desktop view
  const DesktopView = () => (
    <div className="card mt-4">
      <div className="card-body">
        <div className="table-responsive white-space-nowrap">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th>Ady</th>
                <th>Kompaniýa barada</th>
                <th>Salgysy</th>
                <th>Telefon</th>
                <th>Mail</th>
                <th>Operasiýalar</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input className="form-check-input" type="checkbox" />
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="customer-pic">
                        {companyImages[item.id] ? (
                          <img
                            src={companyImages[item.id]}
                            alt={item.name}
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <div
                            className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white"
                            style={{ width: "40px", height: "40px" }}
                          >
                            No img
                          </div>
                        )}
                      </div>
                      <p className="mb-0 customer-name fw-bold">{item.name}</p>
                    </div>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditCompany(item.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCompany(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumb
        items={["Administrator", "Kompaniýa", "Kompaniýa maglumatlary"]}
      />

      {/* Header section */}
      {!isMobile ? (
        <div className="row g-3">
          <div className="col-auto">
            <div className="position-relative">
              <input
                className="form-control px-5"
                type="search"
                placeholder="Gözle"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">
                search
              </span>
            </div>
          </div>
          <div className="col-auto flex-grow-1"></div>
          <div className="col-auto">
            <button
              onClick={handleAddCompany}
              className="btn btn-primary px-4"
              style={{ background: "#023047" }}
            >
              <i className="bi bi-plus-lg me-2"></i>Kompaniýa maglumatlary goş
            </button>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-3">
          <div className="row g-3">
            <div className="col-12 m-0">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Gözle"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <button
                onClick={handleAddCompany}
                style={{ background: "#023047" }}
                className="btn btn-primary w-100"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Kompaniýa maglumatlary goş
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {!isMobile ? <DesktopView /> : <MobileView />}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Yza
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Öňe
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default CompanyList;
