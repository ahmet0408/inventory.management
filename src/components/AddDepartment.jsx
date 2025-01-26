import { useState } from "react";

const AddDepartment = () => {
  const [translations, setTranslations] = useState({
    tk: { name: "", address: "" },
    ru: { name: "", address: "" },
    en: { name: "", address: "" },
  });

  const handleInputChange = (lang, field, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const departmentTranslates = Object.entries(translations).map(
      ([lang, data]) => ({
        name: data.name,
        address: data.address,
        languageCulture: lang,
      })
    );

    const createDepartmentDTO = { departmentTranslates };
    console.log(createDepartmentDTO);

    fetch("https://localhost:5001/api/department/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createDepartmentDTO),
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
            {["tk", "ru", "en"].map((lang) => (
              <div key={lang}>
                <h4>
                  {lang === "tk"
                    ? "Türkmençe"
                    : lang === "ru"
                    ? "Rusça"
                    : "Iňlisçe"}
                </h4>
                <hr />
                <div className="mb-4">
                  <h5 className="mb-3">Bölümiň ady</h5>
                  <input
                    type="text"
                    className="form-control"
                    value={translations[lang].name}
                    onChange={(e) =>
                      handleInputChange(lang, "name", e.target.value)
                    }
                  />
                </div>
                <div className="mb-4">
                  <h5 className="mb-3">Bölümiň salgysy</h5>
                  <input
                    type="text"
                    className="form-control"
                    value={translations[lang].address}
                    onChange={(e) =>
                      handleInputChange(lang, "address", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
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

export default AddDepartment;
