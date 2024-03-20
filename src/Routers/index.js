
import MerchantInfo from "../datatable/MerchantPage/information";
import OrganizationContent from "../datatable/table";
import AllProductsScreen from "../screens/AllProductsScreen";
import CartScreen from "../screens/cart/screen/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderScreen from "../screens/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShippingScreen from "../screens/ShippingScreen";
import FavouriteProductScreen from '../screens/FavouriteProductScreen'
import AdminViewMerchant from "../datatable/MerchantPage/adminViewMerchant";
import ContactScreen from "../screens/ContactScreen";
import UpiFaqs from "../componant/ProfileScreenMicro/UpiFaqs";
import Cardfaqs from "../componant/ProfileScreenMicro/Cardfaqs";
import CameraScreen from "../componant/MainHomScreen.js/ProductsScreen/CameraScreen";
import SmartPhoneScreen from "../componant/MainHomScreen.js/ProductsScreen/SmartPhoneScreen";
import MainHomeScreen from "../screens/MainHomeScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen"
                                                            // done 

const ALLROLES = ["admin", "merchant", "user"];
 function pageNotFound(){
  return (
    <div>Page note found 404</div>
  )
 }
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
    roles:['merchant','user'],
  },
  {
    path: "/cart/:id?",
    isPrivate: true,
    Component: CartScreen,
    roles: ["merchant",'user'],
  },
  {
    path: "/all-products",
    isPrivate: true,
    Component: AllProductsScreen,
    roles: ['admin'],
  },
  {
    path: "/merchant",
    isPrivate: true,
    Component: MerchantInfo,
    roles: ["merchant",'admin'],
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
    roles: ALLROLES,
  },
  {
    path: "/payment",
    isPrivate: true,
    Component: PaymentScreen,
    roles:ALLROLES,
  },
  {
    path: "/order/:id",
    isPrivate: true,
    Component: OrderScreen,
    roles:ALLROLES,
  },
  {
    path: "/placeorder",
    isPrivate: true,
    Component: PlaceOrderScreen,
    roles: ALLROLES,
  },
  {
    path: "/favouriteScreen",
    isPrivate: true,
    Component: FavouriteProductScreen,
    roles:["merchant",'user'],
  },
  {
    path : 'merchant-details',
    isPrivate : true,
    Component : AdminViewMerchant,
    roles : ['admin']
  },
  {
    path : '/contact',
    isPrivate : false,
    Component : ContactScreen,
    roles: ALLROLES,  
  },
  {
    path : '/upi',
    isPrivate : false,
    Component : UpiFaqs,
    roles : ['user'],
  },
  {
    path : '/card',
    isPrivate : false,
    Component : Cardfaqs,
    roles : ALLROLES,
  },
  {
    path : '/camera',
    isPrivate : false, 
    Component : CameraScreen,
    roles :['user','merchant'],
  }, 
  {
    path : '/smartphone',
    isPrivate : false, 
    Component : SmartPhoneScreen,
    roles : ['user','merchant'], 
  }, 
  {
    path : '/mainscreen',
    isPrivate : false,
    Component : MainHomeScreen,
    roles : ['user','merchant'],
  },
  {
    path : '/resetPassword/:id?/:token?',
    isPrivate : false,
    Component : ResetPasswordScreen,
    roles : ALLROLES,
  },
  {
    path: '/order',
    isPrivate : false, 
    Component : OrderScreen,
    roles : ALLROLES,
  }

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
     Component: pageNotFound,
    roles: ALLROLES,
  },
];