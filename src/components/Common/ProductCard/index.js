// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
// import { FRONTEND_URL } from "utils/constant/routeList";
// import { useHistory } from "react-router-dom";

// const useStyles = makeStyles({
//   root: {
//     width: 160,
//   },
//   media: {
//     width: "100%",
//     maxHeight: 140,
//     minHeight: 100,
//   },
//   content: {
//     padding: ".3rem",
//   },
// });

// const officialBadge =
//   "https://images.tokopedia.net/img/official_store/badge_os.png";
// const rating =
//   "https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/9527c778.svg";

// const ProductCard = ({ product }) => {
//   const classes = useStyles();
//   const history = useHistory();
//   return (
//     <Card
//       className={classes.root}
//       onClick={() => history.push(`${FRONTEND_URL.product}${product?.id}`)}
//     >
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image={product?.product_img}
//           title="Contemplative Reptile"
//         />
//         <CardContent className={classes.content}>
//           <Typography variant="body1" color="textSecondary" component="p">
//             {product?.name}
//           </Typography>
//           <Typography variant="body1" color="textPrimary" component="p">
//             <strong>Rp{product?.price}</strong>
//           </Typography>

//           {product?.current_quota && product?.quota_count && (
//             <Typography variant="body1" color="textSecondary" component="p">
//               Order sekarang: {product?.current_quota} / {product?.quota_count}
//             </Typography>
//           )}

//           {product?.shipping_disc_calc &&
//           product?.shipping_disc_calc !== 0 &&
//           product?.shipping_disc_rate &&
//           product?.shipping_disc_rate !== 0 ? (
//             <Typography variant="body1" color="textPrimary" component="p">
//               Ongkir:{" "}
//               <span className="weak-opacity">
//                 {product?.shipping_disc_calc}
//               </span>{" "}
//               <strong>
//                 {((100 - product?.shipping_disc_rate) / 100) *
//                   product?.shipping_disc_calc}
//               </strong>
//             </Typography>
//           ) : (
//             <></>
//           )}

//           <Typography variant="body1" color="textSecondary" component="p">
//             <img src={officialBadge} alt="" /> {product?.seller_address}
//           </Typography>

//           <Typography variant="body1" color="textSecondary" component="p">
//             <img src={rating} alt="" /> {product?.rating ?? "5.0"}
//           </Typography>

//           <Typography variant="body2" color="textSecondary" component="p">
//             {product?.description}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default ProductCard;
