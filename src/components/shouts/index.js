import React, { useEffect, useState } from "react";
import { useShouts } from "../../hooks";
import { collatedShouts } from "../../constants";
import moment from "moment";
import { getTitle, getCollatedTitle, CollatedShoutsExist } from "../../helpers";
import { useSelectedCategoryValue, useCategoriesValue } from "../../context";
import { AddShout } from "./add";
import { ShoutItem } from "./item";
import { firebase } from "../../firebase";

export const ShoutList = () => {
  //const shouts = [];
  const { selectedCategory } = useSelectedCategoryValue();
  const { categories } = useCategoriesValue();
  const { shouts } = useShouts(selectedCategory);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let categoryName = "";

  const VarifyUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setIsAuthenticated(true);
      }
    });
  };
  if (CollatedShoutsExist(selectedCategory) && selectedCategory) {
    categoryName = getCollatedTitle(collatedShouts, selectedCategory).name;
  }

  if (
    categories &&
    categories.length > 0 &&
    selectedCategory &&
    !CollatedShoutsExist(selectedCategory)
  ) {
    categoryName = getTitle(categories, selectedCategory).name;
  }

  useEffect(() => {
    document.title = `${categoryName}: Shouts`;
  });
  VarifyUser();

  return (
    <div className="tasks">
      <h3>{categoryName}</h3>
      {shouts && shouts.length > 0 ? (
        <ul className="tasks__list">
          {shouts.map(shout => (
            <li key={`${shout.id}`}>
              <ShoutItem shout={shout} />
            </li>
          ))}
        </ul>
      ) : (
        <h4>No current shouts</h4>
      )}
      {isAuthenticated ? <AddShout /> : null}
    </div>
  );
};
