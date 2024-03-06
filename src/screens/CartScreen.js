import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  existedCartItem,
  removeFromCart,
  updateCart,
} from "../Slices/cartSlice";
import Message from "../componant/Message";
import "../scss/IncrementDecrementBtn.scss";
import { cartlist } from "../Slices/cartSlice";
import axios from "axios";
import { useEffect } from "react";

const CartScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(cartlist());
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.cartList.cartItems);

  console.log(cartItems, " the items ");
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item._id] = item.addedQtyInCart;
    });
  }, [cartItems]);

  const checkOutHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  const handleQtyChange = async (userId, productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/updateqty`,
        {
          userId,
          productId,
          newQuantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateCart(response?.data?.changedItems));
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteFromCart = async (userId, productId) => {

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

  console.log("cartItems", cartItems);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map(( item ) => (
              <ListGroup.Item key={item.product?._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item?.product}`}>
                      {item?.product?.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item?.product?.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      style={{ padding: "inherit" }}
                      as="select"
                      value={item?.quantity}
                      onChange={(e) =>
                        handleQtyChange(
                          userInfo?._id,
                          item?.product?._id,
                          Number(e.target.value)
                        )
                      }
                    >
                      {[...Array(item?.product?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteFromCart(userInfo._id, item?.product?._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + item?.quantity,
                  0
                )}
                ) items
              </h2>
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + item?.quantity * item?.product?.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;
