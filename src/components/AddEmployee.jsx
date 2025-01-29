import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    fullName: "",
    job: "",
    passportFile: "",
    departmentId: 0,
    formPicture: null,
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${api}/department`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setDepartments(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleInputChange = (field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePictureChange = (e) => {
    handleInputChange("formPicture", e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(employeeData).forEach(([key, value]) => {
        if (key === "formPicture" && value) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        `${api}/employee/create`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      navigate("/employeeList");
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <>
      <Breadcrumb items={["Administrator", "Işgär", "Işgär goşmak"]} />
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Ady, Familiýasy we Atasynyň ady
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="form-control"
                  value={employeeData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="job" className="form-label">
                  Wezipesi
                </label>
                <input
                  type="text"
                  id="job"
                  className="form-control"
                  value={employeeData.job}
                  onChange={(e) => handleInputChange("job", e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="passport" className="form-label">
                  Pasport maglumaty
                </label>
                <input
                  type="text"
                  id="passport"
                  className="form-control"
                  value={employeeData.passportFile}
                  onChange={(e) =>
                    handleInputChange("passportFile", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5>Maglumat</h5>
              <hr className="mt-0" />
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="picture" className="form-label">
                    Suraty
                  </label>
                  <input
                    type="file"
                    id="picture"
                    className="form-control"
                    onChange={handlePictureChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="single-select-field" className="form-label">
                    Haýsy bölüme degişli?
                  </label>
                  {!error && (
                    <select
                      className="form-select"
                      // id="single-select-field"
                      value={employeeData.departmentId || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "departmentId",
                          e.target.value === "0" ? 0 : parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="0">Hiç birine degişli däl!</option>
                      {departments.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Goş
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
