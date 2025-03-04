import { useState } from "react";
import Breadcrumb from "./fragments/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { api } from "../env";

const AddCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    formLogo: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (e) => {
    handleInputChange("formLogo", e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(companyData).forEach(([key, value]) => {
        if (key === "formLogo" && value) {
          formData.append(key, value);
        } else if (value) {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${api}/company/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      navigate("/companylist");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <Breadcrumb items={["Administrator", "Kompaniýa", "Kompaniýa goşmak"]} />
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Ady
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={companyData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                  Kompaniýa barada
                </label>
                <textarea
                  type="text"
                  id="desc"
                  className="form-control"
                  value={companyData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="form-label">
                  Salgysy
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={companyData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
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
                    Kompaniýanyň Logosy
                  </label>
                  <input
                    type="file"
                    id="picture"
                    className="form-control"
                    onChange={handleLogoChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Habarlaşmak üçin
                  </label>
                  <div className="d-flex">
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      placeholder="Telefon"
                      value={companyData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="E-poçta"
                      value={companyData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
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

export default AddCompany;
