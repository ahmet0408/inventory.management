import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    address: "",
  });
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

  // Fetch departments
  useEffect(() => {
    if (!isOffline) {
      fetch(`${api}/department`, { credentials: "include" })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(setDepartments)
        .catch((error) => setError(error.message));
    }
  }, [isOffline]);

  // Handlers
  const handleAddDepartment = () => navigate("/adddepartment");
  const handleEditDepartment = (departmentId) =>
    navigate(`/editdepartment/${departmentId}`);
  const handleDeleteDepartment = async (departmentId) => {
    if (window.confirm("Bölümi pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(`${api}/department/${departmentId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Delete operation failed");
        setDepartments(departments.filter((dep) => dep.id !== departmentId));
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Bölümi pozmak başartmady");
      }
    }
  };

  const filteredDepartments = departments.filter((department) => {
    return department.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Mobile view
  const MobileView = () => (
    <>
      {currentItems.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <div className="row g-3">
              <div className="col">
                <h5 className="card-title mb-1">{item.name}</h5>
                <p className="card-text small mb-1">Salgysy: {item.address}</p>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                onClick={() => handleEditDepartment(item.id)}
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                onClick={() => handleDeleteDepartment(item.id)}
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
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th>Bölümiň ady</th>
                <th>Salgysy</th>
                <th>Operasiýalar</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input className="form-check-input" type="checkbox" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditDepartment(item.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteDepartment(item.id)}
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
      <Breadcrumb items={["Administrator", "Bölüm", "Bölümler"]} />

      {/* Desktop header */}
      {!isMobile ? (
        <div className="row g-3">
          <div className="col-auto">
            <div className="position-relative">
              <input
                className="form-control px-5"
                type="search"
                placeholder="Bölümi gözle"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className=" position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="col-auto flex-grow-1">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
              >
                Salgylar
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-auto">
            <button
              onClick={handleAddDepartment}
              className="btn btn-primary px-4"
              style={{ background: "#023047" }}
            >
              <i className="bi bi-plus-lg me-2"></i>Bölüm goş
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
                  placeholder="Bölümi gözle"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12">
              <button
                style={{ background: "#023047" }}
                className="btn btn-primary w-100 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
              >
                <i className="bi bi-funnel me-2"></i>Filter
              </button>
              <button
                style={{ background: "#023047" }}
                onClick={handleAddDepartment}
                className="btn btn-success w-100"
              >
                <i className="bi bi-plus-lg me-2"></i>Bölüm goş
              </button>
            </div>
          </div>
          <MobileView />
        </div>
      )}

      {/* Filter Modal */}
      <div className="modal fade" id="filterModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filtrleme</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Salgy</label>
                <select
                  className="form-select"
                  value={filters.address}
                  onChange={(e) =>
                    setFilters({ ...filters, address: e.target.value })
                  }
                >
                  <option value="">Ählisi</option>
                  {/* Add your addresses */}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Ýap
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setFilters({ address: "" })}
              >
                Arassala
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on device */}
      {!isMobile ? <DesktopView /> : ""}

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

export default DepartmentList;
