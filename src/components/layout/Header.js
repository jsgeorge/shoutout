import React, { useState } from "react";
import { AddShout } from "../shouts/add";
import { User } from "../user";
import { Sidebar } from "../layout/Sidebar2";
import { FaPizzaSlice, FaBars, FaUser } from "react-icons/fa";
import { firebase } from "../../firebase";
//import PropTypes from 'prop-types';

export const Header = ({ darkMode, setDarkMode }) => {
  //const x = 1;
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddShout, setShowQuickAddShout] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const VarifyUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setIsAuthenticated(true);
      }
    });
  };

  VarifyUser();
  console.log("showUser:", showUser);
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">ShoutOUT</div>
        <div className="settings">
          <ul>
            {isAuthenticated ? (
              <li className="settings__add">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuickAddShout(true);
                    setShouldShowMain(true);
                  }}
                >
                  +
                </button>
              </li>
            ) : null}
            <li className="settings__user">
              <button
                type="button"
                onClick={() => {
                  setShowUser(true);
                  setShouldShowMain(true);
                }}
              >
                <FaUser />
              </button>
            </li>
            <li className="settings__menu">
              <button
                type="button"
                onClick={() => {
                  setShowMobileMenu(!showMobileMenu);
                  setShouldShowMain(!showMobileMenu);
                }}
              >
                <FaBars />
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                type="button"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <AddShout
        showAddShoutMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddShout={showQuickAddShout}
        setShowQuickAddShout={setShowQuickAddShout}
      />
      <User
        shouldShowMain={shouldShowMain}
        showUser={showUser}
        setShowUser={setShowUser}
      />
      <Sidebar
        showSidebarMain={false}
        shouldShowMain={shouldShowMain}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
    </header>
  );
};
