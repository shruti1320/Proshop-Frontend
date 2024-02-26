import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TermsConditionModel from "../components/modal/tearmAndCondition";
import SnackAlert from "../components/SnackAlert";
import socket from "../utils/socket";
import apiClient from "../service/service";
import { setUserDetail } from "../store/userSlice";
import { endLoader, startLoader } from "src/store/loaderSlice";

const PrivateContainer = ({ children, roles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const organization = useSelector((state) => state.organization.data);
  const style = {
    position: "relative",
    maxWidth: 500,
    width: "auto",
    margin: "1.75rem auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 3,
  };

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // checkAuth check token
  const checkAuth = async () => {
    
    try {
      const userData = jwtDecode(localStorage.getItem("proshopToken"));
      dispatch(startLoader());
      const getUserData = await apiClient().get(`/users/${userData?._id}`);
      dispatch(endLoader());

      const user = getUserData?.data;
      if (getUserData) {
        dispatch(setUserDetail(getUserData?.data));
      }
      setData(getUserData.data);
      if (
        user?.position !== "superAdmin" &&
        !getUserData.data?.organizationId?.isVerified
      ) {
        setOpen(true);
      }
      // eslint-disable-next-line no-debugger

      socket.emit("login", user?._id);
      if (roles.includes(user?.position)) {
        setIsAuthenticated(true);
      } else {
        navigate("/login");
      }
    } catch (e) {
      dispatch(endLoader());
      navigate("/login");
      console.log("error: ", e);
    }
  };

  return isAuthenticated ? (
    <>
      {data?.position !== "superAdmin" &&
        organization?.isVerified === false && (
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                overflowX: "hidden",
                overflowY: "auto",
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                outline: 0,
              }}
            >
              <Box sx={style}>
                <TermsConditionModel
                  isBack={
                    data?.position !== "superAdmin" && !organization?.isVerified
                  }
                  organizationId={data?.organizationId?._id}
                  setOpen={setOpen}
                  setMessage={setMessage}
                  setOpenAlert={setOpenAlert}
                  setAlertSeverity={setAlertSeverity}
                />
              </Box>
            </Box>
          </Modal>
        )}
      {children}
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          position: "inherit",
          bottom: "0",
          right: "0",
          width: "100%",
          backdropFilter: "blur(50px)",
          background: "rgba(255, 255, 255)",
        }}
      >
        © {new Date().getFullYear()} Agrippon. Pro Practice Solutions Company.
        All Rights Reserved.
      </div>
      <SnackAlert
        open={openAlert}
        setOpen={setOpenAlert}
        severity={alertSeverity}
        message={message}
      />
    </>
  ) : (
    <div style={{ position: "absolute", left: "50%", top: "50%" }}>
      {/* <CircularLoader /> */}
    </div>
  );
  //  return isAccess ? <DashboardLayout>{children}</DashboardLayout> : <Page404 />;
};

export default PrivateContainer;
