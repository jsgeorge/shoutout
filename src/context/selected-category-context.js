import React, { createContext, useContext, useState } from "react";

export const SelectedCategoryContext = createContext();
export const SelectedCategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <SelectedCategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};
export const useSelectedCategoryValue = () =>
  useContext(SelectedCategoryContext);
