import React, { useState } from "react";
import { firebase } from "../../firebase";
import moment from "moment";
//import { firebase } from "../../firebase";
import { noImgURL } from "../../constants";
import { Signin } from "./signin";
import { EditUserProfile } from "./EditUserProfile";
import { EditPassword } from "./EditPassword";

export const User = ({ shouldShowMain = false, showUser, setShowUser }) => {
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showSigninOverlay, setShowSigninOverlay] = useState(true);
  const [showSignupOverlay, setShowSignupOverlay] = useState(true);
  const [showEditProfileOverlay, setShowEditProfileOverlay] = useState(false);
  const [showEditPasswordOverlay, setShowEditPasswordOverlay] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const VerifyUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setIsAuthenticated(true);
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setShowSigninOverlay(showSigninOverlay);
      }
    });
  };
  const LogoutUser = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signout successfull");
        setIsAuthenticated(false);
        setShowMain(false);
        setShowUser(false);
      })
      .catch(error => {
        console.log("SIGNOUT ERROR - ", error);
        //Do something with the error if you want!
      });
  };

  VerifyUser();
  return (
    <div
      className={showUser ? "user user__overlay" : "hide"}
      data-testid="user-comp"
    >
      <div className="user__main" data-testid="user-main">
        <div data-testid="quick-add-task">
          <span
            className="add-task__cancel-x"
            data-testid="add-task-quick-cancel"
            aria-label="Cancel adding task"
            onClick={() => {
              setShowMain(false);
              setShowUser(false);
            }}
            onKeyDown={() => {
              setShowMain(false);
              setShowUser(false);
            }}
            tabIndex={0}
            role="button"
          >
            X
          </span>
        </div>
        {!isAuthenticated ? (
          <div>
            <Signin
              showSigninOverlay={showSigninOverlay}
              setShowSigninOverlay={setShowSigninOverlay}
            />
          </div>
        ) : (
          <div>
            <h3>Your Account Profile</h3>
            <div>
              <p>
                {user.photoURL ? (
                  <img src={user.photoURL} className="photoURLimg" />
                ) : (
                  <img src={noImgURL} className="photoURLimg" />
                )}

                {user.displayName}
              </p>
              <p>{user.email}</p>
              <button
                className="add-task__submit"
                onClick={() => setShowEditProfileOverlay(true)}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setShowEditPasswordOverlay(true)}
                className="add-task__submit"
              >
                Password
              </button>{" "}
              <EditUserProfile
                showEditProfileOverlay={showEditProfileOverlay}
                setShowEditProfileOverlay={setShowEditProfileOverlay}
              />
              <EditPassword
                showEditPasswordOverlay={showEditPasswordOverlay}
                setShowEditPasswordOverlay={setShowEditPasswordOverlay}
              />
            </div>
            <div>
              <button
                className="user__logout"
                onClick={() => LogoutUser()}
                onKeyDown={() => LogoutUser()}
                tabIndex={0}
              >
                Signout
              </button>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};
