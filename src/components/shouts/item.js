import React, { useState } from "react";
import moment from "moment";
import { Comments } from "./comments";
import { FaComments, FaHeart } from "react-icons/fa";
import { firebase } from "../../firebase";
import { noImgURL } from "../../constants";
const getNumberOfDays = days => {
  if (days == 0) {
    return "Today";
  } else if (days == 1) {
    return `${days} day ago`;
  } else return `${days} days ago`;
};
const incrementLikes = id => {
  const db = firebase.firestore();
  var sfDocRef = db.collection("shoutouts").doc(id);

  db.runTransaction(function(t) {
    return t.get(sfDocRef).then(function(sfDoc) {
      if (!sfDoc.exists) {
        throw "Document does not exist!";
      }

      var newlikes = 0;
      if (!sfDoc.data().likes) newlikes = 1;
      else newlikes = sfDoc.data.likes + 1;

      t.update(sfDocRef, { likes: newlikes });
      return newlikes;
    });
  })
    .then(function(newlikes) {
      console.log("Likes increased to ", newlikes);
    })
    .catch(function(err) {
      // This will be an "population is too big" error.
      console.error(err);
    });
};
export const ShoutItem = ({ shout }) => {
  const [showComments, setShowComments] = useState(false);

  let todayDate = moment().startOf("day");
  let createdDate = moment(shout.created, "MMMM D YYYY");
  let daysDIff = moment.duration(todayDate.diff(createdDate)).asDays();
  return (
    <div>
      <span>
        {shout.photoURL ? (
          <img src={shout.photoURL} className="photoURLimg" />
        ) : (
          <img src={noImgURL} className="photoURLimg" />
        )}{" "}
        <strong> {shout.username}</strong> 
        <span className="noOfDaysFont">{getNumberOfDays(daysDIff)}</span> <br />
        <p>{shout.shout}</p>
      </span>
      <div
        className="likes"
        onClick={() => incrementLikes(shout.id)}
        role="button"
      >
        <span>
          <FaHeart />
        </span>
        {shout.likes ? shout.likes : 0}
      </div>
      <div
        className="comments"
        onClick={() => setShowComments(true)}
        role="button"
      >
        <span>
          <FaComments />
        </span>
        {shout.comments && shout.comments.length > 0
          ? shout.comments.length
          : 0}
      </div>
      <Comments
        shoutId={shout.id}
        shout={shout}
        showComments={showComments}
        setShowComments={setShowComments}
      />
    </div>
  );
};
