import React, { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { firebase } from "../../firebase";
import { noImgURL } from "../../constants";
import { AddCommentOverlay } from "../AddCommentOverlay";
const db = firebase.firestore();
const getNumberOfDays = days => {
  if (days == 0) {
    return "Today";
  } else if (days == 1) {
    return `${days} day ago`;
  } else return `${days} days ago`;
};
export const Comments = ({ shoutId, shout, showComments, setShowComments }) => {
  const [showAddCommentOverlay, setShowAddCommentOverlay] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [comment, setComment] = useState("");
  let todayDate = moment().startOf("day");
  //const [showMain, setShowMain] = useState(shouldShowMain);
  const [user, setUser] = useState("");
  //const shoutItem = shout.data();

  const AddComment = id => {
    const shoutRef = db.collection("shoutouts").doc(id);
    const newComment = {
      comment,
      created: moment().format("MMMM D YYYY"), //collatedDate || ShoutDate,
      userId: user.uid,
      username: user.displayName
    };

    isAuthenticated &&
      comment &&
      db
        .runTransaction(t => {
          return t.get(shoutRef).then(doc => {
            // doc doesn't exit cant udate
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log(!doc.get("comments"));
            // else update comments array fter getting it from firestore
            // if (!doc.comments) {
            //   console.log(
            //     "comments does not exist. creating a new comment array field with new values"
            //   );
            let newCommentsArray = [];
            if (doc.get("comments")) newCommentsArray = doc.get("comments");
            newCommentsArray.push(newComment);

            t.set(shoutRef, { comments: newCommentsArray }, { merge: true });
            // } else {
            // const newCommentsArray = doc.get("comments").push(newComment);
            // t.set(shoutRef, { comments: newCommentsArray }, { merge: true });
            // // }
          });
        })
        .then(function() {
          console.log("New comment added succesffully");
          setComment("");
          //setShowAddCommentOverlay(false);
        })
        .catch(function(err) {
          console.error(err);
        });
  };
  const GetUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setIsAuthenticated(true);
        setUser(user);
      }
    });
  };

  GetUser();
  //const comments = db.collection('shouts').("created", "desc");

  const showCreated = created => {
    let createdDate = moment(created, "MMMM D YYYY");
    let daysDIff = moment.duration(todayDate.diff(createdDate)).asDays();
    return daysDIff;
  };
  let createdDate = moment(shout.created, "MMMM D YYYY");
  let daysDIff = moment.duration(todayDate.diff(createdDate)).asDays();

  return (
    <div
      className={showComments ? "add-comment add-comment__overlay" : "hide"}
      data-testid="add-comment-comp"
    >
      {showComments && (
        <div className="add-comment__main" data-testid="add-comment-main">
          {showComments && (
            <>
              <div data-testid="quick-add-comment">
                <span>
                  {shout.photoURL ? (
                    <img src={shout.photoURL} className="photoURLimg" />
                  ) : (
                    <img src={noImgURL} className="photoURLimg" />
                  )}{" "}
                  <strong> {shout.username}</strong>
                  <span className="noOfDaysFont">
                    {getNumberOfDays(daysDIff)}
                  </span>{" "}
                  <br />
                  <p>{shout.shout}</p>
                </span>
                <div>
                  {shout.comments && shout.comments.length > 0 ? (
                    <h2 className="header">Comments</h2>
                  ) : (
                    <h4>No comments yet</h4>
                  )}
                  <span
                    className="add-comment__cancel-x"
                    data-testid="add-comment-quick-cancel"
                    aria-label="Cancel adding task"
                    onClick={() => {
                      setShowComments(false);
                    }}
                    onKeyDown={() => {
                      setShowComments(false);
                    }}
                    tabIndex={0}
                    role="button"
                  >
                    X
                  </span>
                </div>
                <br />
                {isAuthenticated ? (
                  <div>
                    {/* <button
                    onClick={() => {
                      setShowAddCommentOverlay(true);
                    }}
                  >
                    Add your comment
                  </button> */}
                    {/* <AddCommentOverlay
                    shoutId={shoutId}
                    showAddCommentOverlay={showAddCommentOverlay}
                    setShowAddCommentOverlay={setShowAddCommentOverlay}
                  /> */}
                    <div style={{ clear: "left" }}>
                      {user.photoURL ? (
                        <img src={user.photoURL} className="photoURLimg" />
                      ) : (
                        <img src={noImgURL} className="photoURLimg" />
                      )}
                      {user.displayName}

                      <br />
                    </div>{" "}
                    <input
                      className="add-comment__content"
                      aria-label="Enter your task"
                      data-testid="add-comment-content"
                      type="text"
                      value={comment}
                      placeholder="add your comment"
                      onChange={e => setComment(e.target.value)}
                    />
                    <button
                      type="button"
                      className="add-comment__submit"
                      data-testid="add-shout"
                      onClick={() => AddComment(shoutId)}
                    >
                      Submit
                    </button>
                  </div>
                ) : null}
                <div>
                  {shout.comments && shout.comments.length > 0 ? (
                    <ul>
                      {" "}
                      {shout.comments.map(c => (
                        <li key={c.comment} style={{ display: "block" }}>
                          <strong>{c.username}</strong>
                          <span className="noOfDaysFont">
                            {getNumberOfDays(showCreated(c.created))}
                          </span>
                          {c.comment}
                        </li>
                      ))}{" "}
                    </ul>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
