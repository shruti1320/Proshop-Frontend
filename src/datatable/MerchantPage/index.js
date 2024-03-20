
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

// import toast from "react-hot-toast";

import { useNavigate } from 'react-router-dom';

import axios from "axios";
import UpdateModal from "../../componant/UpdateModal";
import { getProductByUsersId, productActiveStatusHandler } from "../../service/product";

// import { setParams } from "src/utils/setParams";

export default function MerchantPageProductDetails({ props }) {
  const csvLinkRef = React.useRef(null);



  // const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});


  // deleting state

  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate()
  // const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const [addbtn, setAddBtn] = useState(false)
  const [showModal, setShowModal] = useState(false); 
  const handleShow = () => {
    setShowModal(true)
    setAddBtn(true)
  };
  const handleClose = () => {
    setShowModal(false);
    setAddBtn(false);
  };
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
    // const { data } = await getProductByUsersId()
    // console.log('data*************',data)
    const { data } = await axios.get(Api, {
      headers: {

        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    setProductsData(data)
   
  }



  const [sentBtn, setSendBtn] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [isClicked, setIsClicked] = useState(false)
  const [productDetails, setProductDetails] = useState({})


  const handleEditClick = (id) => {

    
    for(let i=0; i<productsData?.length; i++){
        if(productsData[i]._id==id){
          setProductDetails(productsData[i])
        }
    }
    setAddBtn(false)
    setShowModalEdit(true);
    setSendBtn(true)
   
  };
  const handleCloseEdit = () =>{
    
    setShowModalEdit(false)
    setSendBtn(false)
  };

  const handleActiveStatus = async (id) => {
  
    const data = await productActiveStatusHandler(id)
    
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

    
    fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((req) => req.json())
      .then((res) => {
        
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
         
          return (
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>

              <Switch className="switch-button"
                checked={value}
                onChange={() => {

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
      name: "countInStock",
      label: "Stock",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => (value.toString()),
      },
    },
    {
      name: "countInStock",
      label: "Order Product",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => (
          <span style={{ color: value > 5 ? 'inherit' : 'red' }}>
            {value > 5 ? '-' :value<5 && value>0? `left product ${value}`:"Stock Empty"}
          </span>
        ),
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
          const product = productsData[tableMeta.rowIndex]
         
          return (
            <Box
              sx={{
                width: "100%",
                display: "flex",

              }}
              onClick={(e)=>e.stopPropagation()}
            >
              <Tooltip title="Edit" sx={{color:"black", backgroundColor:"white"}}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditClick(tableMeta.rowData[0])
                  }}

                  sx={{ marginRight: "12px" }}
                >
                  <Iconify icon={"eva:edit-fill"} />
                </IconButton>


                <div>

                 {sentBtn &&  <UpdateModal
                    show={showModalEdit}
                    handleClose={handleCloseEdit}
                    product={productDetails}
                   
                  />}

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
    onRowClick: (rowData) => {
      navigate(`/product/${rowData[0]}`)
    },


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
      {!organization && (
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
            {addbtn && <UpdateModal  show={showModal}  handleClose={handleClose} product={null} />}
          </Box>

          <MUIDataTable
            title={"Organizations"}
            data={productsData}
            columns={columns}
            options={options}
          />

        </>
      ) }

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
