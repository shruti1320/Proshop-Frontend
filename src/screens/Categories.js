import { Outlet } from "react-router-dom";
import Directory from "./Directory";
import mouse from "../images/mousebg.jpg";
import camera from "../images/camerabg.jpg";
import phone from "../images/phonebg.jpg";
import laptop from "../images/laptopbg.jpg";
import airpod from "../images/airpodsbg.jpg";
const Categories = () => {
  const categories = [
    {
      id: 1,
      title: "Laptops",
      imageUrl: laptop,
    },
    {
      id: 2,
      title: "Mobile Phone",
      imageUrl: phone,
    },
    {
      id: 3,
      title: "Airpods",
      imageUrl: airpod,
    },
    {
      id: 4,
      title: "Mouse",
      imageUrl: mouse,
    },
    {
      id: 5,
      title: "Camera",
      imageUrl: camera,
    },
  ];

  return (
    <div className="mt-5">
    <h2 > Categories </h2>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
};

export default Categories;
