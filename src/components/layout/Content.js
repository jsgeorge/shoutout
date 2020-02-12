import React from "react";
import { Sidebar } from "./Sidebar2";
import { ShoutList } from "../shouts";
export const Content = ({ darkMode, setDarkMode }) => {
  return (
    <div className="container">
      <Sidebar />
      <ShoutList />
    </div>
  );
};
