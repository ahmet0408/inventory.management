import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    department: "",
    employee: "",
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

  // Fetch products
  useEffect(() => {
    if (!isOffline) {
      fetch(`${api}/product`, { credentials: "include" })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(setProducts)
        .catch((error) => setError(error.message));
    }
  }, [isOffline]);

  // Image fetching with error handling
  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = products.map(async (product) => {
        if (!product.image) return null;

        try {
          const response = await fetch(`${api}/image/haryt/${product.image}`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Image fetch failed");

          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);

          return {
            productId: product.id,
            imageUrl: imageUrl,
          };
        } catch (error) {
          console.error(`Image fetch error for ${product.id}:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(imagePromises);
      const fetchedImages = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value) {
          acc[result.value.productId] = result.value.imageUrl;
        }
        return acc;
      }, {});

      setProductImages(fetchedImages);
    };

    if (products.length > 0) {
      fetchImages();
    }

    return () => {
      Object.values(productImages).forEach(URL.revokeObjectURL);
    };
  }, [products]);

  // Handlers remain the same...
  const handleAddProduct = () => navigate("/addproduct");
  const handleEditProduct = (productId) =>
    navigate(`/editproduct/${productId}`);
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Harydy pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(`${api}/product/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Delete operation failed");
        setProducts(products.filter((emp) => emp.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Harydy pozmak başartmady");
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
                  {productImages[item.id] ? (
                    <img
                      src={productImages[item.id]}
                      alt={item.name}
                      className="img-fluid h-100 w-100 object-fit-cover"
                    />
                  ) : (
                    <div className="bg-secondary h-100 w-100 d-flex align-items-center justify-content-center text-white">
                      No img
                    </div>
                  )}
                </div>
              </div>
              <div className="col">
                <h5 className="card-title mb-1">{item.name}</h5>
                <p className="card-text small text-muted mb-1">
                  Kategoriýa: {item.categoryName}
                </p>
                <p className="card-text small mb-1">Barkod: {item.barcode}</p>
                <p className="card-text small mb-1">Baha: {item.price} TMT</p>
                <span className="badge bg-success">Ammarda bar</span>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                onClick={() => handleEditProduct(item.id)}
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                onClick={() => handleDeleteProduct(item.id)}
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
                <th>Harydyň ady</th>
                <th>Barkod</th>
                <th>Baha</th>
                <th>Status</th>
                <th>Bölümi</th>
                <th>Degişli işgäri</th>
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
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          overflow: "hidden",
                        }}
                        className="rounded"
                      >
                        {productImages[item.id] ? (
                          <img
                            src={productImages[item.id]}
                            alt={item.name}
                            className="img-fluid h-100 w-100 object-fit-cover"
                          />
                        ) : (
                          <div className="bg-secondary h-100 w-100 d-flex align-items-center justify-content-center text-white">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="fw-bold">{item.name}</div>
                        <small className="text-muted">
                          Kategoriýa: {item.categoryName}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{item.barcode}</td>
                  <td>{item.price} TMT</td>
                  <td>
                    <span className="badge bg-success">Ammarda bar</span>
                  </td>
                  <td>{item.departmentName}</td>
                  <td>{item.employeeName}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditProduct(item.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProduct(item.id)}
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
      <Breadcrumb items={["Administrator", "Haryt", "Harytlar"]} />

      {/* Desktop header */}
      {!isMobile ? (
        <div className="row g-3">
          <div className="col-auto">
            <div className="position-relative">
              <input
                className="form-control px-5"
                type="search"
                placeholder="Harydy gözle"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">
                search
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
                Kategoriýalar
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
              >
                Bölümler
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
              >
                Işgärler
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
            <button onClick={handleAddProduct} className="btn btn-primary px-4">
              <i className="bi bi-plus-lg me-2"></i>Haryt goşmak
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
                  placeholder="Harydy gözle"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary w-100 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
              >
                <i className="bi bi-funnel me-2"></i>
                Filter
              </button>
              <button
                onClick={handleAddProduct}
                className="btn btn-success w-100"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Haryt goşmak
              </button>
            </div>
          </div>
          <MobileView />
        </div>
      )}

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
                <label className="form-label">Kategoriýa</label>
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">Ählisi</option>
                  {/* Add your categories */}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Bölüm</label>
                <select
                  className="form-select"
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                >
                  <option value="">Ählisi</option>
                  {/* Add your departments */}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Işgär</label>
                <select
                  className="form-select"
                  value={filters.employee}
                  onChange={(e) =>
                    setFilters({ ...filters, employee: e.target.value })
                  }
                >
                  <option value="">Ählisi</option>
                  {/* Add your employees */}
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
                onClick={() => {
                  setFilters({ category: "", department: "", employee: "" });
                }}
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

export default ProductList;
