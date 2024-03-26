import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Products from "./Products";
import { ProductData, responsive } from "./Data";
import { selectMostSearchedProducts } from "../../../Slices/productSlice";
import { useSelector } from "react-redux";

export default function SmartphoneDeals() {
  console.log(ProductData,'loaderItem.js')
  const product =ProductData!=undefined && ProductData?.length>0 && ProductData.map((item) => (
    <Products name={item.name} url={item.image} offer={item.offer} />
  ));
  return (
    <div className="row">
      <Carousel responsive={responsive}>{product}</Carousel>;
    </div>
  );
}
