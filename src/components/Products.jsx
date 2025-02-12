import { useEffect, useState } from "react";
import { api } from "../env";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 12;
  const { addItem, isItemInCart } = useCart();

  // Harytlaryň suratlaryny getirmek üçin funksiýa
  const fetchProductImages = async (productId) => {
    try {
      const response = await fetch(`${api}/image/haryt/${productId}`, {
        credentials: "include",
      });
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProductImages((prev) => ({
          ...prev,
          [productId]: imageUrl,
        }));
      }
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

  // Kategoriýa saýlananda işleýän funksiýa
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchTerm("");
    setHoveredCategory(null);
  };

  useEffect(() => {
    if (!isOffline) {
      fetchCategories();
    }
  }, [isOffline]);

  useEffect(() => {
    if (!isOffline) {
      if (selectedCategory) {
        fetchProductsByCategory(selectedCategory);
      } else {
        fetchAllProducts();
      }
    }
  }, [selectedCategory, isOffline]);

  // Harytlar üýtgände, olaryň suratlaryny getirmek
  useEffect(() => {
    products.forEach((product) => {
      if (!productImages[product.id]) {
        fetchProductImages(product.id);
      }
    });
  }, [products]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${api}/category`, {
        credentials: "include",
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${api}/product`, {
        credentials: "include",
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `${api}/category/GetByCategory/${categoryId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Product Modal Component
  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <>
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered product-modal">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">{product.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    {productImages[product.id] ? (
                      <img
                        src={productImages[product.id]}
                        className="img-fluid rounded"
                        alt={product.name}
                      />
                    ) : (
                      <div
                        className="bg-light rounded d-flex align-items-center justify-content-center"
                        style={{ height: "300px" }}
                      >
                        <i className="bi bi-image-fill text-secondary fs-1"></i>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h3 className="fs-4 mb-3">{product.name}</h3>
                    <p className="text-muted mb-4">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="text-primary mb-0">{product.price} TMT</h4>
                      {product.isNew && (
                        <span className="badge bg-success">Täze</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addItem(product);
                        onClose();
                      }}
                      className="btn btn-primary w-100"
                      disabled={isItemInCart(product.id)}
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
        <div className="modal-backdrop fade show" onClick={onClose}></div>
      </>
    );
  };

  // Kategoriýalary görkezmek üçin rekursiw funksiýa
  const renderCategoryItem = (category) => {
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div
        key={category.id}
        className="category-item position-relative"
        onMouseEnter={() => setHoveredCategory(category.id)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div
          className={`d-flex align-items-center p-2 cursor-pointer rounded ${
            selectedCategory === category.id
              ? "bg-primary text-white"
              : "text-dark hover:bg-gray-100"
          }`}
          onClick={() => handleCategorySelect(category.id)}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-folder me-2"></i>
          <span>{category.name}</span>
          {hasChildren && <i className="bi bi-chevron-right ms-auto"></i>}
        </div>

        {hasChildren && hoveredCategory === category.id && (
          <div
            className="category-dropdown position-absolute start-100 top-0 ms-2 p-2"
            style={{
              minWidth: "200px",
              backgroundColor: "white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              zIndex: 1000,
            }}
          >
            {category.children.map((child) => renderCategoryItem(child))}
          </div>
        )}
      </div>
    );
  };

  // Gözleg we sahypa logikasy
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="d-flex h-100">
      {/* Kategoriýalar bölümi */}
      <div
        className="categories-sidebar border-end bg-light"
        style={{ width: "250px", minHeight: "calc(100vh - 60px)" }}
      >
        <div className="p-3 border-bottom bg-white">
          <h6 className="mb-0">Kategoriýalar</h6>
        </div>
        <div className="p-2">
          <div
            className={`category-item d-flex align-items-center p-2 cursor-pointer mb-2 rounded ${
              !selectedCategory
                ? "bg-primary text-white"
                : "text-dark hover:bg-gray-100"
            }`}
            onClick={() => handleCategorySelect(null)}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-grid me-2"></i>
            <span>Ähli harytlar</span>
          </div>
          {categories
            .filter((category) => !category.parentId)
            .map(renderCategoryItem)}
        </div>
      </div>

      {/* Harytlar bölümi */}
      <div className="flex-grow-1 p-3">
        {/* Gözleg we ýokary bölüm */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name ||
                  "Harytlar"
                : "Ähli harytlar"}
            </h5>
            <div className="position-relative" style={{ width: "250px" }}>
              <input
                className="form-control form-control-sm px-4"
                type="search"
                placeholder="Gözle"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="bi bi-search position-absolute start-0 top-50 translate-middle-y ms-2"></i>
            </div>
          </div>
        </div>

        {/* Harytlar grid */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
          {currentItems.map((item) => (
            <div key={item.id} className="col">
              <div
                className="card product-card h-100 rounded-3 border-0 shadow-sm"
                onClick={() => setSelectedProduct(item)}
                style={{ cursor: "pointer" }}
              >
                <div className="position-relative">
                  <div className="ratio ratio-1x1 rounded-top-3 bg-light overflow-hidden">
                    {productImages[item.id] ? (
                      <img
                        src={productImages[item.id]}
                        className="object-fit-cover"
                        alt={item.name}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center bg-light">
                        <i className="bi bi-image-fill text-secondary"></i>
                      </div>
                    )}
                  </div>
                  {item.isNew && (
                    <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                      Täze
                    </span>
                  )}
                </div>
                <div className="card-body p-2">
                  <h6 className="card-title mb-1 fs-6 text-truncate">
                    {item.name}
                  </h6>
                  <p className="card-text text-muted small mb-2 text-truncate">
                    {item.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">
                      {item.price} TMT
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(item);
                      }}
                      className="btn btn-primary btn-sm"
                      disabled={isItemInCart(item.id)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Haryt tapylmady ýagdaýy */}
        {currentItems.length === 0 && (
          <div className="text-center py-4">
            <i className="bi bi-search display-4 text-muted"></i>
            <h5 className="mt-3">Haryt tapylmady</h5>
            <p className="text-muted small">
              Başga gözleg sözi ýa-da kategoriýa saýlaň
            </p>
          </div>
        )}

        {/* Sahypalama */}
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination pagination-sm justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
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
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
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

        {/* Haryt modaly */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
