import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../../firebase";
import { useSelectedCategoryValue } from "../../context";
import { CategoryOverlay } from "../CategoryOverlay";
//import { ShoutDate } from "../ShoutDate";
//import { currentuserid, username } from "../../constants";
import { noImgURL } from "../../constants";

export const AddShout = ({
  showAddShoutMain = true,
  shouldShowMain = false,
  showQuickAddShout,
  setShowQuickAddShout
}) => {
  const [shout, setShout] = useState("");
  //const [ShoutDate, setShoutDate] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [showShoutDate, setShowShoutDate] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const { selectedCategory } = useSelectedCategoryValue();

  const GetUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setIsAuthenticated(true);
        setUser(user);
        setPhotoURL(user.photoURL);
      }
    });
  };
  const AddShout = () => {
    const categoryId = category || selectedCategory;
    let collatedDate = "";

    if (categoryId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (categoryId === "LAST-7") {
      collatedDate = moment()
        .add(7, "days")
        .format("DD/MM/YYYY");
    }

    return (
      isAuthenticated &&
      shout &&
      categoryId &&
      firebase
        .firestore()
        .collection("shoutouts")
        .add({
          archived: false,
          categoryId,
          shout,
          created: moment().format("MMMM D YYYY"), //collatedDate || ShoutDate,
          userId: user.uid,
          username: user.displayName,
          photoURL: photoURL,
          comments: []
        })
        .then(() => {
          setShout("");
          setCategory("");
          setShowMain("");
          setShowCategoryOverlay(false);
        })
    );
  };
  GetUser();

  return (
    <div
      className={showQuickAddShout ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddShoutMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={() => setShowMain(!showMain)}
          tabIndex={0}
          aria-label="Add shout"
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">
            {user.photoURL ? (
              <img src={user.photoURL} className="photoURLimg" />
            ) : (
              <img src={noImgURL} className="photoURLimg" />
            )}
            New Shout
          </span>
        </div>
      )}

      {(showMain || showQuickAddShout) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddShout && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">
                  {user.photoURL ? (
                    <img src={user.photoURL} className="photoURLimg" />
                  ) : (
                    <img src={noImgURL} className="photoURLimg" />
                  )}
                  Add Shout
                </h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowCategoryOverlay(false);
                    setShowQuickAddShout(false);
                  }}
                  onKeyDown={() => {
                    setShowMain(false);
                    setShowCategoryOverlay(false);
                    setShowQuickAddShout(false);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <CategoryOverlay
            setCategory={setCategory}
            setCategoryName={setCategoryName}
            showCategoryOverlay={showCategoryOverlay}
            setShowCategoryOverlay={setShowCategoryOverlay}
          />
          {/* <ShoutDate
            setShoutDate={setShoutDate}
            showShoutDate={showShoutDate}
            setShowShoutDate={setShowShoutDate}
          /> */}
          <textarea
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={shout}
            rows="10"
            placeholder="new shoutout"
            onChange={e => setShout(e.target.value)}
          />
          <p style={{ fontSize: "14px" }}>
            {" "}
            <strong> Category: </strong>
            {categoryName ? categoryName : <span>No category selected</span>}
          </p>
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-shout"
            onClick={() =>
              showQuickAddShout
                ? AddShout() && setShowQuickAddShout(false)
                : AddShout()
            }
          >
            Shout
          </button>
          {!showQuickAddShout && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowCategoryOverlay(false);
              }}
              onKeyDown={() => {
                setShowMain(false);
                setShowCategoryOverlay(false);
              }}
              aria-label="Cancel adding a shout"
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowCategoryOverlay(!showCategoryOverlay)}
            onKeyDown={() => setShowCategoryOverlay(!showCategoryOverlay)}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowShoutDate(!showShoutDate)}
            onKeyDown={() => setShowShoutDate(!showShoutDate)}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
