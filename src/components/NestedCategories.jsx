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

  const sortCategories = (cats) => {
    return [...cats].sort((a, b) => a.order - b.order);
  };

  const isCategoryClickable = (category) => {
    const hasChildren = categoryMap[category.id]?.length > 0;
    return category.isPublish || !hasChildren;
  };

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
    const subCategories = categoryMap[category.id] || [];

    return (
      <div key={category.id} className="nav-item">
        <div
          className={`nav-link d-flex align-items-center ${
            selectedCategory === category.id ? "active" : ""
          }`}
          style={{
            padding: "0.5rem 0",
            margin: `0 0 0 ${1.0 * level}rem`,
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
            <i
              className={`material-icons-outlined ms-2 chevron-icon ${
                isExpanded ? "rotated" : ""
              }`}
            >
              chevron_right
            </i>
          )}
        </div>
        {hasChildren && (
          <div
            className={`submenu-wrapper ${isExpanded ? "expanded" : ""}`}
            style={{
              maxHeight: isExpanded ? `${subCategories.length * 40}px` : "0px",
            }}
          >
            <div className="submenu">
              {sortCategories(subCategories).map((subCategory) =>
                renderMobileItem(subCategory, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDesktopSubmenu = (parentId, level) => {
    const subcategories = categoryMap[parentId] || [];
    if (subcategories.length === 0) return null;

    const isHovered = hoveredCategories.includes(parentId);

    return (
      <div
        className={`desktop-submenu ${isHovered ? "visible" : ""}`}
        style={{ zIndex: 1000 + level }}
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
    const hasChildren = categoryMap[category.id]?.length > 0;

    return (
      <button
        className={`
          list-group-item list-group-item-action 
          d-flex justify-content-between align-items-center
          ${selectedCategory === category.id ? "active" : ""}
          ${!isClickable ? "disabled" : ""}
          ${hasChildren ? "has-children" : ""}
        `}
        onClick={() => isClickable && onCategorySelect(category.id)}
      >
        <span>{category.name}</span>
        {hasChildren && <i className="bi bi-chevron-right" />}
      </button>
    );
  };

  return (
    <div className="nested-categories card border-0 shadow-sm rounded-4">
      <style>
        {`
          .nested-categories .submenu-wrapper {
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }

          .nested-categories .chevron-icon {
            transition: transform 0.3s ease;
          }

          .nested-categories .chevron-icon.rotated {
            transform: rotate(90deg);
          }

          .nested-categories .desktop-submenu {
            position: absolute;
            left: 100%;
            top: 0;
            width: 200px;
            opacity: 0;
            visibility: hidden;
            transform: translateX(-10px);
            transition: all 0.3s ease;
          }

          .nested-categories .desktop-submenu.visible {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }

          .nested-categories .has-children:hover {
            background-color: #f8f9fa;
          }

          .nested-categories .list-group-item.active {
            background-color: #0d6efd;
            border-color: #0d6efd;
            color: white;
          }

          .nested-categories .list-group-item {
            transition: all 0.2s ease;
          }
        `}
      </style>
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
