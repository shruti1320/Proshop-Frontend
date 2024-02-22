import {
  PRODUCT_LIST_ADD,
  PRODUCT_LIST_REMOVE,
} from "../constants/productOperationConstant";

export const removeProductFromListReducer = (
  state = { products: [] },
  action
) => {

  switch (action.type) {
    case PRODUCT_LIST_REMOVE:
      return {
        ...state,
        products: state.products.filter((x) => x._id !== action.payload.id),
      };

    default:
      return state;
  }
};

export const addProductToListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_ADD:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    default:
      return state;
  }
};
