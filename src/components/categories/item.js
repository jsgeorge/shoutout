import React, { useState } from "react";
import { faTrashAlt } from "react-icons";
import { useCategoriesValue, useSelectedCategoryValue } from "../../context";
import { firebase } from "../../firebase";

export const CategoryItem = ({ category }) => {
  const { showConfirm, setShowConfirm } = useState(false);
  const { categories, setCategory } = useCategoriesValue();
  const { setSelectedCateory } = useSelectedCategoryValue();

  return (
    <div>
      <span className="sidebar__project-name">{category.name}</span>
    </div>
  );
};
