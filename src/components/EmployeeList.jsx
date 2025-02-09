import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeImages, setEmployeeImages] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/addemployee");
  };

  const handleEditEmployee = (employeeId) => {
    navigate(`/editemployee/${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("Işgäri pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(`${api}/employee/${employeeId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Delete operation failed");
        }

        // Remove the deleted employee from the state
        setEmployees(employees.filter((emp) => emp.id !== employeeId));
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Işgäri pozmak başartmady");
      }
    }
  };

  useEffect(() => {
    fetch(`${api}/employee`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    // Fetch images for each employee
    const fetchImages = async () => {
      const imagePromises = employees.map(async (employee) => {
        try {
          const response = await fetch(
            `${api}/image/employee/${employee.picture}`,
            {
              credentials: "include",
            }
          );
          if (!response.ok) throw new Error("Image fetch failed");

          const blob = await response.blob();
          return {
            employeeId: employee.id,
            imageUrl: URL.createObjectURL(blob),
          };
        } catch (error) {
          console.error(`Image fetch error for ${employee.id}:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(imagePromises);

      const fetchedImages = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value) {
          acc[result.value.employeeId] = result.value.imageUrl;
        }
        return acc;
      }, {});

      setEmployeeImages(fetchedImages);
    };

    if (employees.length > 0) {
      fetchImages();
    }

    // Cleanup
    return () => {
      Object.values(employeeImages).forEach(URL.revokeObjectURL);
    };
  }, [employees]);
  return (
    <>
      <Breadcrumb items={["Administrator", "Işgär", "Işgärler"]} />
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
              onClick={handleAddEmployee}
              className="btn btn-primary px-4"
            >
              <i className="bi bi-plus-lg me-2"></i>Işgär goş
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
                      <th>Işgär</th>
                      <th>Email</th>
                      <th>Wezipesi</th>
                      <th>Pasport maglumaty</th>
                      <th>Bölümi</th>
                      <th>Operasiýalar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees &&
                      employees.map((item) => (
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
                                {employeeImages[item.id] && (
                                  <img
                                    src={employeeImages[item.id]}
                                    alt={item.fullName}
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                  />
                                )}
                              </div>
                              <p className="mb-0 customer-name fw-bold">
                                {item.fullName}
                              </p>
                            </a>
                          </td>
                          <td>
                            <a href="javascript:;" className="font-text1">
                              {item.fullName}.com
                            </a>
                          </td>
                          <td>{item.job}</td>
                          <td>{item.passportFile}</td>
                          <td>{item.departmentName}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditEmployee(item.id)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteEmployee(item.id)}
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

export default EmployeeList;
