import React from "react";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ThemeProvider from './theme';
// import TabelData from "./datatable/table";
import UserDataEditForm from "./datatable/Form";
import OrganizationContent from "./datatable/table";
import MerchantPage from "./datatable/MerchantPage";
import MerchantInfo from "./datatable/MerchantPage/information";

import { ROUTES } from "./Routers/index";
import PrivateContainer from "./Routers/private";
import PublicContainer from "./Routers/public";
import WebSocketComponent from "./datatable/chatWithweb";
import { Toaster } from "react-hot-toast";
import FavouriteProductScreen from "./screens/FavouriteProductScreen";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Toaster  position="top-right" />
        <main className="py-3">
          <Container>
            
            <Routes>
              {ROUTES.map(({Component, isPrivate, path, roles})=>(
                <Route exact
                   path={path}
                   key={path}
                   element={
                    isPrivate ? (
                      <PrivateContainer roles={roles}>
                         <Component/>
                      </PrivateContainer>
                    ) : (
                      <PublicContainer>
                         <Component/>
                      </PublicContainer>
                    )
                   }
                />
                
              ))}          
            </Routes> 
          </Container>
        </main>
        {/* <OrganizationContent/> */}
        
        <Footer />
      </Router>
     
    </ThemeProvider>
   
  );
}

export default App;



