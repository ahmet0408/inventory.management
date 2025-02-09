import { useEffect, useState } from "react";
import { api } from "../env";
import Breadcrumb from "./fragments/Breadcrumb";
import { useCart } from "./context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);
  const { addItem, isItemInCart, getCartTotals } = useCart();

  useEffect(() => {
    fetch(`${api}/product`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(setProducts)
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = products.map(async (product) => {
        if (!product.image) return null;

        try {
          const response = await fetch(`${api}/image/haryt/${product.image}`, {
            credentials: "include",
          });
          if (!response.ok) throw new Error("Image fetch failed");

          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);

          return {
            productId: product.id,
            imageUrl: imageUrl,
          };
        } catch (error) {
          console.error(`Image fetch error for ${product.id}:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(imagePromises);
      const fetchedImages = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value) {
          acc[result.value.productId] = result.value.imageUrl;
        }
        return acc;
      }, {});

      setProductImages(fetchedImages);
    };

    if (products.length > 0) {
      fetchImages();
    }

    return () => {
      Object.values(productImages).forEach(URL.revokeObjectURL);
    };
  }, [products]);
  return (
    <>
      <Breadcrumb items={["Harytlar", "Haryt sanawy"]} />
      <div className="row row-cols-1 row-cols-xl-2">
        {products &&
          products.map((item) => (
            <div key={item.id} className="col">
              <div className="card rounded-4">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4 border-end">
                    <div className="p-3">
                      {productImages[item.id] && (
                        <img
                          src={productImages[item.id]}
                          className="w-100 rounded-start"
                          alt={item.name}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <h5>Baha : {item.price} TMT</h5>
                      <div className="mt-4 d-flex align-items-center justify-content-between">
                        <button className="btn btn-grd btn-grd-info border-0 d-flex gap-2 px-3">
                          <i className="material-icons-outlined">
                            shopping_basket
                          </i>
                          Arenda goş
                        </button>
                        <div className="d-flex gap-1">
                          <a href="javascript:;" className="sharelink">
                            <i className="material-icons-outlined">
                              favorite_border
                            </i>
                          </a>
                          <div className="dropdown position-relative">
                            <a
                              href="javascript:;"
                              className="sharelink dropdown-toggle dropdown-toggle-nocaret"
                              data-bs-auto-close="outside"
                              data-bs-toggle="dropdown"
                            >
                              <i className="material-icons-outlined">share</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-share shadow-lg border-0 p-3">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control ps-5"
                                  value="https://www.codervent.com"
                                  placeholder="Enter Url"
                                />
                                <span className="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50">
                                  link
                                </span>
                                <span className="input-group-text gap-1">
                                  <i className="material-icons-outlined fs-6">
                                    content_copy
                                  </i>
                                  Copy link
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2 mt-3">
                                <button className="py-1 px-3 border-0 rounded bg-pinterest text-white flex-fill d-flex gap-1">
                                  <i className="bi bi-pinterest"></i>Pinterest
                                </button>
                                <button className="py-1 px-3 border-0 rounded bg-facebook text-white flex-fill d-flex gap-1">
                                  <i className="bi bi-facebook"></i>Facebook
                                </button>
                                <button className="py-1 px-3 border-0 rounded bg-linkedin text-white flex-fill d-flex gap-1">
                                  <i className="bi bi-linkedin"></i>Linkedin
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
