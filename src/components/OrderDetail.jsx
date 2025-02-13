import Breadcrumb from "./fragments/Breadcrumb";
import { useCart } from "../context/CartContext";
import { api } from "../env";
import { useEffect, useState } from "react";
import BarcodeScannerModal from "./fragments/BarcodeScannerModal";

const OrderDetail = () => {
  const { items, getCartTotals, clearCart, addItem } = useCart();
  const [productImages, setProductImages] = useState({});
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [scanType, setScanType] = useState("");
  const [barcodeText, setBarcodeText] = useState("");

  const handleScan = (scannedBarcode) => {
    setBarcodeText(scannedBarcode);
    setIsScannerOpen(false);
  };

  useEffect(() => {
    if (!barcodeText) return;
    const sendData = async () => {
      try {
        const response = await fetch(`${api}/product/getbybarcode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(barcodeText),
        });
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const product = await response.json();
        if (product) {
          // Add the scanned product to cart
          addItem(product);
          // Clear the barcode text after successful addition
          setBarcodeText("");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        // You might want to show an error message to the user here
      }
    };

    sendData();
  }, [barcodeText, addItem]);

  useEffect(() => {
    fetch(`${api}/customer`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = items.map(async (product) => {
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

    if (items.length > 0) {
      fetchImages();
    }

    return () => {
      Object.values(productImages).forEach(URL.revokeObjectURL);
    };
  }, [items]);
  return (
    <>
      <Breadcrumb items={["Baş sahypa", "Sebet"]} />
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-lg-row flex-column align-items-start align-items-lg-center justify-content-between gap-3">
            <div className="flex-grow-1">
              <h4 className="fw-bold">Sargyt #849</h4>
              <p className="mb-0">
                Müşderi ID : <a href="javascript:;">6589743</a>
              </p>
            </div>
            <div className="overflow-auto">
              <div className="btn-group position-static">
                <div className="btn-group position-static">
                  <button
                    onClick={() => setIsScannerOpen(true)}
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-upc-scan me-2"></i>
                    Skaner
                  </button>
                  <BarcodeScannerModal
                    isOpen={isScannerOpen}
                    onClose={() => setIsScannerOpen(false)}
                    onScan={handleScan}
                  />
                </div>
                <div className="btn-group position-static">
                  <button
                    onClick={clearCart}
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-x-circle me-2"></i>Arassala
                  </button>
                </div>
                <div className="btn-group position-static">
                  <button
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
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
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8 d-flex">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="mb-3 fw-bold">
                Sargyt harytlar
                <span className="fw-light ms-2">
                  ({getCartTotals().itemCount})
                </span>
              </h5>
              {/* Desktop */}
              <div className="d-none d-lg-block product-table ">
                <div className="table-responsive white-space-nowrap">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Haryt ady</th>
                        <th>Bölümi</th>
                        <th>Degişli işgäri</th>
                        <th>Barkody</th>
                        <th>Bahasy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items &&
                        items.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <div className="product-box">
                                  <img
                                    src={productImages[item.id]}
                                    width="70"
                                    className="rounded-3"
                                    alt={item.name}
                                  />
                                </div>
                                <div className="product-info">
                                  <a href="#" className="product-title">
                                    {item.name}
                                  </a>
                                  <p className="mb-0 product-category">
                                    Kategoriýa : {item.categoryName}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>{item.departmentName}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.barcode}</td>
                            <td>{item.price} TMT</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Mobile */}
              <div className="d-lg-none">
                {items?.map((item) => (
                  <div key={item.id} className="card mb-2 border">
                    <div className="card-body p-2">
                      <div className="d-flex gap-2">
                        <div
                          className="d-flex align-items-center product-box"
                          style={{ minWidth: "60px" }}
                        >
                          <img
                            src={productImages[item.id]}
                            className="rounded-2 w-100"
                            style={{ maxWidth: "60px" }}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{item.name}</h6>
                          <div className="text-muted small">
                            <div>Bölümi: {item.departmentName}</div>
                            <div>Işgär: {item.employeeName}</div>
                            <div>Barkod: {item.barcode}</div>
                            <div className="fw-bold text-dark">
                              {item.price} TMT
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 fw-bold">Jemi bahasy :</p>
                <p className="mb-0 fw-bold">{getCartTotals().subtotal} TMT</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex">
          <div className="w-100">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4 fw-bold">Maglumat</h4>
                <div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Jemi baha :</p>
                    <p className="fw-semi-bold">
                      {getCartTotals().subtotal} TMT
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Arzanladyş :</p>
                    <p className="text-danger fw-semi-bold">-48%</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Eltip bermek hyzmaty :</p>
                    <p className="fw-semi-bold">50 TMT</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between border-top pt-4">
                  <h5 className="mb-0 fw-bold">Umumy baha :</h5>
                  <h5 className="mb-0 fw-bold">
                    {getCartTotals().subtotal} TMT
                  </h5>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <label className="form-label">Töleg prosesi</label>
                <select className="form-select mb-3">
                  <option value="cod">Nagt</option>
                  <option value="card">Nagt däl</option>
                </select>
                <label className="form-label">Sargydyň ýagdaýy</label>
                <select className="form-select mb-3">
                  <option value="cod">Ugradyldy</option>
                  <option value="card">Garaşylýar</option>
                  <option value="paypal">Tabşyryldy</option>
                </select>
                <label className="form-label">Ugradylmaly senesi</label>
                <input type="text" className="form-control mb-3 date-time" />
                <label className="form-label">Getirilmeli senesi</label>
                <input type="text" className="form-control mb-3 date-time" />
                <label className="form-label">Müşderi</label>
                <select
                  className="form-select"
                  id="single-select-field"
                  data-placeholder="Müşderi saýla"
                >
                  <option value=""></option>
                  {customers &&
                    customers.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.firstName + " " + item.lastName}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  style={{ float: "right" }}
                  className="btn btn-primary mt-4"
                >
                  Tassykla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </>
  );
};

export default OrderDetail;
