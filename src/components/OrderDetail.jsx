import Breadcrumb from "./fragments/Breadcrumb";
import { useCart } from "../context/CartContext";
import { api } from "../env";
import { useEffect, useState } from "react";
import BarcodeScannerModal from "./fragments/BarcodeScannerModal";

const OrderDetail = () => {
  const { items, getCartTotals, clearCart } = useCart();
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
    console.log(barcodeText);
    const sendData = async () => {
      const response = await fetch(`${api}/product/getbybarcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(barcodeText), // Stringi JSON görnüşinde ibermek
      });

      const responseData = await response.json();
      console.log(responseData);
    };

    sendData();
  }, [barcodeText]);

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
      .then((data) => {setCustomers(data);console.log(data);})
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
                  <button onClick={clearCart} type="button" className="btn btn-outline-primary">
                    <i className="bi bi-x-circle me-2"></i>Arassala
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
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More Actions
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
              <div className="product-table">
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
                <h4 className="card-title mb-4 fw-bold">Summary</h4>
                <div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Items subtotal :</p>
                    <p className="fw-semi-bold">$891</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Discount :</p>
                    <p className="text-danger fw-semi-bold">-$48</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Tax :</p>
                    <p className="fw-semi-bold">$156.70</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Subtotal :</p>
                    <p className="fw-semi-bold">$756</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-semi-bold">Shipping Cost :</p>
                    <p className="fw-semi-bold">$50</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between border-top pt-4">
                  <h5 className="mb-0 fw-bold">Total :</h5>
                  <h5 className="mb-0 fw-bold">$925.44</h5>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4 fw-bold">Order Status</h4>
                <label className="form-label">Payment status</label>
                <select className="form-select mb-4">
                  <option value="cod">Processing</option>
                  <option value="card">Done</option>
                  <option value="paypal">Pending</option>
                </select>
                <label className="form-label">Completed status</label>
                <select className="form-select">
                  <option value="cod">Complete</option>
                  <option value="card">Done</option>
                  <option value="paypal">Pending</option>
                </select>
                <label className="form-label">Basic single select</label>
									<select className="form-select" id="single-select-field" data-placeholder="Choose one thing">
										
										<option>Reactive</option>
										<option>Solution</option>
										<option>Conglomeration</option>
										<option>Algoritm</option>
										<option>Holistic</option>
									</select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-4">Billing Details</h5>
      <div className="card">
        <div className="card-body">
          <div className="row g-3 row-cols-1 row-cols-lg-4">
            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="detail-info">
                  <p className="fw-bold mb-1">Customer Name</p>
                  <a href="javascript:;" className="mb-0">
                    Jhon Maxwell
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="detail-info">
                  <h6 className="fw-bold mb-1">Email</h6>
                  <a href="javascript:;" className="mb-0">
                    abcexample.com
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="detail-info">
                  <h6 className="fw-bold mb-1">Phone</h6>
                  <a href="javascript:;" className="mb-0">
                    +01-585XXXXXXX
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-calendar-check-fill"></i>
                </div>
                <div className="detail-info">
                  <h6 className="fw-bold mb-1">Shipping Date</h6>
                  <p className="mb-0">15 Dec, 2022</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-gift-fill"></i>
                </div>
                <div className="detail-info">
                  <h6 className="fw-bold mb-1">Gift Order</h6>
                  <p className="mb-0">Gift voucher has available</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-house-door-fill"></i>
                </div>
                <div className="detail-info">
                  <h6 className="fw-bold mb-1">Address 1</h6>
                  <p className="mb-0">123 Street Name, City, Australia</p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex align-items-start gap-3 border p-3 rounded">
                <div className="detail-icon fs-5">
                  <i className="bi bi-house-fill"></i>
                </div>
                <div className="detail-info">
                  <h6 className="fw-bold mb-1">Shipping Address</h6>
                  <p className="mb-0">
                    198 Street Name, City, Inited States of America
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
