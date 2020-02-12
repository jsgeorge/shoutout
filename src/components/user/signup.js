import React, { useState } from "react";
import { firebase } from "../../firebase";

export const Signup = ({ showSignupOverlay, setShowSignupOverlay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const RegisterUser = () => {
    return (
      email &&
      password &&
      displayName &&
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          var user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: displayName
            })
            .catch(error => {
              console.log(error);
            });
          setShowSignupOverlay(false);
          console.log("signup successfull");
        })
        .catch(error => {
          console.log("Regiser ERROR - ", error);
          //Do something with the error if you want!
        })
    );
  };
  return (
    showSignupOverlay && (
      <div className="signup-overlay">
        <h3>Signup</h3>

        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="text"
          value={displayName}
          placeholder="Username"
          onChange={e => setDisplayName(e.target.value)}
        />
        <button
          type="button"
          className="add-task__submit"
          data-testid="add-shout"
          onClick={() => RegisterUser()}
        >
          Register
        </button>
        <div>
          Returning User{" "}
          <button onClick={() => setShowSignupOverlay(false)}>Sign In</button>
        </div>
      </div>
    )
  );
};
