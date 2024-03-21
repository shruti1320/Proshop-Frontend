import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import CheckOutSteps from "../componant/CheckOutSteps";
import { cartlist, removeFromCart } from "../Slices/cartSlice";
import axios from "axios";
import { addOrder } from "../Slices/OrderSlice";
import toast from "react-hot-toast";
import Avatar1 from "../componant/avatar/avatar-1.jpg";
import istockphoto from "../componant/avatar/istockphoto-1341455576-612x612.jpg";

const PlaceOrderScreen = ({ history }) => {
  const [orderId, setOrderId] = useState("");

  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart.cartList);
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);
  // const orderCreate = useSelector((state) => state.orderCreate);
  // const { order, success, error } = orderCreate;
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

  // const userInfo = useSelector((state) => state.user.userDetails.userInfo);
  const orderedProduct = useSelector((state) => state.cart.cartList);
  const { cartItems } = orderedProduct;
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const [orderID, setOrderID] = useState("");
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    dispatch(cartlist());
  }, [dispatch]);
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimal(
    cartItems.reduce(
      (acc, item) => acc + item?.product?.price * item?.quantity,
      0
    )
  );
  const shippingPrice = addDecimal(itemsPrice > 100 ? 100 : 0);

  const texPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)));

  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(texPrice);

  const deleteFromCart = async (productId) => {
    console.log(productId, " the quantity to deduct ; ");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/removecart`,
        { userId: userInfo._id, productId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeFromCart({ productId: productId }));
      console.log(cartItems.quantity, " the quantity to deduct ; ");
    } catch (error) {
      console.log("Error coming from place order screen :", error);
    }
  };
  const dataa = [];
  const productData = cartItems.filter((ele) => {
    dataa.push({ ...ele.product, quantity: ele.quantity });
    return ele.product;
  });

  const placeOrderHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const order = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/orders`,
        {
          cartItems: dataa,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          texPrice,
          shippingPrice,
          totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      cartItems.forEach(async (item) => {
        deleteFromCart(item?.product?._id);

        const data = await axios.patch(
          `${process.env.REACT_APP_API_BASE_PATH}/api/products/updateCount/${item?.product?._id}`,

          { quantity: item?.quantity },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });
      toast(" Products ordered successfully ");

      setOrderPlaced(true);

      if (orderID) {
        navigate(`/order/${order?.data?._id}`);
      }
    } catch (error) {
      toast(" Error in placing ordering ");
      console.log(" error ", error);
    }
  };

  const createOrder = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/orders/create-order`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response from pay", response);
      setOrderID(response.data.order_id);
    } catch (error) {
      console.error(error);
    }
  };

  // const createOrder = async () => {
  //   const token = localStorage.getItem("token");
  //   console.log("token", token);
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_BASE_PATH}/api/orders/create-order`,
       
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("response from pay", response);
  //     const orderID = response.data.order_id;
  //     console.log("orderid",orderID)
  
  //     // After successfully creating the order, update the isPaid status
  //     await axios.post(
  //       `${process.env.REACT_APP_API_BASE_PATH}/api/orders/update-payment-status`,
  //       {
  //         orderId: orderID, // Pass the order ID to identify the order
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
      
  //     // Once the status is updated, set the order ID in the component state
  //     setOrderID(orderID);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  const handlePayment = async () => {
    if (orderID) {
      const options = {
        key: "rzp_test_SKCq7lMIkCvIWp",
        amount: totalPrice * 100,
        currency: "EUR",
        name: "stellare bijoux",
        description: "Test Transaction",
        image: "",
        order_id: orderID,
        // handler: handlePaymentSuccess,
        // handler:async function(response){
        //   const token = localStorage.getItem("token");
        //     // const body={...response};
        //     await axios.post( `${process.env.REACT_APP_API_BASE_PATH}/api/orders/verify`,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //     );
        //     alert(response.razorpay_payment_id);
        //     alert(response.razorpay_order_id);
        //     alert(response.razorpay_signature);
        // },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#454545",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  // const  handlePaymentSuccess = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_BASE_PATH}/api/orders/verifyPayment`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         }
  //       },
  //       {
  //         razorpay_order_id: orderID,
  //         razorpay_payment_id: "payment_id_from_frontend",
  //         razorpay_signature: "signature_from_frontend",
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error verifying payment:", error);
  //   }
  // };

  return (
    <>
      {orderPlaced ? (
        <div className="text-center mt-5">
          <div className="mt-4">
            <Image src={istockphoto} alt="Thank you" />
          </div>
          <h1>Order Placed</h1>
          <p>
            Your order has been successfully placed. Thank you for shopping with
            us!
          </p>
          <Button className="mt-3" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
          <Button className="mt-3 ms-3" onClick={() => navigate("/order")}>
            View Order Details
          </Button>
        </div>
      ) : (
        <Row>
          <CheckOutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shopping</h2>
                  <p>
                    <strong>Address:</strong>
                    {shippingAddress && (
                      <div>
                        {shippingAddress.address}, {shippingAddress.city},
                        {shippingAddress.postalCode}, {shippingAddress.country}
                      </div>
                    )}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong>
                    {paymentMethod && paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cartItems.map((item) => {
                        return (
                          <ListGroup.Item key={item?.product?._id}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item?.product?.image}
                                  alt={item?.product?.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Link to={`/product/${item?.product?._id}`}>
                                  {item?.product?.name}
                                </Link>
                              </Col>
                              <Col>
                                {item?.quantity} x {item?.product?.price} = $
                                {(
                                  item?.quantity * item?.product?.price
                                ).toFixed(2)}
                              </Col>
                              <Col>
                                <Button
                                  type="button"
                                  variant="light"
                                  onClick={() => {
                                    deleteFromCart(item?.product?._id);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${texPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <hr />
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error && <Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems === 0}
                      onClick={() => {
                        placeOrderHandler();
                      }}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Row>
      )}
    </>
  );
};
export default PlaceOrderScreen;
