import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [companyImages, setCompanyImages] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddCompany = () => {
    navigate("/addcompany");
  };

  const handleEditCompany = (companyId) => {
    navigate(`/editcompany/${companyId}`);
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm("Kompaniýa maglumatlary pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(
          `https://localhost:5001/api/company/${companyId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Delete operation failed");
        }

        // Remove the deleted company from the state
        setCompanies(companies.filter((emp) => emp.id !== companyId));
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Kompaniýa maglumatlaryny pozmak başartmady");
      }
    }
  };

  useEffect(() => {
    fetch("https://localhost:5001/api/company")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCompanies(data))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    // Fetch images for each company
    const fetchImages = async () => {
      const imagePromises = companies.map(async (company) => {
        try {
          const response = await fetch(
            `https://localhost:5001/api/image/company/${company.logo}`
          );
          if (!response.ok) throw new Error("Image fetch failed");

          const blob = await response.blob();
          return {
            companyId: company.id,
            imageUrl: URL.createObjectURL(blob),
          };
        } catch (error) {
          console.error(`Image fetch error for ${company.id}:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(imagePromises);

      const fetchedImages = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value) {
          acc[result.value.companyId] = result.value.imageUrl;
        }
        return acc;
      }, {});

      setCompanyImages(fetchedImages);
    };

    if (companies.length > 0) {
      fetchImages();
    }

    // Cleanup
    return () => {
      Object.values(companyImages).forEach(URL.revokeObjectURL);
    };
  }, [companies]);
  return (
    <>
      <Breadcrumb
        items={["Administrator", "Kompaniýa", "Kompaniýa maglumatlary"]}
      />
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
            <button onClick={handleAddCompany} className="btn btn-primary px-4">
              <i className="bi bi-plus-lg me-2"></i>Kompaniýa maglumatlary goş
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
                      <th>Ady</th>
                      <th>Kompaniýa barada</th>
                      <th>Salgysy</th>
                      <th>Telefon</th>
                      <th>Mail</th>
                      <th>Operasiýalar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies &&
                      companies.map((item) => (
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
                              href="javascript:;"
                            >
                              <div className="customer-pic">
                                {companyImages[item.id] && (
                                  <img
                                    src={companyImages[item.id]}
                                    alt={item.name}
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                  />
                                )}
                              </div>
                              <p className="mb-0 customer-name fw-bold">
                                {item.name}
                              </p>
                            </a>
                          </td>
                          <td>{item.description}</td>
                          <td>{item.address}</td>
                          <td>{item.phone}</td>
                          <td>
                            <a href="javascript:;" className="font-text1">
                              {item.email}
                            </a>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditCompany(item.id)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteCompany(item.id)}
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

export default CompanyList;
