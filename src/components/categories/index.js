import React, { useState } from "react";

import { useSelectedCategoryValue, useCategoriesValue } from "../../context";
import { CategoryItem } from "./item";

export const Categories = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedCategory } = useSelectedCategoryValue();
  const { categories } = useCategoriesValue();

  if (!categories || categories.length === 0)
    return <span>No Current Categories</span>;

  return (
    <span>
      {/* <li
        className={
          active === "0" ? "active sidebar__project" : "sidebar__project"
        }
        onClick={() => {
          setActive(0);
          setSelectedCategory(0);
        }}
      >
        <div>
          <span className="sidebar__project-name">All</span>
        </div>
      </li> */}
      {categories &&
        categories.map(category => (
          <li
            key={category.docId}
            data-doc-id={category.docId}
            data-testid="category-value"
            className={
              active === category.categoryId
                ? "active sidebar__project"
                : "sidebar__project"
            }
            onClick={() => {
              setActive(category.categoryId);
              console.log(category.categoryId);
              setSelectedCategory(category.categoryId);
            }}
          >
            {/* {("Shout", JSON.stringify(category))} */}
            <CategoryItem category={category} />
          </li>
        ))}
    </span>
  );
};
