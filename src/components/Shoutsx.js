// import React from "react";
// import { useShouts } from "../hooks";
// import { collatedShouts } from "../constants";
// import moment from "moment";
// import { getTitle, getCollatedTitle, CollatedShoutsExist } from "../helpers";
// import { useSelectedCategoryValue, useCategoriesValue } from "../context";
// import { AddShout } from "../components/shouts/add";
// export const Shouts = () => {
//   //const shouts = [];
//   const { selectedCategory } = useSelectedCategoryValue();
//   const { categories } = useCategoriesValue();
//   const { shouts } = useShouts(selectedCategory);

//   console.log(selectedCategory);
//   console.log("shouts length ", shouts.length);
//   let categoryName = "";

//   // if (
//   //   categories &&
//   //   categories.length > 0 &&
//   //   selectedCategory &&
//   //   !CollatedShoutsExist(selectedCategory)
//   // ) {
//   //   categoryName = getTitle(shouts, selectedCategory).name;
//   //   console.log(categoryName);
//   // }
//   if (CollatedShoutsExist(selectedCategory) && selectedCategory) {
//     categoryName = getCollatedTitle(collatedShouts, selectedCategory).name;
//   }
//   console.log(categoryName);
//   // const formatTimestamp = timestamp => {
//   //   //var format = new DateFormat("d MMM, hh:mm a");
//   //   var date = new DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
//   //   return date; //format.format(date);
//   // };

//   return (
//     <div className="tasks">
//       <h3>{categoryName}</h3>
//       {shouts && shouts.length > 0 ? (
//         <ul className="tasks__list">
//           {shouts.map(shout => (
//             <li key={`${shout.id}`}>
//               <span>
//                 <strong>{shout.username}</strong>
//                 {shout.shout}
//                 {/* {formatTimestamp(shout.created)} */}
//                 {/* {moment().from(shout.created)} */}
//               </span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <h5>No current shoutouts</h5>
//       )}
//       <AddShout />
//     </div>
//   );
// };
