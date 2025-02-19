const Breadcrumb = ({ items }) => {
  return (
    <div className="d-flex align-items-center flex-nowrap mb-2">
      <nav aria-label="breadcrumb" className="px-2 pt-2 w-100 d-sm-none">
        <ol className="breadcrumb mb-0 pt-0 overflow-auto">
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
      <nav aria-label="breadcrumb" className="py-2 mt-0 d-none d-sm-block ms-1">
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
