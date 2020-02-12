import React, { useState } from "react";
import "./App.scss";
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { CategoriesProvider, SelectedCategoryProvider } from "./context";

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  console.log("darkMode", darkMode);
  return (
    <SelectedCategoryProvider>
      <CategoriesProvider>
        <div className="App">
          <main className={darkMode ? "darkMode" : undefined}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Content darkMode={darkMode} setDarkMode={setDarkMode} />
          </main>
        </div>
      </CategoriesProvider>
    </SelectedCategoryProvider>
  );
};
