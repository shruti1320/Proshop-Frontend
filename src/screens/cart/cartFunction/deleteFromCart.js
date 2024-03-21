import axios from "axios";
import { removeFromCart } from "../../../Slices/cartSlice";

export const deleteFromCart = async (userId, productId, dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_PATH}/api/users/removecart`,
      { userId, productId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(removeFromCart({ productId: productId }));
  } catch (error) {
    console.log("Error in deleteFromCart", error);
  }
};


