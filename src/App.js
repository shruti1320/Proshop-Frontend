import React from "react";
import "./bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
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
import AllProductsScreen from "./screens/AllProductsScreen";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <Header />
      <Toaster position="top-right" />
      <main className="py-3">
        <Container>
         
           <Routes>
          <Route path="/login" element={<LoginScreen/>}></Route>
          <Route path="/register" element={<RegisterScreen/>}></Route>
          <Route path="/shipping" element={<ShippingScreen/>}></Route>
          <Route path="/payment" element={<PaymentScreen/>}></Route>
          <Route path="/order/:id" element={<OrderScreen/>}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
          <Route path="/profile" element={<ProfileScreen/>}></Route>
          <Route path="/product/:id" element={<ProductScreen/>}></Route>
          <Route path="/all-products" element={<AllProductsScreen/>}></Route>
          {/* cart/:id? ---- ? means if we haven't id eventhough it will redirect on CartScreen  [video-32] */}
          <Route path="/cart/:id?" element={<CartScreen/>}></Route>
          <Route exact path="/" element={<HomeScreen/>}></Route>
          <Route path="/allproductScreen" element={<AllProductsScreen/>}></Route>
         
           </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
