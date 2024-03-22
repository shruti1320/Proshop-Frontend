
import { removeFromCart } from "../../../Slices/cartSlice";
import {removeProductFromCartHandler} from '../../../service/product.js'
export const deleteFromCart = async (userId, productId, dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const response = await removeProductFromCartHandler( { userId, productId })
    
    
    dispatch(removeFromCart({ productId: productId }));
  } catch (error) {
    console.log("Error in deleteFromCart", error);
  }
};


