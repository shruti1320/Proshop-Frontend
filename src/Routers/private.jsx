import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const PrivateContainer = ({ children, roles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState({});
  
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
  const token=localStorage.getItem("proshopToken")
  const checkAuth = async () => {
    try {
      const userData = jwtDecode(localStorage.getItem("proshopToken"));
      //dispatch(startLoader());
      console.log(userData,'user id from private');
      const getUserData = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      //dispatch(endLoader());

      const user = getUserData;
      if (getUserData) {
       // dispatch(setUserDetail(getUserData?.data));
      }
      setData(getUserData.data);
      if (
        user?.role !== "admin" 
        
      ) {
        setOpen(true);
      }
      // eslint-disable-next-line no-debugger

      //socket.emit("login", user?._id);
      if (roles.includes(user?.role)) {
        setIsAuthenticated(true);
      } else {
        navigate("/login");
      }
    } catch (e) {
      //dispatch(endLoader());
      navigate("/login");
      console.log("error: ", e);
    }
  };

  return isAuthenticated ? (
    <>
      {data?.role !== "admin" 
        (
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
                {/* <TermsConditionModel
                  isBack={
                    data?.position !== "superAdmin" && !organization?.isVerified
                  }
                  organizationId={data?.organizationId?._id}
                  setOpen={setOpen}
                  setMessage={setMessage}
                  setOpenAlert={setOpenAlert}
                  setAlertSeverity={setAlertSeverity}
                /> */}
              </Box>
            </Box>
          </Modal>
        )}
      {children}
      
      {/* <SnackAlert
        open={openAlert}
        setOpen={setOpenAlert}
        severity={alertSeverity}
        message={message}
      /> */}
    </>
  ) : (
    <div style={{ position: "absolute", left: "50%", top: "50%" }}>
      {/* <CircularLoader /> */}
    </div>
  );
  //  return isAccess ? <DashboardLayout>{children}</DashboardLayout> : <Page404 />;
};

export default PrivateContainer;
