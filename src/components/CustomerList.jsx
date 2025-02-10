import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../env";
import Breadcrumb from "./fragments/Breadcrumb";

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const [customerImages, setCustomerImages] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddCustomer = () => {
        navigate("/addcustomer");
    };

    const handleEditCustomer = (customerId) => {
        navigate(`/editcustomer/${customerId}`);
    };

    const handleDeleteCustomer = async (customerId) => {
        if (window.confirm("Işgäri pozmak isleýäňizmi?")) {
            try {
                const response = await fetch(`${api}/customer/${customerId}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Delete operation failed");
                }

                // Remove the deleted customer from the state
                setCustomers(customers.filter((emp) => emp.id !== customerId));
            } catch (error) {
                console.error("Error deleting customer:", error);
                alert("Işgäri pozmak başartmady");
            }
        }
    };

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
            .then((data) => setCustomers(data))
            .catch((error) => setError(error.message));
    }, []);

    useEffect(() => {
        // Fetch images for each customer
        const fetchImages = async () => {
            const imagePromises = customers.map(async (customer) => {
                try {
                    const response = await fetch(
                        `${api}/image/customer/${customer.picture}`,
                        {
                            credentials: "include",
                        }
                    );
                    if (!response.ok) throw new Error("Image fetch failed");

                    const blob = await response.blob();
                    return {
                        customerId: customer.id,
                        imageUrl: URL.createObjectURL(blob),
                    };
                } catch (error) {
                    console.error(`Image fetch error for ${customer.id}:`, error);
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

        if (customers.length > 0) {
            fetchImages();
        }

        // Cleanup
        return () => {
            Object.values(customerImages).forEach(URL.revokeObjectURL);
        };
    }, [customers]);
    return (
        <>
            <Breadcrumb items={["Administrator", "Müşderi", "Müşderiler"]} />
            <div className="row g-3">
                <div className="col-auto">
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
                <div className="col-auto flex-grow-1 overflow-auto"></div>
                <div className="col-auto">
                    <div className="d-flex align-items-center gap-2 justify-content-lg-end">
                        <button
                            onClick={handleAddCustomer}
                            className="btn btn-primary px-4"
                        >
                            <i className="bi bi-plus-lg me-2"></i>Müşderi goş
                        </button>
                    </div>
                </div>
            </div>

            {!error && (
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="customer-table">
                            <div className="table-responsive white-space-nowrap">
                                <table className="table align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>
                                                <input className="form-check-input" type="checkbox" />
                                            </th>
                                            <th>Müşderi</th>
                                            <th>Adresi</th>
                                            <th>Telefon</th>
                                            <th>Operasiýalar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers &&
                                            customers.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                        />
                                                    </td>
                                                    <td>
                                                        <a
                                                            className="d-flex align-items-center gap-3"
                                                            href="#"
                                                        >
                                                            <div className="customer-pic">
                                                                {customerImages[item.id] && (
                                                                    <img
                                                                        src={customerImages[item.id]}
                                                                        alt={item.firstName}
                                                                        className="rounded-circle"
                                                                        width="40"
                                                                        height="40"
                                                                    />
                                                                )}
                                                            </div>
                                                            <p className="mb-0 customer-name fw-bold">
                                                                {item.firstName + " " + item.lastName}
                                                            </p>
                                                        </a>
                                                    </td>
                                                    <td>{item.address}</td>
                                                    <td>
                                                        <a href="javascript:;" className="font-text1">
                                                            {item.phone.map((phoneNumber, index) => (
                                                                <React.Fragment key={index}>
                                                                    <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>
                                                                        {phoneNumber}
                                                                    </a>
                                                                    {index < item.phone.length - 1 && <br />}
                                                                </React.Fragment>
                                                            ))}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => handleEditCustomer(item.id)}
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDeleteCustomer(item.id)}
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
    )
}

export default CustomerList;