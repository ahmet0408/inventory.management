import { useState } from "react";

const AddCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    formLogo: null,
  });

  const handleInputChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (e) => {
    handleInputChange("formLogo", e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(companyData).forEach(([key, value]) => {
      if (key === "formLogo" && value) {
        formData.append(key, value);
      } else if (value) {
        formData.append(key, value);
      }
    });

    console.log(formData);

    fetch("https://localhost:5001/api/company/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Department created", data))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        <div className="card">
          <div className="card-body">
            <div className="mb-4">
              <h5 className="mb-3">Ady</h5>
              <input
                type="text"
                className="form-control"
                value={companyData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h5 className="mb-3">Kompaniýa barada</h5>
              <input
                type="text"
                className="form-control"
                value={companyData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <h5 className="mb-3">Kompaniýanyň Logosy</h5>
              <input
                type="file"
                className="form-control"
                onChange={handleLogoChange}
              />
            </div>
            <div className="mb-4">
              <h5 className="mb-3">Salgysy</h5>
              <input
                type="text"
                className="form-control"
                value={companyData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h5 className="mb-3">Habarlaşmak üçin</h5>
              <div className="d-flex">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Telefon"
                  value={companyData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-poçta"
                  value={companyData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
  );
};

export default AddCompany;
