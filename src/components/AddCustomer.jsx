import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../env";
import Breadcrumb from "./fragments/Breadcrumb";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: [""], // Initialize with one empty phone input
    formPicture: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePictureChange = (e) => {
    handleInputChange("formPicture", e.target.files[0]);
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...customerData.phone];
    updatedPhones[index] = value;
    setCustomerData((prev) => ({
      ...prev,
      phone: updatedPhones,
    }));
  };

  const addPhoneField = () => {
    setCustomerData((prev) => ({
      ...prev,
      phone: [...prev.phone, ""],
    }));
  };

  const removePhoneField = (index) => {
    if (customerData.phone.length > 1) {
      const updatedPhones = [...customerData.phone];
      updatedPhones.splice(index, 1);
      setCustomerData((prev) => ({
        ...prev,
        phone: updatedPhones,
      }));
    }
  };

  const validateForm = () => {
    if (!customerData.firstName || !customerData.lastName) {
      setError("First name and last name are required");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append("firstName", customerData.firstName);
      formData.append("lastName", customerData.lastName);
      
      if (customerData.address) {
        formData.append("address", customerData.address);
      }
      
      // Handle phone array properly
      customerData.phone.forEach((phone, index) => {
        if (phone.trim()) {
          formData.append(`phone[${index}]`, phone);
        }
      });

      // Add picture if exists
      if (customerData.formPicture) {
        formData.append("formPicture", customerData.formPicture);
      }

      const response = await fetch(`${api}/customer/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create customer");
        return;
      }
      
      const data = await response.json();
      navigate("/customerList");
    } catch (error) {
      console.error("Error", error);
      setError("An error occurred while creating the customer");
    }
  };

  return (
    <>
      <Breadcrumb items={["Administrator", "Müşderi", "Müşderi goşmak"]} />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  Ady
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  value={customerData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Familiýasy
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={customerData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Salgysy
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={customerData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Telefon belgisi</label>
                {customerData.phone.map((phone, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      placeholder="Telefon belgisi"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => removePhoneField(index)}
                      disabled={customerData.phone.length <= 1}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={addPhoneField}
                >
                  + Telefon goş
                </button>
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
                    accept="image/*"
                  />
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

export default AddCustomer;