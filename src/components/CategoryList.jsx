import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
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

  // Fetch categories
  useEffect(() => {
    if (!isOffline) {
      fetch(`${api}/category`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(setCategories)
        .catch((error) => setError(error.message));
    }
  }, [isOffline]);

  const handleAddCategory = () => navigate("/addcategory");
  const handleEditCategory = (categoryId) =>
    navigate(`/editcategory/${categoryId}`);
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Kategoriýany pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(`${api}/category/${categoryId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Delete operation failed");
        }

        setCategories(categories.filter((cat) => cat.id !== categoryId));
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Kategoriýany pozmak başartmady");
      }
    }
  };

  const filteredCategories = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Mobile view
  const MobileView = () => (
    <>
      {currentItems.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title mb-2">{item.name}</h5>
                <p className="card-text small mb-1">
                  <i className="bi bi-sort-numeric-down me-2"></i>
                  Tertibi: {item.order}
                </p>
                {item.parentCategory && (
                  <p className="card-text small mb-1">
                    <i className="bi bi-diagram-2 me-2"></i>
                    Esasy kategoriýa: {item.parentCategory}
                  </p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                onClick={() => handleEditCategory(item.id)}
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                onClick={() => handleDeleteCategory(item.id)}
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
                <th>Tertibi</th>
                <th>Haýsy kategoriýa degişli?</th>
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
                  <td>{item.order}</td>
                  <td>{item.parentCategory || "-"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditCategory(item.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCategory(item.id)}
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
      <Breadcrumb items={["Administrator", "Kategoriýa", "Kategoriýalar"]} />

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
              <span className=" position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="col-auto flex-grow-1"></div>
          <div className="col-auto">
            <button
              onClick={handleAddCategory}
              className="btn btn-primary px-4"
              style={{ background: "#023047" }}
            >
              <i className="bi bi-plus-lg me-2"></i>Kategoriýa goş
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
                onClick={handleAddCategory}
                style={{ background: "#023047" }}
                className="btn btn-primary w-100"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Kategoriýa goş
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {error ? (
        <div className="alert alert-danger mt-4">
          Maglumatlary ýüklemekde ýalňyşlyk: {error}
        </div>
      ) : !isMobile ? (
        <DesktopView />
      ) : (
        <MobileView />
      )}

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

export default CategoryList;
