import { useEffect, useState } from "react";
import { api } from "../env";
import { useCart } from "../context/CartContext";
import NestedCategories from "./NestedCategories";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // Added sort state
  const [sortOrder, setSortOrder] = useState("asc"); // Added sort order state
  const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // Added price filter
  const itemsPerPage = 12;
  const { addItem, isItemInCart } = useCart();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api}/category`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Kategoriýalary ýükläp bolmady");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${api}/product${selectedCategory ? `/getbycategory/${selectedCategory}` : ""
        }`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Harytlary ýükläp bolmady");
      }
      const data = await response.json();
      setProducts(data);

      // Fetch images for all products
      data.forEach((product) => {
        if (product.image) {
          fetchProductImages(product.image);
        }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    console.log(categoryId);
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
    setSearchTerm(""); // Clear search term
    setPriceRange({ min: "", max: "" }); // Reset price filter
  };

  // Add effect to fetch products when category changes
  useEffect(() => {
    if (!isOffline) {
      fetchAllProducts();
    }
  }, [selectedCategory]);

  // Network status effects remain the same...
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!isOffline) {
      fetchCategories();
      fetchAllProducts();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOffline]);

  // Fetch functions remain the same...
  const fetchProductImages = async (imageName) => {
    if (!imageName) return;
    try {
      const response = await fetch(`${api}/image/haryt/${imageName}`, {
        credentials: "include",
      });
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProductImages((prev) => ({
          ...prev,
          [imageName]: imageUrl,
        }));
      }
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

  // Updated product filtering logic
  const getFilteredProducts = () => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesPrice =
          (!priceRange.min || product.price >= Number(priceRange.min)) &&
          (!priceRange.max || product.price <= Number(priceRange.max));
        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case "price":
            comparison = a.price - b.price;
            break;
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          default:
            comparison = 0;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
  };

  // Updated pagination calculation
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Updated product card with consistent sizing
  const renderProductCard = (item) => (
    <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
      <div
        className="card h-100 shadow-sm border-0 rounded-4"
        onClick={() => setSelectedProduct(item)}
        style={{ cursor: "pointer" }}
      >
        <div className="position-relative">
          <div className="ratio ratio-1x1 rounded-top-4">
            {item.image ? (
              <img
                src={
                  productImages[item.image] ||
                  `${api}/image/haryt/${item.image}`
                }
                className="card-img-top object-fit-cover"
                alt={item.name}
                loading="lazy"
              />
            ) : (
              <div className="bg-light d-flex align-items-center justify-content-center">
                <i className="bi bi-image text-secondary fs-1"></i>
              </div>
            )}
          </div>
          {item.isNew && (
            <span className="position-absolute top-0 end-0 m-2 badge bg-success">
              Täze
            </span>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title mb-1 text-truncate">{item.name}</h6>
          <p className="card-text small text-muted mb-2 flex-grow-1 text-truncate">
            {item.description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fw-bold text-primary">{item.price} TMT</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(item);
              }}
              className="btn btn-primary btn-sm rounded-pill"
              disabled={isItemInCart(item.id)}
            >
              <i className="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // New filter component
  const FilterSection = () => (
    <div className="mb-4 p-3 bg-light rounded-4 shadow-sm">
      <div className="row g-3">
        <div className="col-12 col-md-2">
          <label className="form-label small">Kategoriýa</label>
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              value={
                selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : "Ähli harytlar"
              }
              disabled
            />
          </div>
        </div>
        <div className="col-12 col-md-2">
          <label className="form-label small">Baha</label>
          <select
            className="form-select form-select-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Arzandan gymmada</option>
            <option value="desc">Gymmatdan arzana</option>
          </select>
        </div>
        <div className="col-12 col-md-3 d-none d-sm-block">
          <label className="form-label small">Baha aralygy</label>
          <div className="input-group input-group-sm">
            <input
              type="number"
              className="form-control"
              placeholder=""
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
              }
            />
            <input
              type="number"
              className="form-control"
              placeholder=""
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="col-12 col-md-5 d-none d-sm-block">
          <label className="form-label small">Gözleg</label>
          <div className="input-group input-group-sm">
            <input
              type="search"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="bi bi-search position-absolute top-50 translate-middle-y end-0 me-2"></i>
          </div>
        </div>
      </div>
    </div>
  );

  // Updated pagination component
  const Pagination = () => (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination pagination-sm justify-content-center flex-wrap">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
        {[...Array(totalPages)].map((_, i) => {
          // Show first page, last page, and pages around current page
          if (
            i === 0 ||
            i === totalPages - 1 ||
            (i >= currentPage - 2 && i <= currentPage + 2)
          ) {
            return (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            );
          } else if (i === currentPage - 3 || i === currentPage + 3) {
            return (
              <li key={i} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            );
          }
          return null;
        })}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""
            }`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className="container-fluid px-4 py-3">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-none d-md-block mb-4">
          <div className="sticky-top" style={{ top: "1rem" }}>
            <NestedCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              isMobile={false}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9 col-lg-10">
          {/* Fixed position search bar for mobile */}
          <div className="sticky-top bg-white pt-3 pb-3 mb-3 d-md-none">
            <div className="d-flex gap-2 px-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <i className="bi bi-list"></i>
              </button>
              <div className="position-relative flex-grow-1">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Gözleg..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="bi bi-search position-absolute top-50 translate-middle-y end-0 me-2"></i>
              </div>
            </div>
          </div>

          <FilterSection />

          {/* Products grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Ýüklenýär...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger rounded-4" role="alert">
              {error}
            </div>
          ) : currentItems.length > 0 ? (
            <div className="row g-3">{currentItems.map(renderProductCard)}</div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-muted"></i>
              <h5 className="mt-3">Haryt tapylmady</h5>
              <p className="text-muted">
                Başga gözleg sözi ýa-da kategoriýa saýlaň
              </p>
            </div>
          )}

          {totalPages > 1 && <Pagination />}
        </div>
      </div>

      {/* Mobile category menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 h-100 bg-white shadow"
            style={{
              width: "280px",
              zIndex: 1050,
              transform: "translateX(0)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <div className="d-flex flex-column h-100">
              <div className="p-3 text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Kategoriýalar</h6>
                <button
                  className="btn btn-link text-white p-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="overflow-auto flex-grow-1 p-3">
                <NestedCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={(categoryId) => {
                    handleCategorySelect(categoryId);
                    setIsMobileMenuOpen(false);
                  }}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        </>
      )}      

      {/* Product modal */}
      {/* {selectedProduct && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="ratio ratio-1x1 rounded-4 bg-light overflow-hidden">
                      {selectedProduct.image ? (
                        <img
                          src={
                            productImages[selectedProduct.image] ||
                            `${api}/image/haryt/${selectedProduct.image}`
                          }
                          className="object-fit-cover"
                          alt={selectedProduct.name}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center">
                          <i className="bi bi-image-fill text-secondary display-1"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-3">{selectedProduct.name}</h4>
                    <p className="text-muted mb-4">
                      {selectedProduct.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="text-primary mb-0">
                        {selectedProduct.price} TMT
                      </h3>
                      {selectedProduct.isNew && (
                        <span className="badge bg-success">Täze</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addItem(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="btn btn-primary w-100 rounded-pill"
                      disabled={isItemInCart(selectedProduct.id)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Sebede goş
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setSelectedProduct(null)}
          ></div>
        </div>
      )}       */}

{selectedProduct && (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered modal-xl">
      <div className="modal-content border-0 rounded-4 shadow">
        <div className="modal-header border-0 bg-light rounded-top-4">
          <h5 className="modal-title fw-bold">
            <i className="bi bi-box-seam me-2 text-primary"></i>
            Haryt maglumaty
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setSelectedProduct(null)}
          ></button>
        </div>
        <div className="modal-body p-4">
          <div className="row g-4">
            {/* Left column - Image */}
            <div className="col-lg-5">
              <div className="position-relative">
                <div className="ratio ratio-1x1 rounded-4 bg-light overflow-hidden shadow-sm">
                  {selectedProduct.image ? (
                    <img
                      src={
                        productImages[selectedProduct.image] ||
                        `${api}/image/haryt/${selectedProduct.image}`
                      }
                      className="object-fit-cover"
                      alt={selectedProduct.name}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="bi bi-image-fill text-secondary display-1"></i>
                    </div>
                  )}
                </div>
                {selectedProduct.amount > 0 ? (
                  <span className="position-absolute top-0 end-0 m-3 badge bg-success px-3 py-2 rounded-pill">
                    <i className="bi bi-check-circle me-1"></i>
                    Stokda bar
                  </span>
                ) : (
                  <span className="position-absolute top-0 end-0 m-3 badge bg-danger px-3 py-2 rounded-pill">
                    <i className="bi bi-x-circle me-1"></i>
                    Stokda ýok
                  </span>
                )}
              </div>
            </div>

            {/* Right column - Product details */}
            <div className="col-lg-7">
              <div className="d-flex flex-column h-100">
                {/* Basic info section */}
                <div className="mb-4">
                  <h3 className="fw-bold mb-2">{selectedProduct.name}</h3>
                  <p className="text-muted mb-3">{selectedProduct.description}</p>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <h2 className="text-primary mb-0 fw-bold">
                      {selectedProduct.price} TMT
                    </h2>
                  </div>
                </div>

                {/* Details card */}
                <div className="card border-0 bg-light rounded-4 shadow-sm mb-4">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-info-circle me-2"></i>
                      Jikme-jik maglumat
                    </h6>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">Barkod:</div>
                          <div className="ms-2 fw-medium">{selectedProduct.barcode}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">Kategoriýa:</div>
                          <div className="ms-2 fw-medium">{selectedProduct.categoryName}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">Bölüm:</div>
                          <div className="ms-2 fw-medium">{selectedProduct.departmentName}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">Jogapkär işgär:</div>
                          <div className="ms-2 fw-medium">{selectedProduct.employeeName}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">Mukdary:</div>
                          <div className="ms-2 fw-medium">{selectedProduct.amount} sany</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-auto">
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      onClick={() => {
                        addItem(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="btn btn-primary btn-lg flex-grow-1 rounded-pill"
                      disabled={isItemInCart(selectedProduct.id)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Sebede goş
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal-backdrop fade show"
      onClick={() => setSelectedProduct(null)}
    ></div>
  </div>
)}
    </div>
  );
};

export default Products;
