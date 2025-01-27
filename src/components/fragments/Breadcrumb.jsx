const Breadcrumb = ({ items }) => {
  return (
    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div className="breadcrumb-title pe-3">{items[0]}</div>
      <div className="ps-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 p-0">
          <li className="breadcrumb-item">
            </li>
            <li className="breadcrumb-item cursor-pointer">
              {items[1]}
            </li>            

            {items.slice(2).map((item, index) => (
              <li 
                key={index}  style={{fontSize: "15px",cursor:"pointer"}}
                className={`${index === items.length - 2 ? 'active' : ''}`} 
                aria-current={index === items.length - 2 ? 'page' : undefined}
              ><i class="bi bi-arrow-right mx-1"></i>
                {item}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {/* <div className="ms-auto">
        <div className="btn-group">
          <button type="button" className="btn btn-outline-primary">
            Settings
          </button>
          <button
            type="button"
            className="btn btn-outline-primary split-bg-primary dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
          >
            {" "}
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
            {" "}
            <a className="dropdown-item" href="javascript:;">
              Action
            </a>
            <a className="dropdown-item" href="javascript:;">
              Another action
            </a>
            <a className="dropdown-item" href="javascript:;">
              Something else here
            </a>
            <div className="dropdown-divider"></div>{" "}
            <a className="dropdown-item" href="javascript:;">
              Separated link
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Breadcrumb;
