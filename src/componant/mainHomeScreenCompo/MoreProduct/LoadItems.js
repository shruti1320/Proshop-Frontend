import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Products from "./Products";
import { ProductData, responsive } from "./Data";
import { selectMostSearchedProducts } from "../../../Slices/productSlice";
import { useSelector } from "react-redux";

export default function SmartphoneDeals() {
  const product = ProductData.map((item) => (
    <Products name={item.name} url={item.image} offer={item.offer} />
  ));
  return (
    <div class="row">
      <Carousel responsive={responsive}>{product}</Carousel>;
    </div>
  );
}
