import { Link } from "react-router-dom";

const Order = () => {
  return (
    <>
      <div className="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-medium flex-wrap font-text1"></div>

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
        <div className="col-auto flex-grow-1 overflow-auto">
          <div className="btn-group position-static">
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn border btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Payment Status
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn border btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Completed
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group position-static">
              <button
                type="button"
                className="btn border btn-filter dropdown-toggle px-4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More Filters
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="javascript:;">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="d-flex align-items-center gap-2 justify-content-lg-end">
            <button className="btn btn-filter px-4">
              <i className="bi bi-box-arrow-right me-2"></i>Export
            </button>
            <Link to="/orderdetail">
              <button
                className="btn btn-primary px-4"
                style={{ background: "#023047" }}
              >
                <i className="bi bi-plus-lg me-2"></i>Täze sargyt
              </button>
            </Link>
          </div>
        </div>
      </div>

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
                    <th>Order Id</th>
                    <th>Price</th>
                    <th>Customer</th>
                    <th>Payment Status</th>
                    <th>Completed Payment</th>
                    <th>Delivery Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>
                      <a href="javascript:;">#2415</a>
                    </td>
                    <td>$98</td>
                    <td>
                      <a
                        className="d-flex align-items-center gap-3"
                        href="javascript:;"
                      >
                        <div className="customer-pic">
                          <img
                            src="assets/images/avatars/01.png"
                            className="rounded-circle"
                            width="40"
                            height="40"
                            alt=""
                          />
                        </div>
                        <p className="mb-0 customer-name fw-bold">
                          Andrew Carry
                        </p>
                      </a>
                    </td>
                    <td>
                      <span className="lable-table bg-success-subtle text-success rounded border border-success-subtle font-text2 fw-bold">
                        Completed<i className="bi bi-check2 ms-2"></i>
                      </span>
                    </td>
                    <td>
                      <span className="lable-table bg-danger-subtle text-danger rounded border border-danger-subtle font-text2 fw-bold">
                        Failed<i className="bi bi-x-lg ms-2"></i>
                      </span>
                    </td>
                    <td>Cash on delivery</td>
                    <td>Nov 12, 10:45 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
