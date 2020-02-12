import React, { useState } from "react";
import { firebase } from "../../firebase";

export const EditPassword = ({
  showEditPasswordOverlay,
  setShowEditPasswordOverlay
}) => {
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const UpdateProfile = () => {
    var user = firebase.auth().currentUser;
    if (password) {
      user
        .updatePassword({
          password
        })
        .catch(error => {
          setErrMsg(error);
        });
    }

    if (!errMsg) {
      setErrMsg("");
      setPassword("");
      console.log("update successfull");
    } else {
      console.log("update error: ", errMsg);
    }
  };
  return (
    showEditPasswordOverlay && (
      <div className="signup-overlay">
        <h3>Edit Password</h3>
        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="password"
          value={password}
          placeholder="new passowrd"
          onChange={e => setPassword(e.target.value)}
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
              setShowEditPasswordOverlay(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};
