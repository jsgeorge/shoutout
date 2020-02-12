import React, { useState } from "react";
//import PropTypes from "prop-types";
import moment from "moment";
import PropTypes from "prop-types";
import { firebase } from "../firebase";
const db = firebase.firestore();

export const AddCommentOverlay = ({
  shoutId,
  showAddCommentOverlay,
  setShowAddCommentOverlay
}) => {
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
          setShowAddCommentOverlay(false);
        })
        .catch(function(err) {
          console.error(err);
        });
  };
  //   isAuthenticated &&
  //   comment &&
  //   shoutRef
  //     .update({"comment" :
  //       comment,
  //       created: moment().format("MMMM D YYYY"), //collatedDate || ShoutDate,
  //       userId: user.uid,
  //       username: user.displayName
  //     })
  //     .then(() => {
  //       setComment("");
  //       setShowAddCommentOverlay(false);
  //     })
  // );
  //};
  const [comment, setComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  const GetUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setIsAuthenticated(true);
        setUser(user);
      }
    });
  };

  GetUser();
  return (
    showAddCommentOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <h3>Add your comment</h3>
        <input
          className="add-task__content"
          aria-label="Enter your task"
          data-testid="add-task-content"
          type="text"
          value={comment}
          placeholder="add your comment"
          onChange={e => setComment(e.target.value)}
        />
        <button
          type="button"
          className="add-task__submit"
          data-testid="add-shout"
          onClick={() => AddComment(shoutId)}
        >
          Submit
        </button>
        <button
          onClick={() => {
            setShowAddCommentOverlay(false);
          }}
          onKeyDown={() => {
            setShowAddCommentOverlay(false);
          }}
        >
          Cancel
        </button>
      </div>
    )
  );
};
