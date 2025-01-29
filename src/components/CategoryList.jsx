import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./fragments/Breadcrumb";
import { api } from "../env";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate("/addcategory");
  };

  const handleEditCategory = (categoryId) => {
    navigate(`/editcategory/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Kategoriýany pozmak isleýäňizmi?")) {
      try {
        const response = await fetch(
          `${api}/category/${categoryId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Delete operation failed");
        }

        // Remove the deleted employee from the state
        setCategories(categories.filter((dep) => dep.id !== categoryId));
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Kategoriýany pozmak başartmady");
      }
    }
  };

  useEffect(() => {
    fetch(`${api}/category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message));
  }, []);
  return (
    <>
      <Breadcrumb items={["Administrator", "Kategoriýa", "Kategoriýalar"]} />
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
              onClick={handleAddCategory}
              className="btn btn-primary px-4"
            >
              <i className="bi bi-plus-lg me-2"></i>Kategoriýa goş
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
                      <th>Ady</th>
                      <th>Tertibi</th>
                      <th>Haýsy kategoriýa degişli?</th>
                      <th>Operasiýalar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.order}</td>
                          <td>{item.parentCategory}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditCategory(item.id)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteCategory(item.id)}
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

export default CategoryList;
