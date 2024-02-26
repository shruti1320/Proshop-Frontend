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

const ALLROLES = ["superAdmin", "biller", "OC", "OS", "IC", "OL", "DL", "RL"];

// All routes
export const ROUTES = [
  {
    path: "/helpRequest",
    // Component: HelpRequest,
    roles: ["superAdmin"],
    isPrivate: true,
  },
  {
    path: "/superAdmin",
    // Component: SuperAdmin,
    roles: ["superAdmin"],
    isPrivate: true,
  },
  {
    path: "/profile",
    // Component: Profile,
    roles: ALLROLES,
    isPrivate: true,
  },
  {
    path: "/register/:email",
    isPrivate: false,
    // Component: Register,
  },
  {
    path: "/login",
    isPrivate: false,
    // Component: Login,
  },
  {
    path: "/report",
    isPrivate: true,
    // Component: ReportOptions,
    roles: ALLROLES,
  },
  {
    path: "/inviteSignup",
    isPrivate: false,
    // Component: Login,
  },
  {
    path: "/changePassword/:email",
    isPrivate: false,
    // Component: ChangePassword,
  },
  {
    path: "/forgotPassword",
    isPrivate: false,
    // Component: ForgotPassword,
  },
  {
    path: "/",
    isPrivate: true,
    // Component: DashboardApp,
    roles: ["biller", "OC", "OS", "IC", "OL", "DL", "RL"],
  },
  {
    path: "/logout",
    isPrivate: false,
    // Component: Logout,
  },
  {
    path: "/logout",
    isPrivate: false,
    // Component: Logout,
  },
  {
    path: "/completedRequests",
    isPrivate: true,
    // Component: CompletedRequests,
    roles: ["biller", "OC", "OS", "IC", "OL", "DL", "RL"],
  },
  {
    path: "/organization",
    isPrivate: true,
    // Component: Organization,
    roles: ["superAdmin"],
  },
  {
    path: "/office",
    isPrivate: true,
    // Component: Office,
    roles: ALLROLES,
  },
  {
    path: "/organizationAccount",
    isPrivate: true,
    // Component: OrganizationAccount,
    roles: ["OL"],
  },
  {
    path: "/users",
    isPrivate: true,
    // Component: User,
    roles: ALLROLES,
  },
  {
    path: "/district",
    isPrivate: true,
    // Component: District,
    roles: ["OL", "RL"],
  },
  {
    path: "/region",
    isPrivate: true,
    // Component: Region,
    roles: ["OL"],
  },
  {
    path: "/about",
    isPrivate: true,
    // Component: About,
    roles: ALLROLES,
  },
  {
    path: "/congratulation",
    isPrivate: false,
    // Component: Congratulation,
    roles: ALLROLES,
  },
  {
    path: "/userPermission",
    isPrivate: true,
    // Component: Options,
    roles: ["OL"],
  },
  {
    path: "/securityCode",
    isPrivate: false,
    // Component: SecurityCode,
    roles: ALLROLES,
  },
  {
    path: "/notfound",
    isPrivate: false,
    // Component: NotFound,
    roles: ALLROLES,
  },
  {
    path: "*",
    isPrivate: false,
    // Component: Page404,
    roles: ALLROLES,
  },
];
