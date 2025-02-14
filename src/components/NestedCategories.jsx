import { useState } from "react";

const NestedCategories = ({ categories, selectedCategory, onCategorySelect, isMobile }) => {
    const [hoveredCategories, setHoveredCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
  
    // Group categories by parent ID
    const categoryMap = categories.reduce((acc, category) => {
      const parentId = category.parentId || 'root';
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
  
    // Check if category is clickable (has no children or is publishable)
    const isCategoryClickable = (category) => {
      const hasChildren = categoryMap[category.id]?.length > 0;
      return category.isPublish || !hasChildren;
    };
  
    // Desktop hover handlers
    const handleMouseEnter = (categoryId) => {
      if (!isMobile) {
        setHoveredCategories(prev => [...prev, categoryId]);
      }
    };
  
    const handleMouseLeave = (categoryId) => {
      if (!isMobile) {
        setHoveredCategories(prev => prev.filter(id => id !== categoryId));
      }
    };
  
    // Mobile expand/collapse handlers
    const toggleExpand = (categoryId, event) => {
      event.stopPropagation();
      setExpandedCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    };
  
    const renderCategoryButton = (category, level = 0) => {
      const hasChildren = categoryMap[category.id]?.length > 0;
      const isExpanded = expandedCategories.includes(category.id);
      const isClickable = isCategoryClickable(category);
  
      return (
        <div key={category.id} className="category-item">
          <button
            className={`
              list-group-item list-group-item-action 
              d-flex justify-content-between align-items-center
              ${selectedCategory === category.id ? 'active' : ''}
              ${!isClickable ? 'disabled' : ''}
            `}
            style={{ paddingLeft: isMobile ? `${level * 1.5}rem` : undefined }}
            onClick={() => isClickable && onCategorySelect(category.id)}
          >
            <span>{category.name}</span>
            {hasChildren && (
              <i 
                className={`bi ${isExpanded ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                onClick={(e) => isMobile && toggleExpand(category.id, e)}
              />
            )}
          </button>
          {isMobile && hasChildren && isExpanded && (
            <div className="nested-categories">
              {sortCategories(categoryMap[category.id]).map(subCategory => 
                renderCategoryButton(subCategory, level + 1)
              )}
            </div>
          )}
        </div>
      );
    };
  
    const renderDesktopSubmenu = (parentId, level) => {
      const subcategories = categoryMap[parentId] || [];
      if (subcategories.length === 0 || !hoveredCategories.includes(parentId)) return null;
      
      return (
        <div 
          className="position-absolute start-100 top-0"
          style={{ width: '200px', zIndex: 1000 + level }}
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
                    {renderCategoryButton(category)}
                    {renderDesktopSubmenu(category.id, level + 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header text-white border-0 rounded-top-4">
          <h6 className="mb-0">Kategoriýalar</h6>
        </div>
        <div className="card-body p-0">
          <div className="list-group list-group-flush">
            <button
              className={`list-group-item list-group-item-action ${!selectedCategory ? 'active' : ''}`}
              onClick={() => onCategorySelect(null)}
            >
              Ähli harytlar
            </button>
            
            {isMobile ? (
              // Mobile view - expandable list
              sortCategories(categoryMap['root'] || []).map(category => 
                renderCategoryButton(category)
              )
            ) : (
              // Desktop view - hover dropdowns
              sortCategories(categoryMap['root'] || []).map(category => (
                <div
                  key={category.id}
                  className="position-relative"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={() => handleMouseLeave(category.id)}
                >
                  {renderCategoryButton(category)}
                  {renderDesktopSubmenu(category.id, 1)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default NestedCategories;