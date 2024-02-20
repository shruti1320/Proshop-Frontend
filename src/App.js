import React from "react";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./componant/Footer";
import Header from "./componant/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
function App() {
  return (
    <>
        <Header />
        <main className="py-3">
          <Container>
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
