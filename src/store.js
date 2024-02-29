import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartSlice from "./Slices/cartSlice";
import {
  orderCreateReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";
import productSlice from "./Slices/productSlice";
import userSlice from "./Slices/userSlice.js";
import OrderSlice from "./Slices/OrderSlice.js";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  product: productSlice,
  // removeProduct: removeProductFromListReducer,
  // addProduct: addProductToListReducer,
  cart: cartSlice,
  userLogin: userLoginReducer,
  order:OrderSlice,
  user: userSlice,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartList: { cartItems: [] },
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
