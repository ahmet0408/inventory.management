import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productTranslates: [
      { name: "", description: "", languageCulture: "tk" },
      { name: "", description: "", languageCulture: "ru" },
      { name: "", description: "", languageCulture: "en" },
    ],
    order: 0,
    amount: 0,
    barcode: "",
    price: 0,
    status: "",
    formImage: null,
    categoryId: 0,
    departmentId: 0,
    employeeId: 0,
  });

  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch("https://localhost:5001/api/employee")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    fetch("https://localhost:5001/api/category")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleTranslationChange = (index, field, value) => {
    const updatedTranslates = [...productData.productTranslates];
    updatedTranslates[index][field] = value;

    setProductData((prev) => ({
      ...prev,
      productTranslates: updatedTranslates,
    }));
  };

  const handleGeneralChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      formImage: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.keys(productData).forEach((key) => {
        if (key === "productTranslates") {
          productData[key].forEach((translate, index) => {
            Object.keys(translate).forEach((field) => {
              formData.append(
                `ProductTranslates[${index}].${field}`,
                translate[field]
              );
            });
          });
        } else if (key === "formImage") {
          if (productData.formImage) {
            formData.append("formImage", productData.formImage);
          }
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await fetch(
        "https://localhost:5001/api/product/create",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      navigate("/productlist");
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <>
      <Breadcrumb items={["Administrator", "Haryt", "Haryt goşmak"]} />
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              {productData.productTranslates.map((translate, index) => (
                <div key={translate.languageCulture}>
                  <h6>
                    {translate.languageCulture === "tk"
                      ? "Türkmençe"
                      : translate.languageCulture === "ru"
                      ? "Rusça"
                      : "Iňlisçe"}
                  </h6>
                  <hr className="mt-0" />
                  <div className="mb-3">
                    <label htmlFor={`name-${index}`} className="form-label">
                      Harydyň ady
                    </label>
                    <input
                      type="text"
                      id={`name-${index}`}
                      className="form-control"
                      value={translate.name}
                      onChange={(e) =>
                        handleTranslationChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor={`description-${index}`}
                      className="form-label"
                    >
                      Düşündiriş
                    </label>
                    <textarea
                      id={`description-${index}`}
                      className="form-control"
                      value={translate.description}
                      onChange={(e) =>
                        handleTranslationChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
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
                  <label htmlFor="Order" className="form-label">
                    Tertibi
                  </label>
                  <input
                    type="number"
                    id="Order"
                    className="form-control"
                    value={productData.order}
                    onChange={(e) =>
                      handleGeneralChange("order", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="Amount" className="form-label">
                    Mukdary
                  </label>
                  <input
                    type="number"
                    id="Amount"
                    className="form-control"
                    value={productData.amount}
                    onChange={(e) =>
                      handleGeneralChange("amount", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="Barcode" className="form-label">
                    Barcode
                  </label>
                  <input
                    type="text"
                    id="Barcode"
                    className="form-control"
                    value={productData.barcode}
                    onChange={(e) =>
                      handleGeneralChange("barcode", e.target.value)
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="Price" className="form-label">
                    Bahasy
                  </label>
                  <input
                    type="number"
                    id="Price"
                    className="form-control"
                    value={productData.price}
                    onChange={(e) =>
                      handleGeneralChange("price", parseFloat(e.target.value))
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="Status" className="form-label">
                    Ýagdaýy
                  </label>
                  <select
                    id="Status"
                    className="form-select"
                    value={productData.status}
                    onChange={(e) =>
                      handleGeneralChange("status", e.target.value)
                    }
                  >
                    <option value="">Ýagdaýy saýlaň</option>
                    <option value="active">Aktiw</option>
                    <option value="inactive">Passiw</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="Image" className="form-label">
                    Surat
                  </label>
                  <input
                    type="file"
                    id="Image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="Category" className="form-label">
                    Kategoriýa
                  </label>
                  {!error && (
                    <select
                      className="form-select"
                      id="Category"
                      value={productData.categoryId}
                      onChange={(e) =>
                        handleGeneralChange(
                          "categoryId",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="0">Kategoriýa saýlaň</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="Department" className="form-label">
                    Bölüm
                  </label>
                  {!error && (
                    <select
                      className="form-select"
                      id="Department"
                      value={productData.departmentId}
                      onChange={(e) =>
                        handleGeneralChange(
                          "departmentId",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="0">Bölüm saýlaň</option>
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="Employee" className="form-label">
                    Işgär
                  </label>
                  {!error && (
                    <select
                      className="form-select"
                      id="Employee"
                      value={productData.employeeId}
                      onChange={(e) =>
                        handleGeneralChange(
                          "employeeId",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="0">Işgär saýlaň</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.fullName}
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

export default AddProduct;
