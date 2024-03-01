// import CompletedRequests from "../pages/CompletedRequests";
// import User from "../pages/User";
// import Organization from "../pages/Organization";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import DashboardApp from "../pages/DashboardApp";
// import Office from "../pages/Office";
// // import Reports from "../pages/Reports";
// import Page404 from "../pages/Page404";
// import HelpRequest from "../pages/HelpRequest";
// import ForgotPassword from "../pages/ForgotPassword";
// import ChangePassword from "../pages/ChangePassword";
// import Profile from "../pages/Profile";
// import SuperAdmin from "../pages/SuperAdmin";
// import About from "../pages/About";
// import Congratulation from "../pages/Congratulation";
// import OrganizationAccount from "../pages/OrganizationAccount";
// // import UserPermission from "../pages/UserPermission";
// import SecurityCode from "../pages/SecurityCode";
// import District from "../pages/District";
// import Options from "../pages/Options";
// import Region from "../pages/Region";
// import ReportOptions from "../pages/ReportOptions";
// import Logout from "src/pages/Logout";
// import NotFound from "src/pages/NotFound";

import MerchantInfo from "../datatable/MerchantPage/information";
import OrganizationContent from "../datatable/table";
import AllProductsScreen from "../screens/AllProductsScreen";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderScreen from "../screens/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingScreen from "../screens/ShippingScreen";

{/* <Route path="/login" element={<LoginScreen />} />                                                                                      //done
              <Route path="/register" element={<RegisterScreen />} />                                                                      // done
              <Route path="/shipping" element={<ShippingScreen />} />                                                                      // done
              <Route path="/payment" element={<PaymentScreen />} />                                                                        // done
              <Route path="/order/:id" element={<OrderScreen />} />                                                                        // done
              <Route path="/placeorder" element={<PlaceOrderScreen />} />                                                                  // done
              <Route path="/profile" element={<ProfileScreen />} />                                                                        // done
              <Route path="/product/:id" element={<ProductScreen />} />                                                                    // done
              <Route path="/all-products" element={<AllProductsScreen />} />                                                               // done
              {/* cart/:id? ---- ? means if we haven't id eventhough it will redirect on CartScreen  [video-32] */}
              // <Route path="/cart/:id?" element={<CartScreen />} />                                                                      // done
              // <Route exact path="/" element={<HomeScreen />} />                                                                         // done
              // <Route path="/merchant" element={<MerchantInfo/>}/>                                                                       // done
              // <Route path="admin" element={<OrganizationContent/>}/> */}                                                                // done 

const ALLROLES = ["admin", "merchant", "user"];

// All routes
export const ROUTES = [
  {
    path: "/admin",
    Component: OrganizationContent,
    roles: ["admin"],
    isPrivate: true,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
    roles: ALLROLES,
    isPrivate: true,
  },
  {
    path: "/register",
    isPrivate: false,
    Component: RegisterScreen,
    roles:ALLROLES
  },
  {
    path: "/login",
    isPrivate: false,
    Component: LoginScreen,
    roles:ALLROLES
  },
  {
    path: "/",
    isPrivate: false,
    Component: HomeScreen,
    roles: ALLROLES,
  },
  {
    path: "/cart/:id",
    isPrivate: true,
    Component: CartScreen,
    roles: ALLROLES,
  },
  {
    path: "/all-products",
    isPrivate: false,
    Component: AllProductsScreen,
    roles: ALLROLES,
  },
  {
    path: "/merchant",
    isPrivate: true,
    Component: MerchantInfo,
    roles: ["merchant"],
  },
  {
    path: "/product/:id",
    isPrivate: false,
    Component: ProductScreen,
    roles: ALLROLES,
  },
  {
    path: "/shipping",
    isPrivate: true,
    Component: ShippingScreen,
    roles: ["user"],
  },
  {
    path: "/payment",
    isPrivate: true,
    Component: PaymentScreen,
    roles: ['user'],
  },
  {
    path: "/order/:id",
    isPrivate: true,
    Component: OrderScreen,
    roles: ['user'],
  },
  {
    path: "/placeorder",
    isPrivate: true,
    Component: PlaceOrderScreen,
    roles: ALLROLES,
  }
  // {
  //   path: "/congratulation",
  //   isPrivate: false,
  //   // Component: Congratulation,
  //   roles: ALLROLES,
  // },
  // {
  //   path: "/userPermission",
  //   isPrivate: true,
  //   // Component: Options,
  //   roles: ["OL"],
  // },
  // {
  //   path: "/securityCode",
  //   isPrivate: false,
  //   // Component: SecurityCode,
  //   roles: ALLROLES,
  // },
  // {
  //   path: "/notfound",
  //   isPrivate: false,
  //   // Component: NotFound,
  //   roles: ALLROLES,
  // },
  ,{
    path: "*",
    isPrivate: false,
     Component: `<div>Page not found 404</div>`,
    roles: ALLROLES,
  },
];
