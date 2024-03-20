
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
  Switch,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";

// components
// import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import './merchant.css'

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


  // const[oldPrice,setOldPrice]=useState(value);
  // console.log("old price",value)




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

   //   console.log("localdada",data)
  //   data.forEach(product => {
  //     const oldPriceKey = `oldPrice_${product._id}`;
  //     if (!localStorage.getItem(oldPriceKey)) {
  //       // Only set the old price if it doesn't exist in local storage
  //       localStorage.setItem(oldPriceKey, product.price);
  //     }
  //   });
  //   setProductsData(data)
  //   console.log(data, 'data');
  // }


  const [sentBtn, setSendBtn] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [isClicked, setIsClicked] = useState(false)
  const [productDetailsData,setProductDetails]=useState({})
  const handleEditClick = (id) => {
    

  const product= productsData.filter((ele)=>{
    if(id==ele._id){
      setProductDetails(ele)
    }
  })

    console.log('clicked edit');
    setShowModalEdit(true);
    setSendBtn(true)
    // Additional logic for handling the edit click event if needed
  };
  const handleCloseEdit = () => setShowModalEdit(false);

  const handleActiveStatus = async (id) => {
    console.log(id, '77777777777777777777777777777777777777')
    const data = await axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`)
    console.log(data, 'update status console========================')
    getData()
    setIsClicked(!isClicked)
  }


  const handleDelete = async (id) => {
    try {
      // dispatch(startLoader());
      const response = []

    } catch (error) {

    } finally {
      setIsDeleteConfirmed(false);
    }
  };

  useEffect(() => {
    getData()
  }, [showModal, showModalEdit, sentBtn])


  React.useEffect(() => {
    if (isDeleteConfirmed) {
      handleDelete(deleteData);
    }

  }, [isDeleteConfirmed]);



  React.useEffect(() => {

    if (ofcId) {
      setValue(1);
    }

  }, [searchParams, organization]);



  const handleDeleteUser = (id) => {

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
        display: productsData._id,

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
        setCellProps: () => ({ style: { width: "150px" } }),

        customBodyRender: (value) => {
          return (
            <Box>
              <img src={value} />
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


        customBodyRender: (value, rowData) => {
           console.log(rowData,'switch data ----------------------------------------')
          return (
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} onClick={(e)=> e.stopPropagation()}>
             
              <Switch className="switch-button"
                checked={value}
                onChange={()=>{
                 
                  handleActiveStatus(rowData.rowData[0])
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
          )
        },
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
        customBodyRender: (value) => (value),
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

          return (
            <Box
              sx={{
                width: "100%",
                display: "flex",

              }}
            >
              <Tooltip title="Edit">
                <IconButton
                  onClick={(e)=>{
                    e.stopPropagation()
                    handleEditClick(tableMeta.rowData[0])
                  }}

                  sx={{ marginRight: "12px" }}
                >
                  <Iconify icon={"eva:edit-fill"} />
                </IconButton>


                <div>

                  <UpdateModal
                    show={showModalEdit}
                    handleClose={handleCloseEdit}
                    product={productDetailsData}
                    editBtn={sentBtn}
                  />
                </div>


              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(e) => {
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

  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    // onRowClick: (rowData) => {
    //   navigate(`/product/${rowData[0]}`)
    // },


    onViewColumnsChange: (changedColumn, action) => {

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
              className="m-2 border border-light float-right"
              sx={{ backgroundColor: "#343A40", borderRadius: "0px", border: 'none' }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Product
            </Button>
            <UpdateModal addBtn={addbtn} show={showModal} handleClose={handleClose} />
          </Box>

          <MUIDataTable
            title={"Organizations"}
            data={productsData}
            columns={columns}
            options={options}
          />

        </>
      ) : (
        <Card sx={{ p: 3, display: "none" }} className="gita-merchant">
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
