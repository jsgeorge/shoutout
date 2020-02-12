import React, { useState } from "react";
import { firebase } from "../../firebase";

export const EditUserProfile = ({
  showEditProfileOverlay,
  setShowEditProfileOverlay
}) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const UpdateProfile = () => {
    var user = firebase.auth().currentUser;
    if (displayName) {
      user
        .updateProfile({
          displayName: displayName
        })
        .catch(error => {
          setErrMsg(error);
        });
    }
    if (photoURL) {
      user
        .updateProfile({
          photoURL: photoURL
        })
        .catch(error => {
          setErrMsg(error);
        });
    }
    if (email) {
      user.updateEmail(email).catch(error => {
        setErrMsg(error);
      });
    }
    if (!errMsg) {
      setErrMsg("");
      setDisplayName("");
      setEmail("");
      setPhotoURL("");
      console.log("update successfull");
    } else {
      console.log("update error: ", errMsg);
    }
  };
  return (
    showEditProfileOverlay && (
      <div className="signup-overlay">
        <h3>Edit Profile</h3>
        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="email"
          value={email}
          placeholder="new email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="text"
          value={displayName}
          placeholder="New display name"
          onChange={e => setDisplayName(e.target.value)}
        />
        {photoURL ? (
          <img src={photoURL} className="photoURLimg" />
        ) : (
          <img
            src="https://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
            className="photoURLimg"
          />
        )}
        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          placeholder="enter photoURL"
          type="text"
          value={photoURL}
          onChange={e => setPhotoURL(e.target.value)}
        />
        {errMsg ? <div className="errorMsg">{errMsg}</div> : null}

        <button
          type="button"
          className="add-task__submit"
          data-testid="add-shout"
          onClick={() => UpdateProfile()}
        >
          Submit
        </button>
        <div>
          <button
            onClick={() => {
              setShowEditProfileOverlay(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};
