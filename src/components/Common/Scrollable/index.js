// import React from "react";
// import Typography from "@material-ui/core/Typography";
// import ProductCard from "../ProductCard";
// import "./index.scss";

// const Scrollable = ({
//   products,
//   bgColor = "var(--primary-color)",
//   headingText,
//   isLoading,
// }) => {
//   return (
//     <div className="scrollable-up">
//       <div className="item-container-between">
//         <Typography display="inline" variant="h1">
//           {headingText}
//         </Typography>
//       </div>
//       <ul
//         style={{ backgroundColor: bgColor }}
//         className={`horizontal-scrollable-wrapper ${
//           products && products?.length > 0 ? "" : "no-template"
//         }`}
//       >
//         {products && products?.length > 0 ? (
//           products?.map((product, i) => (
//             <li key={i}>
//               <ProductCard product={product} />
//             </li>
//           ))
//         ) : (
//           <li className="center-product-item">
//             <Typography variant="h2" align="center">
//               {!isLoading ? "Tidak ada hasil" : "Loading..."}
//             </Typography>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Scrollable;
