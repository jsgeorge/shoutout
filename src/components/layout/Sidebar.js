import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendar,
  FaRegCalendarAlt,
  FaListAlt,
  FaUsers,
  FaUser
} from "react-icons/fa";
import { Categories } from "../categories";
import { useSelectedCategoryValue } from "../../context";
import { AddCategory } from "../categories/add";

export const Sidebar = ({
  showSidebarMain = true,
  shouldShowMain = false,
  showMobileMenu,
  setShowMobileMenu
}) => {
  const { setSelectedCategory } = useSelectedCategoryValue();
  const [active, setActive] = useState("all");
  const [showCategories, setShowCategories] = useState(true);
  const [showMain, setShowMain] = useState(shouldShowMain);

  return (
    //--------------------------------------------
    <div className="sidebar" data-testid="sidebar">
      <h3>Sidebar</h3>
      <ul className="sidebar__generic">
        <li
          data-testid="allUsers"
          className={active === "allusers" ? "active" : undefined}
        >
          <div
            role="button"
            onClick={() => {
              setActive("allUsers");
              setSelectedCategory("ALLUSERS");
            }}
          >
            <span>
              <FaUsers />
            </span>
            <span>All Users</span>
          </div>
        </li>
        <li
          data-testid="curUser"
          className={active === "curuser" ? "active" : undefined}
        >
          <div
            role="button"
            onClick={() => {
              setActive("curUser");
              setSelectedCategory("CURUSER");
            }}
          >
            <span>
              <FaUser />
            </span>
            <span>Your Shouts</span>
          </div>
        </li>
      </ul>
      <ul className="sidebar__generic">
        <li
          data-testid="all"
          className={active === "all" ? "active" : undefined}
        >
          <div
            data-testid="all-action"
            aria-label="Show all shouts"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("all");
              setSelectedCategory("ALL");
            }}
          >
            <span>
              <FaListAlt />
            </span>
            <span>All days</span>
          </div>
        </li>
        {/* <li
          data-testid="inbox"
          className={active === "inbox" ? "active" : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox shouts"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("inbox");
              setSelectedCategory("INBOX");
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li> */}
        <li
          data-testid="today"
          className={active === "today" ? "active" : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show today's tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("today");
              setSelectedCategory("TODAY");
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="last-7"
          className={active === "last-7" ? "active" : undefined}
        >
          <div
            data-testid="last-7-action"
            aria-label="Show shouts for the last 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("last-7");
              setSelectedCategory("LAST-7");
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Last 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar_middle"
        aria-label="Show/hide shouts"
        onClick={() => setShowCategories(!showCategories)}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showCategories ? "hidden-projects" : undefined}
          />
        </span>
        <h3>Categories</h3>
      </div>
      <ul className="sidebar__projects">{showCategories && <Categories />}</ul>
      {showCategories && <AddCategory />}
    </div>
  );
};
