
//  
import UserDataEditForm from "../Form";
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Link,
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
// material
import {
  Card,
  Button,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";

// components
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";


import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import { useNavigate } from 'react-router-dom';
import { Modal } from "@mui/material";
// import { setParams } from "src/utils/setParams";

export default function OrganizationContent() {
  const csvLinkRef = React.useRef(null);

  const [modalTitle, setModalTitle] = useState("");
  const [updateValue, setUpdateValue] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  // deleting state
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);

  const navigate = useNavigate()
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (ofcId && userId) {
    //   const filteredParams = setParams(searchParams, ["user_id", "office_id"]);
    //   setSearchParams(filteredParams);
    // } else if (newValue === 1) {
    //   const filteredParams = setParams(searchParams, ["user_id"]);
    //   setSearchParams(filteredParams);
    // } else if (newValue === 0) {
    //   const filteredParams = setParams(searchParams, ["office_id"]);
    //   setSearchParams(filteredParams);
    // }
    // const filteredParams = setParams(searchParams, ["user_id"]);
    // setSearchParams(filteredParams);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    console.log('clicked edit');
    setIsModalOpen(true);
    // Additional logic for handling the edit click event if needed
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // for handle delete organization
  const handleDelete = async (id) => {
    try {
      // dispatch(startLoader());
      const response = []
      // await apiClient().delete(`/organization/${id}`);
      // dispatch(endLoader());
      // const { status, organization, message } = response.data;
      // if (status === "success") {
      //   // dispatch(deleteOrganization(organization)); ///changed
      //   // socket.emit("broadcastOrganizationDelete", { organization }); //changed


      //   // setMessage(message);
      //   // setAlertSeverity("success");
      //   // setOpenAlert(true);
      //   toast.success(message);
      // }
    } catch (error) {
      // dispatch(endLoader());
      // setMessage(error.response?.data?.message);
      // setAlertSeverity("error");
      // setOpenAlert(true);
      // toast.error(error.response?.data?.message || error?.message);
    } finally {
      setIsDeleteConfirmed(false);
    }
  };

  
  const [userData, setUserdata] = useState([])
  const API = process.env.REACT_APP_API_BASE_PATH + '/api/users/usersdata'
  useEffect(() => {
    fetch(API)
      .then((req) => {
        return req.json()
      })
      .then((res) => {
        console.log(res, 'response from request');
        setUserdata(res)
      })
      .catch((err) => {
        console.log(err, 'errorn getting while userdata request');
      })
  }, [])

  // for trigger delete api when confirm the confirmation model
  React.useEffect(() => {
    if (isDeleteConfirmed) {
      handleDelete(deleteData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteConfirmed]);

 

  React.useEffect(() => {
    
    if (ofcId) {
      setValue(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, organization]);

  const handleEvent = () => {
    setShow(!show);
    setUpdateValue({});
    
  };

  // for handle the confirmation modal
  const handleConfirmationOpen = () => {
    setConfirmationOpen(!confirmationOpen);
  };

  let headers = [
    { label: "Name", key: "name" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "State", key: "state" },
    { label: "Zipcode", key: "zipcode" },
    { label: "Number of Offices", key: "numberOfOfc" },
  ];

  const csvData =
    //  data 
    [];


  

  const handleDeleteUser = () => {
    console.log('clicked delete');
    fetch('')

  }

  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display: userData._id,
        
        viewColumns: false,
        customBodyRender: (value) => (value ? value._id : "-"),
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        
        filter: true,
        sort: true,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        display: userData.email,
        
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    
    {
      name: "isAdmin",
      label: "isAdmin",
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },
    {
      name: "isActive",
      label: "Active Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },

    

    {
      name: "Actions",
      label: "Actions",
      options: {
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
        }),
        filter: false,
        onRowClick: false,
        empty: true,
        display: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                // justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Edit">
                <IconButton
                  onClick={handleEditClick
                    //(event) => {
                    //event.stopPropagation();
                    //handleEvent();
                    //setModalTitle("Update Organization Details");
                    // const index = data.findIndex(
                    //   (org) => org._id === tableMeta.rowData[0]
                    // );
                    // setUpdateValue(data[index]);
                    //</Tooltip>}
                  }
                  sx={{ marginRight: "12px" }}
                >
                  <Iconify icon={"eva:edit-fill"} />
                </IconButton>

                <Modal
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  <div>
                    {/* Your UserDataEditForm component goes here */}
                    <UserDataEditForm props={userData} />
                  </div>
                </Modal>

              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={handleDeleteUser
                    //   (event) => {
                    //   event.stopPropagation();
                    //   setConfirmationOpen(true);
                    //   setDeleteData(tableMeta.rowData[0]);
                    // }
                  }
                  sx={{ color: "error.main" }}
                >
                  <Iconify icon={"eva:trash-2-outline"} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
  ];

  const handlePageChange = (action, page) => {
    if (action === "changePage") {
      setPage(page);
    }
  };

  const handleDownload = () => {
    if (csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
    // Your data and API call logic here
  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    onRowClick: (rowData) => {
      // const index = data.findIndex((org) => org._id === rowData[0]);
      // setCurrentOrgRow(data[index]);
      navigate({
        pathname: "",
        search: createSearchParams({
          organization_id: `${rowData[0]}`,
        }).toString(),
      });
    },

    onViewColumnsChange: (changedColumn, action) => {
      // dispatch(handleViewColumn({ changedColumn, action })); //changed
    },
    page: page,
    onTableChange: (action, tableState) => {
      handlePageChange(action, tableState.page);
    },
    setRowProps: (row) => {
      return { style: { height: "75px" } };
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      handleDownload();
      return false;
    },
  };

  return (
    <Box>
      {!organization ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            {csvData?.length > 0 && (
              <Button className="csvButton" sx={{ display: "none" }}>
                {/* <CSVLink
                  ref={csvLinkRef}
                  data={csvData}
                  headers={headers}
                  filename={"Organizations.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Download me
                </CSVLink> */}
              </Button>
            )}
            <Button
              onClick={() => {
                handleEvent();
                setModalTitle("Add Organization Details");
              }}
              variant="contained"
              component={Link}
              to="#"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Organization
            </Button>
          </Box>
          <Scrollbar>
            <MUIDataTable
              title={"Organizations"}
              data={userData}
              columns={columns}
            // options={options}
            />
          </Scrollbar>
        </>
      ) : (
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "0 0 12px 12px",
              borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
            }}
          >
            <Typography variant="h6">{currentOrgRow?.name} Details</Typography>

            <Button
              variant="contained"
              sx={{ display: userId || ofcId ? "none" : "block" }}
              onClick={() => {
                setValue(0);
                navigate({
                  pathname: "/organization",
                });
              }}
            >
              Back
            </Button>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="User" {...a11yProps(0)} />
              <Tab label="Office" {...a11yProps(1)} />
              {/* <Tab label="Account" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* <UserContent organization={currentOrgRow?._id} /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <OfficeContent organization={currentOrgRow?._id} /> */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <AccountTabContent organization={currentOrgRow?._id} /> */}
          </TabPanel>
        </Card>
      )}
      {/* <OrganizationModal
        signUp={false}
        handleEvent={handleEvent}
        open={show}
        setOpen={setShow}
        modalTitle={modalTitle}
        updateValue={updateValue}
        setUpdateValue={setUpdateValue}
        setMessage={setMessage}
        setOpenAlert={setOpenAlert}
        setAlertSeverity={setAlertSeverity}
      />changed */}
      {/* <ConfirmationModal
        open={confirmationOpen}
        handleEvent={handleConfirmationOpen}
        setIsDeleteConfirmed={setIsDeleteConfirmed}
        setDeleteData={setDeleteData}
        org
      /> */}
      {/* <SnackAlert
        open={openAlert}
        setOpen={setOpenAlert}
        severity={alertSeverity}
        message={message}
      /> */}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="userDataList" sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
