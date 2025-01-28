import { useEffect, useState } from "react";
import Breadcrumb from "./fragments/Breadcrumb";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    categoryTranslates: [
      { name: "", languageCulture: "tk" },
      { name: "", languageCulture: "ru" },
      { name: "", languageCulture: "en" },
    ],
    order: 0,
    parentId: null,
    isPublish: false,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleTranslationChange = (index, value) => {
    const updatedTranslates = [...categoryData.categoryTranslates];
    updatedTranslates[index].name = value;

    setCategoryData((prev) => ({
      ...prev,
      categoryTranslates: updatedTranslates,
    }));
  };

  const handleGeneralChange = (field, value) => {
    setCategoryData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://localhost:5001/api/category/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        }
      );
      const data = await response.json();
      navigate("/categorylist");
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <>
      <Breadcrumb
        items={["Administrator", "Kategoriýa", "Kategoriýa goşmak"]}
      />
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              {categoryData.categoryTranslates.map((translate, index) => (
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
                    <label htmlFor={index} className="form-label">
                      Kategoriýanyň ady
                    </label>
                    <input
                      type="text"
                      id={index}
                      className="form-control"
                      value={translate.name}
                      onChange={(e) =>
                        handleTranslationChange(index, e.target.value)
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
                    value={categoryData.order}
                    onChange={(e) =>
                      handleGeneralChange("order", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="single-select-field" className="form-label">
                    Haýsy kategoriýa degişli?
                  </label>
                  {!error && (
                    <select
                      className="form-select"
                      id="single-select-field"
                      value={categoryData.parentId || ""}
                      onChange={(e) =>
                        handleGeneralChange(
                          "parentId",
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                    >
                      <option value="0">Hiç birine degişli däl!</option>
                      {categories.map((category) => (
                        <option value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="col-12 d-flex align-items-center">
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    className="form-check-input m-1"
                    id="isPublish"
                    checked={categoryData.isPublish}
                    onChange={(e) =>
                      handleGeneralChange("isPublish", e.target.checked)
                    }
                  />
                  <label className="form-check-label" htmlFor="isPublish">
                    Aktiwmi?
                  </label>
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

export default AddCategory;
