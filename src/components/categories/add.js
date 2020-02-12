import React, { useState } from "react";
import PropTypes from "prop-types";
import { firebase } from "../../firebase";
import { generatePushId } from "../../helpers";
import { useCategoriesValue } from "../../context";
import { currentuserid } from "../../constants";

export const AddCategory = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [categoryName, setCategoryName] = useState("");

  const categoryId = generatePushId();
  const { categories, setCategories } = useCategoriesValue();

  const addCategory = () =>
    categoryName &&
    firebase
      .firestore()
      .collection("categories3")
      .add({
        categoryId,
        name: categoryName,
        userId: currentuserid
      })
      .then(() => {
        setCategories([...categories]);
        setCategoryName("");
        setShow(false);
      });

  return (
    <div className="add-project" data-testid="add-Category">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            className="add-project__name"
            data-testid="Category-name"
            type="text"
            placeholder="Name your Category"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addCategory()}
            data-testid="add-project-submit"
          >
            Add Category
          </button>
          <span
            aria-label="Cancel adding Category"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={() => setShow(false)}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Category"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={() => setShow(!show)}
        role="button"
        tabIndex={0}
      >
        Add Category
      </span>
    </div>
  );
};
