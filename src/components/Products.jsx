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
  const [hoveredCategories, setHoveredCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemsPerPage = 12;
  const { addItem, isItemInCart } = useCart();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!isOffline) {
      fetchCategories();
      fetchAllProducts();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOffline]);

  // Harytlaryň suratlaryny getirmek üçin funksiýa
  const fetchProductImages = async (imageName) => {
    if (!imageName) return; // Skip if no imageName is provided
    
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

  // Kategoriýa saýlananda işleýän funksiýa
  const handleCategorySelect = async (categoryId) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchTerm("");
    setHoveredCategories([]);
    
    try {
      if (categoryId) {
        await fetchProductsByCategory(categoryId);
      } else {
        await fetchAllProducts();
      }
    } catch (error) {
      console.error("Error in category selection:", error);
      setError("Harytlary ýükläp bolmady: " + error.message);
      setProducts([]); // Clear products on error
    } finally {
      setLoading(false);
    }
  };

  // Harytlar üýtgände, olaryň suratlaryny getirmek
  useEffect(() => {
    products.forEach((product) => {
      if (product.imageName && !productImages[product.imageName]) {
        fetchProductImages(product.imageName);
      }
    });
  }, [products]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${api}/category`, {
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw categories:', data);
      
      // Transform the flat category list into a hierarchical structure
      const transformedCategories = transformCategories(data);
      console.log('Transformed categories:', transformedCategories);
      
      setCategories(transformedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Kategoriýalary ýükläp bolmady: " + error.message);
      setCategories([]);
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

  // Modified fetchProductsByCategory function
  const fetchProductsByCategory = async (categoryId, retryCount = 2) => {
    try {
      console.log(categoryId);
      const response = await fetch(
        `${api}/product/GetByCategory/${categoryId}`,
        {
          credentials: "include",
          headers: {
            "Accept": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Bu kategoriýada haryt ýok");
          setProducts([]);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching products by category:", error);
      
      // Retry logic for network errors
      if (retryCount > 0 && !isOffline) {
        console.log(`Retrying... ${retryCount} attempts left`);
        await fetchProductsByCategory(categoryId, retryCount - 1);
        return;
      }
      
      setError("Harytlary ýükläp bolmady: " + error.message);
      setProducts([]); // Clear products on error
    }
  };

  // Updated product card rendering for mobile
  const renderProductCard = (item) => (
    <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
      <div
        className="card product-card h-100 rounded-4 border-0 shadow-sm"
        onClick={() => setSelectedProduct(item)}
        style={{ cursor: "pointer" }}
      >
        <div className="position-relative">
          <div className="ratio ratio-1x1 rounded-top-4 bg-light overflow-hidden">
            {item.image ? (
              <img
                src={productImages[item.image] || `${api}/image/haryt/${item.image}`}
                className="object-fit-cover"
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-light">
                <i className="bi bi-image-fill text-secondary"></i>
              </div>
            )}
          </div>
          {item.isNew && (
            <span className="position-absolute top-0 end-0 m-2 badge bg-success rounded-pill">
              Täze
            </span>
          )}
        </div>
        <div className="card-body p-3">
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
                    {product.image ? (
                      <img
                        src={productImages[product.image] || `${api}/image/haryt/${product.image}`}
                        className="img-fluid rounded"
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = ""; // Add a default image path here if needed
                        }}
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

  // Modified category hover handling
  const handleCategoryHover = (categoryId, isEntering) => {
    if (isEntering) {
      setHoveredCategories(prev => [...prev, categoryId]);
    } else {
      setTimeout(() => {
        setHoveredCategories(prev => prev.filter(id => id !== categoryId));
      }, 100);
    }
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

  // Transform flat categories into hierarchical structure
  const renderCategoryItem = (category) => {
    const hasChildren = category.children && category.children.length > 0;
    const isHovered = hoveredCategories.includes(category.id);
    
    return (
      <div
        key={category.id}
        className="category-item"
        style={{ position: 'relative' }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          handleCategoryHover(category.id, true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          handleCategoryHover(category.id, false);
        }}
      >
        <div
          className={`d-flex align-items-center p-2 rounded ${
            selectedCategory === category.id
              ? "bg-primary text-white"
              : "text-dark hover:bg-gray-100"
          }`}
          onClick={() => handleCategorySelect(category.id)}
          style={{ cursor: "pointer" }}
        >
          {/* Parent category with children */}
          {hasChildren && (
            <i className={`bi bi-diagram-2 me-2 ${
              selectedCategory === category.id ? 'text-white' : 'text-primary'
            }`} style={{ fontSize: '1.1rem' }}></i>
          )}
          
          {/* Leaf category without children */}
          {!hasChildren && (
            <i className={`bi bi-diagram-3 me-2 ${
              selectedCategory === category.id ? 'text-white' : 'text-secondary'
            }`} style={{ fontSize: '1.1rem' }}></i>
          )}

          <span className="flex-grow-1">{category.name}</span>
          
          {/* Arrow indicator for categories with children */}
          {hasChildren && (
            <i className={`bi bi-chevron-right ms-2 transition-transform ${
              isHovered ? 'rotate-0' : ''
            } ${selectedCategory === category.id ? 'text-white' : 'text-secondary'}`}></i>
          )}
        </div>

        {hasChildren && isHovered && (
          <div
            className="position-absolute bg-white rounded shadow-lg"
            style={{
              left: '100%',
              top: '0',
              marginLeft: '1px',
              minWidth: '200px',
              zIndex: 1050,
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '0.5rem'
            }}
          >
            {category.children.map((child) => renderCategoryItem(child))}
          </div>
        )}
      </div>
    );
  };
  const transformCategories = (flatCategories) => {
    const categoryMap = {};
    const rootCategories = [];

    // First pass: Create category objects with empty children arrays
    flatCategories.forEach(cat => {
      categoryMap[cat.id] = {
        ...cat,
        children: []
      };
    });

    // Second pass: Build the hierarchy
    flatCategories.forEach(cat => {
      if (cat.parentId) {
        // If category has a parent, add it to parent's children
        const parent = categoryMap[cat.parentId];
        if (parent) {
          parent.children.push(categoryMap[cat.id]);
        }
      } else {
        // If category has no parent, it's a root category
        rootCategories.push(categoryMap[cat.id]);
      }
    });

    return rootCategories;
  };

  const MobileCategoryMenu = () => (
    <div 
      className={`position-fixed top-0 start-0 h-100 bg-white shadow-lg transition-transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ 
        width: "85%", 
        maxWidth: "320px",
        zIndex: 1060,
        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-primary text-white">
        <h6 className="mb-0 fw-bold">Kategoriýalar</h6>
        <button 
          className="btn text-white p-0" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="p-3 overflow-auto" style={{ height: 'calc(100% - 56px)' }}>
        <div
          className={`category-item d-flex align-items-center p-3 rounded-4 mb-2 ${
            !selectedCategory ? "bg-primary text-white" : "bg-light text-dark"
          }`}
          onClick={() => {
            handleCategorySelect(null);
            setIsMobileMenuOpen(false);
          }}
        >
          <i className={`bi bi-grid-3x3-gap-fill me-2 ${!selectedCategory ? 'text-white' : 'text-primary'}`}></i>
          <span className="fw-medium">Ähli harytlar</span>
        </div>
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item d-flex align-items-center p-3 rounded-4 mb-2 ${
              selectedCategory === category.id ? "bg-primary text-white" : "bg-light text-dark"
            }`}
            onClick={() => {
              handleCategorySelect(category.id);
              setIsMobileMenuOpen(false);
            }}
          >
            <i className={`bi bi-diagram-2 me-2 ${
              selectedCategory === category.id ? 'text-white' : 'text-primary'
            }`}></i>
            <span className="fw-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Updated mobile header
  const MobileHeader = () => (
    <div className="d-md-none px-3 py-2 border-bottom bg-white sticky-top shadow-sm">
      <div className="d-flex justify-content-between align-items-center gap-3">
        <button
          className="btn btn-primary btn-sm rounded-pill px-3"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <i className="bi bi-list me-2"></i>
          Kategoriýalar
        </button>
        <div className="position-relative flex-grow-1">
          <input
            className="form-control form-control-sm rounded-pill px-4"
            type="search"
            placeholder="Gözle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bi bi-search position-absolute start-0 top-50 translate-middle-y ms-3 text-muted"></i>
        </div>
      </div>
    </div>
  );
  return (
    <div className="d-flex h-100">
      <MobileHeader />      
      {/* Desktop sidebar */}
      <div className="d-none d-md-flex h-100">
       <div
        className="categories-sidebar border-end bg-light"
        style={{ 
          width: "250px", 
          minHeight: "calc(100vh - 60px)", 
          flexShrink: 0,
          position: 'relative',
          zIndex: 1000
        }}
      >
        <div className="p-3 border-bottom bg-white">
          <h6 className="mb-0">Kategoriýalar</h6>
        </div>
        <div className="p-2">
          {/* "All Products" category */}
          <div
            className={`category-item d-flex align-items-center p-2 cursor-pointer mb-2 rounded ${
              !selectedCategory
                ? "bg-primary text-white"
                : "text-dark hover:bg-gray-100"
            }`}
            onClick={() => handleCategorySelect(null)}
            style={{ cursor: "pointer" }}
          >
            <i className={`bi bi-grid-3x3-gap-fill me-2 ${
              !selectedCategory ? 'text-white' : 'text-primary'
            }`} style={{ fontSize: '1.1rem' }}></i>
            <span>Ähli harytlar</span>
          </div>
          
          {/* Category list */}
          {categories.map(renderCategoryItem)}
        </div>
      </div>


      {/* Harytlar bölümi */}
      <div className="flex-grow-1 p-3">
        {/* Loading indicator */}
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Ýüklenýär...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
        {currentItems.map(renderProductCard)}
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

    {/* Mobile content area */}
    <div className="flex-grow-1">
      <div className="d-md-none p-3">
        <h5 className="mb-3">
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name
            : "Ähli harytlar"}
        </h5>
        
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Ýüklenýär...</span>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-3">
          {currentItems.map(renderProductCard)}
        </div>

        {currentItems.length === 0 && !loading && (
          <div className="text-center py-4">
            <i className="bi bi-search display-4 text-muted"></i>
            <h5 className="mt-3">Haryt tapylmady</h5>
            <p className="text-muted small">
              Başga gözleg sözi ýa-da kategoriýa saýlaň
            </p>
          </div>
        )}

        {/* Mobile pagination */}
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination pagination-sm justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-start"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Yza
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link">
                  {currentPage} / {totalPages}
                </span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link rounded-end"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Öňe
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
</div>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <>
          <MobileCategoryMenu />
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1055 }}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        </>
      )}

      {/* Product modal remains unchanged */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
    

  );
};

export default Products;