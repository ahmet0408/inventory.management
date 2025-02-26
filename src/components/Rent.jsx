import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../env";

const Rent = () => {
  const { rentId } = useParams();
  const [rents, setRents] = useState([]);
  const [rental, setRental] = useState(null);
  const [rentDetailImages, setRentDetailImages] = useState({});
  const [customerImages, setCustomerImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRent, setSelectedRent] = useState(null);
  const [selectedRentImages, setSelectedRentImages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Window resize handler for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
    } else {
      setLoading(false);
    }
  }, [isOffline]);

  // Fetch the rental with its details if rentId is available
  useEffect(() => {
    const fetchRental = async () => {
      if (!rentId || isOffline) return;

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
  }, [rentId, isOffline]);

  // Fetch customer images for all rents
  useEffect(() => {
    const fetchCustomerImages = async () => {
      if (!rents || rents.length === 0 || isOffline) return;

      const imagePromises = rents.map(async (rent) => {
        if (!rent.customerPicture) return null;

        try {
          const response = await fetch(
            `${api}/image/customer/${rent.customerPicture}`,
            {
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Customer image fetch failed");

          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);

          return {
            customerId: rent.customerId,
            imageUrl: imageUrl,
          };
        } catch (error) {
          console.error(
            `Customer image fetch error for ${rent.customerId}:`,
            error
          );
          return null;
        }
      });

      const results = await Promise.allSettled(imagePromises);
      const fetchedImages = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value) {
          acc[result.value.customerId] = result.value.imageUrl;
        }
        return acc;
      }, {});

      setCustomerImages(fetchedImages);
    };

    if (rents.length > 0) {
      fetchCustomerImages();
    }

    return () => {
      Object.values(customerImages).forEach(URL.revokeObjectURL);
    };
  }, [rents, isOffline]);

  // Fetch images for each rental detail item
  useEffect(() => {
    const fetchImages = async () => {
      if (
        !rental ||
        !rental.rentDetails ||
        rental.rentDetails.length === 0 ||
        isOffline
      )
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
  }, [rental, isOffline]);

  // Helper function to get customer image URL
  const getCustomerImageUrl = (rent) => {
    if (customerImages[rent.customerId]) {
      return customerImages[rent.customerId];
    }
    return "/assets/images/avatars/01.png"; // Default image
  };

  // Helper function to get product image URL
  const getImageUrl = (productId) => {
    if (selectedRentImages && selectedRentImages[productId]) {
      return selectedRentImages[productId];
    }
    return "/assets/images/products/no-image.png"; // Default image
  };

  const handlePreviewClick = async (rent) => {
    setSelectedRent(rent);

    // Fetch images for the selected rent's details
    if (!isOffline && rent.rentDetails && rent.rentDetails.length > 0) {
      try {
        const imagePromises = rent.rentDetails.map(async (detail) => {
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

        setSelectedRentImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images for selected rent:", error);
      }
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Clean up object URLs to prevent memory leaks
    Object.values(selectedRentImages).forEach(URL.revokeObjectURL);
    setSelectedRentImages({});
  };

  // Fixed date format function to convert to dd.mm.yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // Calculate total price for a rent object
  const calculateTotalPrice = (rent) => {
    return rent.rentDetails
      ? rent.rentDetails.reduce(
          (sum, detail) => sum + detail.price * detail.quantity,
          0
        )
      : 0;
  };

  // Render card view of rents for mobile devices
  const renderMobileRentCards = () => {
    return rents.map((rent) => (
      <div key={rent.rentNumber} className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">{`#${rent.rentNumber}`}</h5>
            <span
              className={`badge ${
                rent.rentStatus === 0
                  ? "bg-success"
                  : rent.rentStatus === 1
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {getRentStatusText(rent.rentStatus)}
            </span>
          </div>

          <div className="d-flex align-items-center mb-3">
            <img
              src={getCustomerImageUrl(rent)}
              className="rounded-circle me-2"
              width="40"
              height="40"
              alt={rent.customerName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/avatars/01.png";
              }}
            />
            <div>
              <p className="mb-0 fw-bold">{rent.customerName}</p>
              <small>{rent.responsibleEmployee}</small>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <small className="text-muted d-block">Gitmeli senesi</small>
              <p className="mb-0">{formatDate(rent.dateOfShipment)}</p>
            </div>
            <div className="col-6">
              <small className="text-muted d-block">Gelmeli senesi</small>
              <p className="mb-0">{formatDate(rent.dateOfReturn)}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <p className="fw-bold mb-0">Jemi: ${calculateTotalPrice(rent)}</p>
            <button
              className="btn btn-sm btn-primary"
              style={{ background: "#023047" }}
              onClick={() => handlePreviewClick(rent)}
            >
              <i className="bi bi-eye me-1"></i> Giňişleýin
            </button>
          </div>
        </div>
      </div>
    ));
  };

  // Render mobile product cards for the modal
  const renderMobileProductCards = () => {
    return (
      selectedRent.rentDetails &&
      selectedRent.rentDetails.map((detail) => (
        <div key={detail.productId} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-4">
                <img
                  src={getImageUrl(detail.productId)}
                  className="img-fluid rounded"
                  alt={detail.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/products/no-image.png";
                  }}
                />
              </div>
              <div className="col-8">
                <h6 className="card-title">{detail.name || "N/A"}</h6>
                <p className="card-text small mb-1">
                  Barkod: {detail.barcode || "N/A"}
                </p>
                <p className="card-text small mb-1">
                  Giňişleýin: {detail.description || "N/A"}
                </p>
                <div className="d-flex justify-content-between">
                  <p className="card-text mb-0">Mukdary: {detail.quantity}</p>
                  <p className="card-text mb-0">Baha: ${detail.price}</p>
                </div>
                <p className="card-text fw-bold text-end mt-2">
                  Jemi: ${detail.price * detail.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))
    );
  };

  return (
    <>
      <div className="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-medium flex-wrap font-text1"></div>

      <div className="row g-3">
        <div className="col-12">
          <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center">
            {/* Gözleg inputy */}
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

            {/* Filter Dropdowns */}
            <div className="d-flex flex-wrap gap-2 flex-grow-1 overflow-auto">
              <div className="dropdown">
                <button
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

              <div className="dropdown">
                <button
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

              <div className="dropdown">
                <button
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

            {/* Buttons */}
            <div className="d-flex gap-2 justify-content-md-end">
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
      </div>

      <div className="card mt-4">
        <div className="card-body">
          {isOffline ? (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-wifi-off me-2"></i>
              Internet baglanşygy ýok. Offline režiminde işleýärsiňiz.
            </div>
          ) : loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Maglumatlar ýüklenýär...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          ) : rents.length === 0 ? (
            <div className="text-center p-5">
              <div className="mb-3">
                <i className="bi bi-inbox fs-1 text-muted"></i>
              </div>
              <p>Maglumat tapylmady</p>
            </div>
          ) : isMobile ? (
            // Mobile card view for rents
            renderMobileRentCards()
          ) : (
            // Desktop table view for rents
            <div className="customer-table">
              <div className="table-responsive">
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
                    {rents.map((rent) => (
                      <tr key={rent.rentNumber}>
                        <td>
                          <input className="form-check-input" type="checkbox" />
                        </td>
                        <td>
                          <a href="#!">{`#${rent.rentNumber}`}</a>
                        </td>
                        <td>${calculateTotalPrice(rent)}</td>
                        <td>
                          <a
                            className="d-flex align-items-center gap-3"
                            href="#!"
                          >
                            <div className="customer-pic">
                              <img
                                src={getCustomerImageUrl(rent)}
                                className="rounded-circle"
                                width="40"
                                height="40"
                                alt={rent.customerName}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "/assets/images/avatars/01.png";
                                }}
                              />
                            </div>
                            <p className="mb-0 customer-name fw-bold">
                              {rent.customerName}
                            </p>
                          </a>
                        </td>
                        <td>
                          <span
                            className={`lable-table ${
                              rent.rentStatus === 0
                                ? "bg-success-subtle text-success border-success-subtle"
                                : rent.rentStatus === 1
                                ? "bg-warning-subtle text-warning border-warning-subtle"
                                : "bg-danger-subtle text-danger border-danger-subtle"
                            } rounded border font-text2 fw-bold`}
                          >
                            {getRentStatusText(rent.rentStatus)}
                            {rent.rentStatus === 0 ? (
                              <i className="bi bi-check2 ms-2"></i>
                            ) : rent.rentStatus === 1 ? (
                              <i className="bi bi-clock ms-2"></i>
                            ) : (
                              <i className="bi bi-x-lg ms-2"></i>
                            )}
                          </span>
                        </td>
                        <td>{formatDate(rent.dateOfShipment)}</td>
                        <td>{formatDate(rent.dateOfReturn)}</td>
                        <td>{rent.responsibleEmployee}</td>
                        <td className="d-flex justify-content-around">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handlePreviewClick(rent)}
                          >
                            <i className="bi bi-eye m-1"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handlePreviewClick(rent)}
                          >
                            <i className="bi bi-arrow-down-circle m-1"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for RentDetailDTO with responsive design */}
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
                    <div className="d-flex align-items-center mb-3">
                      <div className="customer-pic me-3">
                        <img
                          src={getCustomerImageUrl(selectedRent)}
                          className="rounded-circle"
                          width="60"
                          height="60"
                          alt={selectedRent.customerName}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/images/avatars/01.png";
                          }}
                        />
                      </div>
                      <div>
                        <p className="mb-0 fw-bold">
                          {selectedRent.customerName}
                        </p>
                        <span
                          className={`badge ${
                            selectedRent.rentStatus === 0
                              ? "bg-success"
                              : selectedRent.rentStatus === 1
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {getRentStatusText(selectedRent.rentStatus)}
                        </span>
                      </div>
                    </div>
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

                {isMobile ? (
                  // Mobile card view for products in modal
                  renderMobileProductCards()
                ) : (
                  // Desktop table view for products in modal
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
                              <td className="text-center">
                                <img
                                  src={getImageUrl(detail.productId)}
                                  width="100"
                                  height="100"
                                  alt={detail.name}
                                  className="img-thumbnail"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "/assets/images/products/no-image.png";
                                  }}
                                />
                              </td>
                              <td>{detail.name || "N/A"}</td>
                              <td>{detail.barcode || "N/A"}</td>
                              <td>{detail.description || "N/A"}</td>
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
                              ${calculateTotalPrice(selectedRent)}
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}

                {/* Show total for mobile view */}
                {isMobile && selectedRent.rentDetails && (
                  <div className="card bg-light mt-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Umumy töleg:</h6>
                        <h5 className="mb-0">
                          ${calculateTotalPrice(selectedRent)}
                        </h5>
                      </div>
                    </div>
                  </div>
                )}
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

export default Rent;
