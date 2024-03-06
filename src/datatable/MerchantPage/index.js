
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
import { useDispatch} from "react-redux";

// components
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";


import toast from "react-hot-toast";

import { useNavigate } from 'react-router-dom';

import axios from "axios";
import UpdateModal from "../../componant/UpdateModal";
// import { setParams } from "src/utils/setParams";

export default function MerchantPageProductDetails({ props }) {
  const csvLinkRef = React.useRef(null);


  
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});


  // deleting state
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate()
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const [addbtn, setAddBtn] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [productsData, setProductsData] = useState([])
  const token = (localStorage.getItem("token"));
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  const Api = `${process.env.REACT_APP_API_BASE_PATH}/api/products/all/products`
  const getData = async () => {

    const { data } = await axios.get(Api, {
      headers: {

        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    setProductsData(data)
    console.log(data, 'data');
  }
  
  
  const [sentBtn, setSendBtn] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleEditClick = (e) => {
    e.stopPropagation();
    console.log('clicked edit');
    setShowModalEdit(true);
    setSendBtn(true)
    // Additional logic for handling the edit click event if needed
  };
  const handleCloseEdit = () => setShowModalEdit(false);

  

  // for handle delete organization
  const handleDelete = async (id) => {
    try {
      // dispatch(startLoader());
      const response = []

    } catch (error) {

    } finally {
      setIsDeleteConfirmed(false);
    }
  };


  const [userData, setUserdata] = useState([])
  //const API = process.env.REACT_APP_API_BASE_PATH + '/api/users'
  useEffect(() => {
    getData()
  }, [showModal,showModalEdit,sentBtn])

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



  const handleDeleteUser =(id) => {
   
    console.log('clicked delete id', id);
    fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res, 'response from req');
        getData()
        alert('Product Deleted Successfully')
      })
      .catch((err) => err)

  }

  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display: userData._id,

        viewColumns: false,
        customBodyRender: (value) => (value),
      },
    },
    {
      name: "image",
      label: "Product",
      options: {

        filter: true,
        sort: true,
        setCellProps: () => ({ style: {width: "150px" }}),

        customBodyRender: (value) => {
          return (
            <Box>
              <img  src={value} />
            </Box>
          )
        },
      },
    },
    {
      name: "name",
      label: "Product Name",
      display: true,
      options: {
        filter: false,
        sort: true,


        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "isActive",
      label: "Active",
      display: true,
      options: {
        filter: false,
        sort: true,


        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },
    
    {
      name: "price",
      label: "Price",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => (value ),
      },
    },

    {
      name: "Actions",
      label: "Actions",
      options: {
        onRowClick: false,
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
        }),
        filter: false,
        empty: true,
        display: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
         // console.log(value, 'values**********', tableMeta, 'table-meta***********', updateValue, "***************update value*", '====================',productsData[tableMeta.rowIndex]);
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
                  onClick={handleEditClick}

                  sx={{ marginRight: "12px" }}
                >
                  <Iconify icon={"eva:edit-fill"} />
                </IconButton>

                
                  <div>
                    {/* Your UserDataEditForm component goes here */}
                    <UpdateModal
                      show={showModalEdit}
                      handleClose={handleCloseEdit}
                      product={productsData[tableMeta.rowIndex]}
                      editBtn={sentBtn}
                    />
                    {/* <UserDataEditForm props={tableMeta.rowData} /> */}
                  </div>
                

              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(e) =>{
                    e.stopPropagation()
                    handleDeleteUser(tableMeta.
                      rowData
                    [0])
                  } 

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
       navigate(`/product/${rowData[0]}`)
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

            <Button
              onClick={() => {
                handleShow()
                setAddBtn(true)
                setSelectedProduct({})
              }}
              variant="contained"
              component={Link}
              to="#"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Product
            </Button>
            <UpdateModal addBtn={addbtn} show={showModal} handleClose={handleClose} />
          </Box>
          <Scrollbar>
            <MUIDataTable
              title={"Organizations"}
              data={productsData}
              columns={columns}
              options={options}
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
