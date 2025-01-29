import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/addproduct");
  };

  const handleEditProduct = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Harydy pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(
          `${api}/product/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Delete operation failed");
        }

        // Remove the deleted company from the state
        setProducts(products.filter((emp) => emp.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Harydy pozmak başartmady");
      }
    }
  };

  useEffect(() => {
    fetch(`${api}/product`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    // Fetch images for each company
    const fetchImages = async () => {
      const imagePromises = products.map(async (product) => {
        try {
          const response = await fetch(
            `${api}/image/haryt/${product.image}`
          );
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

    // Cleanup
    return () => {
      Object.values(productImages).forEach(URL.revokeObjectURL);
    };
  }, [products]);
  return (
    <>
      <Breadcrumb items={["Administrator", "Haryt", "Harytlar"]} />
      <div className="row g-3">
        <div className="col-auto">
          <div className="position-relative">
            <input
              className="form-control px-5"
              type="search"
              placeholder="Harydy gözle"
            />
            <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">
              search
            </span>
          </div>
        </div>
        <div className="col-auto flex-grow-1 overflow-auto">
          <div className="btn-group position-static">
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kategoriýalar
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bölümler
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Işgärler
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="d-flex align-items-center gap-2 justify-content-lg-end">
            <button onClick={handleAddProduct} className="btn btn-primary px-4">
              <i className="bi bi-plus-lg me-2"></i>Haryt goşmak
            </button>
          </div>
        </div>
      </div>

      {!error && (
        <div className="card mt-4">
          <div className="card-body">
            <div className="product-table">
              <div className="table-responsive white-space-nowrap">
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
                    {products &&
                      products.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div className="product-box">
                                {productImages[item.id] && (
                                  <img
                                    src={productImages[item.id]}
                                    alt={item.name}
                                    width="70"
                                    className="rounded-3"
                                  />
                                )}
                              </div>
                              <div className="product-info">
                                <a
                                  href="javascript:;"
                                  className="product-title"
                                >
                                  {item.name}
                                </a>
                                <p className="mb-0 product-category">
                                  Kategoriýa : {item.categoryName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{item.barcode}</td>
                          <td>{item.price} TMT</td>
                          <td>
                            <p class="dash-lable mb-0 bg-success bg-opacity-10 text-success rounded-2">
                              Ammarda bar
                            </p>
                          </td>
                          {/* <td>
                            <div className="product-tags">
                              <a href="javascript:;" className="btn-tags">
                                Jeans
                              </a>
                              <a href="javascript:;" className="btn-tags">
                                iPhone
                              </a>
                              <a href="javascript:;" className="btn-tags">
                                Laptops
                              </a>
                              <a href="javascript:;" className="btn-tags">
                                Mobiles
                              </a>
                              <a href="javascript:;" className="btn-tags">
                                Wallets
                              </a>
                            </div>
                          </td>
                          <td>
                            <div className="product-rating">
                              <i className="bi bi-star-fill text-warning me-2"></i>
                              <span>5.0</span>
                            </div>
                          </td> */}
                          {/* <td>
                            <a href="javascript:;">Michle Shoes England</a>
                          </td> */}
                          <td>{item.departmentName}</td>
                          <td>{item.employeeName}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditProduct(item.id)}
                              >
                                <i className="bi bi-pencil-square"></i>
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
        </div>
      )}
    </>
  );
};

export default ProductList;
