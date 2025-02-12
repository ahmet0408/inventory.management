import { useEffect, useState } from "react";
import { api } from "../env";
import Breadcrumb from "./fragments/Breadcrumb";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    sortBy: "default",
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const itemsPerPage = 8;
  const { addItem, isItemInCart } = useCart();

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

  const handleAddToCart = (item) => {
    if (isItemInCart(item.id)) {
      const notification = document.createElement("div");
      notification.className =
        "alert alert-warning alert-dismissible fade show position-fixed top-0 end-0 m-3";
      notification.role = "alert";
      notification.innerHTML = `
        <strong>Bu haryt sebetde bar!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);

      return;
    }

    addItem(item);

    // Success notification
    const notification = document.createElement("div");
    notification.className =
      "alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3";
    notification.role = "alert";
    notification.innerHTML = `
      <strong>Haryt sebede goşuldy!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  useEffect(() => {
    if (!isOffline) {
      fetch(`${api}/product`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(setProducts)
        .catch((error) => setError(error.message));
    }
  }, [isOffline]);

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
          return {
            productId: product.id,
            imageUrl: URL.createObjectURL(blob),
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || product.categoryName === filters.category;
    const matchesPriceRange = true; // Add price range logic here if needed

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <>
      <Breadcrumb items={["Harytlar", "Haryt sanawy"]} />

      {/* Search and Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-4">
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
            <div className="col-12 col-md-8">
              <div className="d-flex gap-2 flex-wrap">
                <select
                  className="form-select w-auto"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">Ähli kategoriýalar</option>
                  {/* Add your categories here */}
                </select>
                <select
                  className="form-select w-auto"
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                >
                  <option value="default">Tertiplemek</option>
                  <option value="price-asc">Baha (Arzandan gymmada)</option>
                  <option value="price-desc">Baha (Gymmatdan arzan)</option>
                  <option value="name-asc">At (A-Z)</option>
                  <option value="name-desc">At (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {currentItems.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100 rounded-3 border-0 shadow-sm">
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
                      <i className="bi bi-image-fill text-secondary fs-1"></i>
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
                <h6 className="card-title mb-2 text-truncate">{item.name}</h6>
                <p className="card-text text-muted small mb-2 text-truncate">
                  {item.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{item.price} TMT</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              className={`page-item ${currentPage === totalPages ? "disabled" : ""
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

      {/* No Results Message */}
      {currentItems.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <h4 className="mt-3">Haryt tapylmady</h4>
          <p className="text-muted">
            Başga gözleg sözi ýa-da filter saýlaň
          </p>
        </div>
      )}
    </>
  );
};

export default Products;