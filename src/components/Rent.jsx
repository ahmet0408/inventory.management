import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../env";

const Rent = () => {
  const { rentId } = useParams();
  const [rents, setRents] = useState([]);
  const [rental, setRental] = useState(null);
  const [rentDetailImages, setRentDetailImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRent, setSelectedRent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  // Fetch all rents
  useEffect(() => {
    if (!isOffline) {
      setLoading(true);
      fetch(`${api}/rent`, { credentials: "include" })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          setRents(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [isOffline]);

  // Fetch the rental with its details if rentId is available
  useEffect(() => {
    const fetchRental = async () => {
      if (!rentId) return;

      try {
        const response = await fetch(`${api}/rent/${rentId}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch rental");
        const rentalData = await response.json();
        setRental(rentalData);
      } catch (error) {
        console.error("Error fetching rental:", error);
      }
    };

    fetchRental();
  }, [rentId]);

  // Then fetch images for each rental detail item
  useEffect(() => {
    const fetchImages = async () => {
      if (!rental || !rental.rentDetails || rental.rentDetails.length === 0)
        return;

      const imagePromises = rental.rentDetails.map(async (detail) => {
        if (!detail.image) return null;

        try {
          const response = await fetch(`${api}/image/haryt/${detail.image}`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Image fetch failed");

          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);

          return {
            productId: detail.productId,
            imageUrl: imageUrl,
          };
        } catch (error) {
          console.error(`Image fetch error for ${detail.productId}:`, error);
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

      setRentDetailImages(fetchedImages);
    };

    if (rental && rental.rentDetails && rental.rentDetails.length > 0) {
      fetchImages();
    }

    // Clean up object URLs to prevent memory leaks
    return () => {
      Object.values(rentDetailImages).forEach(URL.revokeObjectURL);
    };
  }, [rental]);

  const handlePreviewClick = (rent) => {
    setSelectedRent(rent);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Fixed date format function to convert to dd.mm.yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // Function to get image URL from rentDetailImages object
  const getImageUrl = (productId) => {
    return rentDetailImages[productId] || "assets/images/products/no-image.png";
  };

  return (
    <>
      <div className="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-medium flex-wrap font-text1"></div>

      <div className="row g-3">
        <div className="col-12 col-md-auto">
          <div className="position-relative">
            <input
              className="form-control px-5"
              type="search"
              placeholder="Gözle"
            />
            <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">
              search
            </span>
          </div>
        </div>
        <div className="col-12 col-md-auto flex-grow-1 overflow-auto">
          <div className="btn-group position-static d-flex flex-wrap">
            <div className="btn-group position-static mb-2 mb-md-0">
              <button
                type="button"
                className="btn border btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Ýagdaýy
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#!">
                    Tamamlandy
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Arendada
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Ýatyryldy
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group position-static mb-2 mb-md-0">
              <button
                type="button"
                className="btn border btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seneler
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#!">
                    Şu hepde
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Şu aý
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Geçen aý
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group position-static mb-2 mb-md-0">
              <button
                type="button"
                className="btn border btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Müşderiler
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#!">
                    Myrat Myradow
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-auto">
          <div className="d-flex align-items-center gap-2 justify-content-md-end">
            <button className="btn btn-filter px-4">
              <i className="bi bi-box-arrow-right me-2"></i>Export
            </button>
            <Link to="/products">
              <button
                className="btn btn-primary px-4"
                style={{ background: "#023047" }}
              >
                <i className="bi bi-plus-lg me-2"></i>Täze Sargyt
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Maglumatlar ýüklenýär...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : rents.length === 0 ? (
            <div className="text-center p-5">
              <div className="mb-3">
                <i className="bi bi-inbox fs-1 text-muted"></i>
              </div>
              <p>Maglumat tapylmady</p>
            </div>
          ) : (
            <div className="customer-table">
              <div className="table-responsive white-space-nowrap">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>
                        <input className="form-check-input" type="checkbox" />
                      </th>
                      <th>#S/N</th>
                      <th>Jemi baha</th>
                      <th>Müşderi</th>
                      <th>Ýagdaýy</th>
                      <th>Gitmeli senesi</th>
                      <th>Gelmeli senesi</th>
                      <th>Jogapkär</th>
                      <th>Giňişleýin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rents.map((rent) => {
                      // Calculate total price from rent details
                      const totalPrice = rent.rentDetails
                        ? rent.rentDetails.reduce(
                            (sum, detail) =>
                              sum + detail.price * detail.quantity,
                            0
                          )
                        : 0;

                      return (
                        <tr key={rent.rentNumber}>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <a href="#!">{`#${rent.rentNumber}`}</a>
                          </td>
                          <td>${totalPrice}</td>
                          <td>
                            <a
                              className="d-flex align-items-center gap-3"
                              href="#!"
                            >
                              <div className="customer-pic">
                                <img
                                  src="assets/images/avatars/01.png"
                                  className="rounded-circle"
                                  width="40"
                                  height="40"
                                  alt=""
                                />
                              </div>
                              <p className="mb-0 customer-name fw-bold">
                                {rent.customer}
                              </p>
                            </a>
                          </td>
                          <td>
                            <span
                              className={`lable-table ${
                                rent.rentStatus === 0
                                  ? "bg-success-subtle text-success border-success-subtle"
                                  : "bg-warning-subtle text-warning border-warning-subtle"
                              } rounded border font-text2 fw-bold`}
                            >
                              {getRentStatusText(rent.rentStatus)}
                              {rent.rentStatus === 0 ? (
                                <i className="bi bi-check2 ms-2"></i>
                              ) : (
                                <i className="bi bi-clock ms-2"></i>
                              )}
                            </span>
                          </td>
                          <td>{formatDate(rent.dateOfShipment)}</td>
                          <td>{formatDate(rent.dateOfReturn)}</td>
                          <td>{rent.responsibleEmployee}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handlePreviewClick(rent)}
                            >
                              <i className="bi bi-eye m-1"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for RentDetailDTO */}
      {showModal && selectedRent && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Giňişleýin #{selectedRent.rentNumber}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p>
                      <strong>Müşderi:</strong> {selectedRent.customer}
                    </p>
                    <p>
                      <strong>Jogapkär işgär:</strong>{" "}
                      {selectedRent.responsibleEmployee}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Ugradylmaly senesi:</strong>{" "}
                      {formatDate(selectedRent.dateOfShipment)}
                    </p>
                    <p>
                      <strong>Gelmeli senesi:</strong>{" "}
                      {formatDate(selectedRent.dateOfReturn)}
                    </p>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">Harytlar</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Suraty</th>
                        <th>Ady</th>
                        <th>Barkody</th>
                        <th>Giňişleýin</th>
                        <th>Mukdary</th>
                        <th>Baha</th>
                        <th>Umumy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRent.rentDetails &&
                        selectedRent.rentDetails.map((detail) => (
                          <tr key={detail.productId}>
                            <td>
                              <img
                                src={getImageUrl(detail.productId)}
                                width="50"
                                height="50"
                                alt={detail.name}
                                className="img-thumbnail"
                              />
                            </td>
                            <td>{detail.name}</td>
                            <td>{detail.barcode}</td>
                            <td>{detail.description}</td>
                            <td>{detail.quantity}</td>
                            <td>${detail.price}</td>
                            <td>${detail.price * detail.quantity}</td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="6" className="text-end">
                          <strong>Umumy töleg:</strong>
                        </td>
                        <td>
                          <strong>
                            $
                            {selectedRent.rentDetails
                              ? selectedRent.rentDetails.reduce(
                                  (sum, detail) =>
                                    sum + detail.price * detail.quantity,
                                  0
                                )
                              : 0}
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Ýap
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: "#023047" }}
                >
                  Çap et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to convert RentStatus enum values to text
const getRentStatusText = (statusValue) => {
  // Based on the C# RentStatus enum
  const statusMap = {
    0: "Tamamlandy",
    1: "Arendada",
    2: "Ýatyryldy",
  };

  return statusMap[statusValue] || "Unknown";
};

export default Rent;
