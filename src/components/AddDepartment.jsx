import { useState } from "react";
import Breadcrumb from "./fragments/Breadcrumb";

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
    <>
    <Breadcrumb items={['Administrator','Bölüm','Bölüm goşmak']} />    
    <div className="row">
      <div className="col-12 col-lg-8">
        <div className="card">
          <div className="card-body">
            {["tk", "ru", "en"].map((lang) => (
              <div key={lang}>
                <h5>
                  {lang === "tk"
                    ? "Türkmençe"
                    : lang === "ru"
                    ? "Rusça"
                    : "Iňlisçe"}
                </h5>
                <hr className="mt-0"/>
                <div className="mb-1">
                <label htmlFor={"bol"+lang} className="form-label">
                Ady
              </label>
                  <input
                    type="text" id={"bol"+lang}
                    className="form-control"
                    value={translations[lang].name}
                    onChange={(e) =>
                      handleInputChange(lang, "name", e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                <label htmlFor={"add"+lang} className="form-label">
                Salgysy
              </label>
                  <input
                    type="text" id={"add"+lang}
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
    </>
  );
};

export default AddDepartment;
