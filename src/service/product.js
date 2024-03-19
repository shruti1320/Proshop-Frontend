import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Slices/cartSlice";

const token = localStorage.getItem("token");

const addCartHandlerService = async(data) => {
  console.log(data, 'from services')
  // const dispatch = useDispatch()
  return await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity || 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // dispatch(addToCart(response?.data?.product));
      // return response
}

const GetProducthandler = async() =>{
    // const productList = useSelector(state => state)
    // const { productList } = useSelector(state => state.product)
    let products = []
    try {
        // if (productList.products.length === 0) {
          const { data } = token
            ? await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
            : await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`);
          products = data;
          localStorage.setItem("products", JSON.stringify(products));
        // } else {
        //   products = productList.products;
        // }
        return products;
      } catch (error) {
        throw error;
      }
}

export {
    GetProducthandler,
    addCartHandlerService
}
