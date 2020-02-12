import { useState, useEffect } from "react";
import moment from "moment";
import { firebase } from "../firebase";

import { CollatedShoutsExist } from "../helpers";

export const useShouts = selectedCategory => {
  const [shouts, setShouts] = useState([]);
  const [archivedShouts, setArchivedShouts] = useState([]);
  const [curUserId, setCurUserId] = useState("");
  const GetUser = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        setCurUserId(user.uid);
      }
    });
  };
  GetUser();
  useEffect(() => {
    let unsubscribe = firebase.firestore().collection("shoutouts");

    unsubscribe =
      selectedCategory && !CollatedShoutsExist(selectedCategory)
        ? (unsubscribe = unsubscribe.where(
            "categoryId",
            "==",
            selectedCategory
          ))
        : selectedCategory === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "created",
            "==",
            moment().format("MMMM D YYYY")
          ))
        : // : selectedCategory === "INBOX" || selectedCategory === 0
        // ? (unsubscribe = unsubscribe.where("created", "==", ""))
        selectedCategory === "CURUSER" || selectedCategory === 0
        ? (unsubscribe = unsubscribe.where("userId", "==", curUserId))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newShouts = snapshot.docs.map(shout => ({
        id: shout.id,
        ...shout.data()
      }));

      setShouts(
        selectedCategory === "LAST-7"
          ? newShouts.filter(
              shout =>
                moment().diff(moment(shout.created, "MMMM D YYYY"), "days") <=
                  7 && shout.archived !== true
            )
          : newShouts.filter(shout => shout.archived !== true)
      );

      setArchivedShouts(newShouts.filter(shout => shout.archived !== false));
    });
    return () => unsubscribe();
  }, [selectedCategory]);

  return { shouts, archivedShouts };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("categories3")
      .orderBy("categoryId")
      .get()
      .then(snapshot => {
        const allCategories = snapshot.docs.map(category => ({
          ...category.data(),
          docId: category.id
        }));

        if (JSON.stringify(allCategories) !== JSON.stringify(categories)) {
          setCategories(allCategories);
        }
      });
  }, [categories]);
  return { categories, setCategories };
};
