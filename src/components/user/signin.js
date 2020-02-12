import React, { useState } from "react";
import { firebase } from "../../firebase";
import { Signup } from "./signup";

export const Signin = ({ showSigninOverlay, setShowSigninOverlay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showSignupOverlay, setShowSignupOverlay] = useState(false);

  const LoginUser = () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("signin successfull");
        setShowSigninOverlay(false);
        // setIsLoggedIn(true);
        setErrMsg("");
      })
      .catch(error => {
        console.log("SIGIN ERROR - ", error.message);
        setErrMsg(error.message);
        //Do something with the error if you want!
      });
  };

  return (
    showSigninOverlay && (
      <div>
        <h3>Signin</h3>

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
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        {errMsg ? (
          <div className="errMsgFont">Login Error. {errMsg}</div>
        ) : null}
        <button
          type="button"
          className="add-task__submit"
          data-testid="add-shout"
          onClick={() => LoginUser()}
        >
          Login
        </button>

        <div>
          New User{" "}
          <button onClick={() => setShowSignupOverlay(true)}>Register</button>
        </div>
        <Signup
          showSignupOverlay={showSignupOverlay}
          setShowSignupOverlay={setShowSignupOverlay}
        />
      </div>
    )
  );
};
