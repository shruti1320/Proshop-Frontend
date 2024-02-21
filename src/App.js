import React from "react";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./componant/Footer";
import Header from "./componant/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            {/* cart/:id? ---- ? means if we haven't id eventhough it will redirect on CartScreen  [video-32] */}
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route exact path="/" component={HomeScreen}></Route>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
