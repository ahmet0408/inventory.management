const Breadcrumb = ({ items }) => {
  return (
    <div className="d-flex align-items-center flex-nowrap">
      <nav aria-label="breadcrumb" className="ps-3 pb-2 w-100 d-sm-none">
        <ol className="breadcrumb mb-0 p-0 flex-nowrap overflow-auto">
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${
                index === items.length - 2 ? "active" : ""
              } ${index === 0 ? "text-primary" : ""}`}
            >
              {item}
            </li>
          ))}
        </ol>
      </nav>
      <nav
        aria-label="breadcrumb"
        className="pb-2 pt-0 mt-0 d-none d-sm-block ms-1"
      >
        <ol className="breadcrumb mb-0 p-0">
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${
                index === items.length - 2 ? "active" : ""
              } ${index === 0 ? "text-primary" : ""}`}
            >
              {item}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
