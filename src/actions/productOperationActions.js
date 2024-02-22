import {
  PRODUCT_LIST_ADD,
  PRODUCT_LIST_REMOVE,
} from "../constants/productOperationConstant";
import axios from "axios";

export const listProductRemove = (id, products) => async (dispatch) => {
  try {
    // Make a DELETE request to the endpoint with the product ID
    const {data } = await axios.delete(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`
    );
    dispatch({
      type: PRODUCT_LIST_REMOVE,
      payload: { id, products},
    });
  } catch (error) {}
};

export const listProductAdd = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products/add`,
      payload
    );

    dispatch({
      type: PRODUCT_LIST_ADD,
      payload: data,
    });
  } catch (error) {}
};
