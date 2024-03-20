
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
// import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";


import toast from "react-hot-toast";

import { useNavigate } from 'react-router-dom';

import axios from "axios";
import UpdateModal from "../../componant/UpdateModal";
import { getProfileOfUserByParameterId } from "../../service/user";

// import { setParams } from "src/utils/setParams";

export default function AdminViewMerchant() {
  const csvLinkRef = React.useRef(null);


  
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});

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
const [name,setName]=useState('')
 //const locations=useLocation()

 

 var merchant_id = location.search
 merchant_id=merchant_id.split('=')


  const token = (localStorage.getItem("token"));
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const userDetailsData = async() =>{
        const user = await getProfileOfUserByParameterId(merchant_id[1])
        // axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${merchant_id[1]}`)
        setName(user?.data?.name)
       
  }

  const Api = `${process.env.REACT_APP_API_BASE_PATH}/api/products/all/products`
  const getData = async () => {

    const { data } = await axios.get(Api+`/${merchant_id[1]}`, {
      headers: {

        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
   
    setProductsData(data)
    // cons setProductsData(data)ole.log(data, 'data');
  }
  
  
  const [sentBtn, setSendBtn] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

 

  

 
  const handleDelete = async (id) => {
    try {
     
    } catch (error) {

    } finally {
      setIsDeleteConfirmed(false);
    }
  };

  useEffect(() => {
    getData()
  }, [showModal,showModalEdit,sentBtn])

  useEffect(()=>{
    userDetailsData()
  },[])

 
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
        setCellProps: () => ({ style: {width: "150px", marginRight:"15px" }}),

        customBodyRender: (value) => {
          return (
            <Box sx={{width:"150px", marginRight : "15px"}}>
              <img style={{width:"150px", marginRight:"15px"}}  src={value} />
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


        customBodyRender: (value) => (value ? "Yes" : "No")
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
      {!organization ? (
        <>
        <Box>
            <h2> {name}'s product details  </h2>
        </Box>
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
              sx={{backgroundColor:"#343A40", borderRadius:"0px",border:'none'}}
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
        <Card sx={{ p: 3, display:"none" }} className="gita-merchant">
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
