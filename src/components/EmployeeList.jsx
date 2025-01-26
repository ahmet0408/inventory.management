import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeImages, setEmployeeImages] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/addEmployee");
  };

  useEffect(() => {
    fetch("https://localhost:5001/api/employee")
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
            `https://localhost:5001/api/image/employee/${employee.picture}`
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
        <div className="col-auto flex-grow-1 overflow-auto">
          {/* <div className="btn-group position-static">
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Country
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
                Source
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
                More Filters
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
          </div> */}
        </div>
        <div className="col-auto">
          <div className="d-flex align-items-center gap-2 justify-content-lg-end">
            {/* <button className="btn btn-filter px-4">
              <i className="bi bi-box-arrow-right me-2"></i>Export
            </button> */}
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
