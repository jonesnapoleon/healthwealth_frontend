import React, { useEffect } from "react";
// import MainNavigation from "components/Skeleton/MainNavigation";
import BottomNavigation from "components/Skeleton/BottomNavigation";
// import Scrollable from "components/Common/Scrollable";
import { useQuery } from "react-query";
import { getProductList } from "api/product";
import { useSnackbar } from "contexts/SnackbarContext";
// import { useData } from "contexts/DataContext";
import TopBar from "components/Skeleton/TopBar";
import { Typography } from "@material-ui/core";
// import ProductCard from "components/Common/ProductCard";

const Home = () => {
  const { data, error, isLoading } = useQuery("getProductList", getProductList);
  const { addSnackbar } = useSnackbar();
  // const { data, setData } = useData();

  useEffect(() => {
    if (error) addSnackbar(error);
  }, [error, addSnackbar]);
  // useEffect(() => {
  //   if (data) setData(data);
  // }, [data, setProducts]);

  return (
    <div>
      <TopBar />

      <div className="wrapper">
        <Typography variant="h1" color="textPrimary">
          Rekomendasi untukmu
        </Typography>
        <div className="flex-wrap"></div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Home;
