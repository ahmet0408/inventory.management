import React, { useState } from "react";

const NestedCategories = ({
  categories,
  selectedCategory,
  onCategorySelect,
  isMobile,
}) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [hoveredCategories, setHoveredCategories] = useState([]);

  // Group categories by parent ID
  const categoryMap = categories.reduce((acc, category) => {
    const parentId = category.parentId || "root";
    if (!acc[parentId]) {
      acc[parentId] = [];
    }
    acc[parentId].push(category);
    return acc;
  }, {});

  // Sort categories by Order property
  const sortCategories = (cats) => {
    return [...cats].sort((a, b) => a.order - b.order);
  };

  // Check if category is clickable
  const isCategoryClickable = (category) => {
    const hasChildren = categoryMap[category.id]?.length > 0;
    return category.isPublish || !hasChildren;
  };

  // Desktop hover handlers
  const handleMouseEnter = (categoryId) => {
    if (!isMobile) {
      setHoveredCategories((prev) => [...prev, categoryId]);
    }
  };

  const handleMouseLeave = (categoryId) => {
    if (!isMobile) {
      setHoveredCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  // Mobile expand/collapse handlers
  const toggleExpand = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderMobileItem = (category, level = 0) => {
    const hasChildren = categoryMap[category.id]?.length > 0;
    const isExpanded = expandedCategories.includes(category.id);
    const isClickable = isCategoryClickable(category);

    return (
      <div key={category.id} className="nav-item">
        <div
          className={`nav-link d-flex align-items-center ${
            selectedCategory === category.id ? "active" : ""
          }`}
          style={{
            padding: 0,
            marginLeft: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(category.id);
            } else if (isClickable) {
              onCategorySelect(category.id);
            }
          }}
        >
          <div className="d-flex align-items-center flex-grow-1 gap-2">
            <i className="material-icons-outlined">
              {hasChildren
                ? isExpanded
                  ? "folder_open"
                  : "folder"
                : "description"}
            </i>
            <span>{category.name}</span>
          </div>
          {hasChildren && (
            <i className="material-icons-outlined ms-2">
              {isExpanded ? "expand_more" : "chevron_right"}
            </i>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="submenu">
            {sortCategories(categoryMap[category.id]).map((subCategory) =>
              renderMobileItem(subCategory, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDesktopSubmenu = (parentId, level) => {
    const subcategories = categoryMap[parentId] || [];
    if (subcategories.length === 0 || !hoveredCategories.includes(parentId))
      return null;

    return (
      <div
        className="position-absolute start-100 top-0"
        style={{ width: "200px", zIndex: 1000 + level }}
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              {sortCategories(subcategories).map((category) => (
                <div
                  key={category.id}
                  className="position-relative"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={() => handleMouseLeave(category.id)}
                >
                  {renderDesktopItem(category)}
                  {renderDesktopSubmenu(category.id, level + 1)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopItem = (category) => {
    const isClickable = isCategoryClickable(category);
    return (
      <button
        className={`
          list-group-item list-group-item-action 
          d-flex justify-content-between align-items-center
          ${selectedCategory === category.id ? "active" : ""}
          ${!isClickable ? "disabled" : ""}
        `}
        onClick={() => isClickable && onCategorySelect(category.id)}
      >
        <span>{category.name}</span>
        {categoryMap[category.id]?.length > 0 && (
          <i className="bi bi-chevron-right" />
        )}
      </button>
    );
  };

  return (
    <div className="card border-0 shadow-sm rounded-4">
      {isMobile ? (
        <div className="card-body p-0">
          <div className="navbar-nav">
            <div
              className="nav-link d-flex align-items-center"
              onClick={() => onCategorySelect(null)}
            >
              <div className="d-flex align-items-center gap-2">
                <i className="material-icons-outlined">home</i>
                <span>Ähli harytlar</span>
              </div>
            </div>
            {sortCategories(categoryMap["root"] || []).map((category) =>
              renderMobileItem(category)
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="card-header py-3 d-flex align-items-center text-white border-0 rounded-top-4">
            <h6 className="mb-0 text-uppercase">Kategoriýalar</h6>
          </div>
          <hr className="m-0" />
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              <button
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                className={`list-group-item list-group-item-action ${
                  !selectedCategory ? "active" : ""
                }`}
                onClick={() => onCategorySelect(null)}
              >
                Ähli harytlar
              </button>
              {sortCategories(categoryMap["root"] || []).map((category) => (
                <div
                  key={category.id}
                  className="position-relative"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={() => handleMouseLeave(category.id)}
                >
                  {renderDesktopItem(category)}
                  {renderDesktopSubmenu(category.id, 1)}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NestedCategories;
