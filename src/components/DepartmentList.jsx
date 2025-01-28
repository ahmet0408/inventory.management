import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddDepartment = () => {
    navigate("/adddepartment");
  };

  const handleEditDepartment = (departmentId) => {
    navigate(`/editdepartment/${departmentId}`);
  };

  const handleDeleteDepartment = async (departmentId) => {
    if (window.confirm("Bölümi pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(
          `https://localhost:5001/api/department/${departmentId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Delete operation failed");
        }

        // Remove the deleted employee from the state
        setDepartments(departments.filter((dep) => dep.id !== departmentId));
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Bölümi pozmak başartmady");
      }
    }
  };

  useEffect(() => {
    fetch("https://localhost:5001/api/department")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setDepartments(data))
      .catch((error) => setError(error.message));
  }, []);
  return (
    <>
      <Breadcrumb items={["Administrator", "Bölüm", "Bölümler"]} />
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
              onClick={handleAddDepartment}
              className="btn btn-primary px-4"
            >
              <i className="bi bi-plus-lg me-2"></i>Bölüm goş
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
                      <th>Bölümiň ady</th>
                      <th>Salgysy</th>
                      <th>Operasiýalar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments &&
                      departments.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditDepartment(item.id)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteDepartment(item.id)}
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

export default DepartmentList;
