import React from "react";
//import PropTypes from "prop-types";
import { useCategoriesValue } from "../context";

export const CategoryOverlay = ({
  setCategory,
  setCategoryName,
  showCategoryOverlay,
  setShowCategoryOverlay
}) => {
  const { categories } = useCategoriesValue();

  return (
    categories &&
    showCategoryOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {categories.map(category => (
            <li key={category.categoryId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setCategory(category.categoryId);
                  setCategoryName(category.name);
                  setShowCategoryOverlay(false);
                }}
                onKeyDown={() => {
                  setCategory(category.categoryId);
                  setCategoryName(category.name);
                  setShowCategoryOverlay(false);
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the shout category"
              >
                {category.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
