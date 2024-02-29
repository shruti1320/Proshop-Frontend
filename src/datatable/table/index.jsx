
//  
import UserDataEditForm from "../Form";
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import './table.css'
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
import { useDispatch } from "react-redux";

// components
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";


import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import { useNavigate } from 'react-router-dom';
import { Modal, Backdrop } from "@mui/material";
import { Button as Btn } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { register } from "../../actions/userAction";
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
  const API = process.env.REACT_APP_API_BASE_PATH + '/api/users/usersdata'
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
  const [isModalAddOpen, setModalAddOpen] = useState(false)
  const handleEditClick = () => {
    console.log('clicked edit');
    setIsModalOpen(true);
    // Additional logic for handling the edit click event if needed
  };
  const handleFormAdduser = () => {
    setModalAddOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddUserModal = () => {
    isModalAddOpen(false)
  }
  // for handle delete organization
  const handleDelete = async (id) => {
    try {

      const response = []

    } catch (error) {

    } finally {
      setIsDeleteConfirmed(false);
    }
  };


  const [userData, setUserdata] = useState([])



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
    { label: "Email", key: "email" },
    { label: 'isActive', key: "isActive" },
    { label: "Number of Offices", key: "numberOfOfc" },
  ];

  const csvData =
    //  data 
    [];

  const getData = () => {
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
  }


  const token = JSON.parse(localStorage.getItem("token"));

  const handleDeleteUser = (id) => {
    console.log('clicked delete id', id);
    fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res, 'response from req');
        alert('Account Deleted Successfully')
        getData()
      })
      .catch((err) => {
        alert('please signup first')
        return err
      })

  }
  const [addUserdata, setAddUserData] = useState({
    email: "",
    password: "",
    role: "merchant",
    name: ""
    
  })
  const handleSubmitAddUser = (e) => {
    e.preventDefault()
    console.log(addUserdata, '');

    const name = addUserdata.name;
    const email = addUserdata.email;
    const password = addUserdata.password;
    const role = addUserdata.role
    
    fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body :JSON.stringify(addUserdata)
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res, 'response from req');
        alert('Account Added Successfully')
        getData()
      })
      .catch((err) => {
        alert('please signup first')
        return err
      })


  }
  useEffect(() => {
    getData()
  }, [])

  console.log(addUserdata, 'addddddd usre ');
  // <tr class="MuiTableRow-root MuiTableRow-hover tss-1u7tfzz-MUIDataTableBodyRow-root undefined tss-uoxchv-MUIDataTableBodyRow-responsiveStacked tss-xsbx01-MUIDataTableBodyRow-root-MUIDataTableBody-lastStackedCell css-1ev3i1v-MuiTableRow-root" data-testid="MUIDataTableBodyRow-9" id="MUIDataTableBodyRow-04104633920335292-9"><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-paddingCheckbox MuiTableCell-sizeMedium tss-12o2szd-MUIDataTableSelectCell-root tss-1fz4yw6-MUIDataTableSelectCell-fixedLeft css-7gmoa3-MuiTableCell-root"><div style="display: flex; align-items: center;"><span class="MuiButtonBase-root MuiCheckbox-root tss-1dci9uv-MUIDataTableSelectCell-checkboxRoot MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root tss-1dci9uv-MUIDataTableSelectCell-checkboxRoot MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium MuiCheckbox-root tss-1dci9uv-MUIDataTableSelectCell-checkboxRoot MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium css-zqwxjb-MuiButtonBase-root-MuiCheckbox-root" data-description="row-select" data-index="9"><input class="PrivateSwitchBase-input css-1m9pwf3" id="MUIDataTableSelectCell-04104633920335292-9" type="checkbox" data-indeterminate="false"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxOutlineBlankIcon"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></span></div></td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium tss-1qtl85h-MUIDataTableBodyCell-root tss-1y3wvy9-MUIDataTableBodyCell-stackedParent tss-iwylj0-MUIDataTableBodyCell-responsiveStackedSmallParent css-1uoh5bq-MuiTableCell-root" data-colindex="1" data-tableid="04104633920335292" data-testid="MuiDataTableBodyCell-1-9"><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1ej321f-MUIDataTableBodyCell-cellHide tss-1t2q2nr-MUIDataTableBodyCell-stackedHeader tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">Name</div><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">cisha</div></td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium tss-1qtl85h-MUIDataTableBodyCell-root tss-1y3wvy9-MUIDataTableBodyCell-stackedParent tss-iwylj0-MUIDataTableBodyCell-responsiveStackedSmallParent css-1uoh5bq-MuiTableCell-root" data-colindex="3" data-tableid="04104633920335292" data-testid="MuiDataTableBodyCell-3-9"><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1ej321f-MUIDataTableBodyCell-cellHide tss-1t2q2nr-MUIDataTableBodyCell-stackedHeader tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">isAdmin</div><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">No</div></td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium tss-1qtl85h-MUIDataTableBodyCell-root tss-1y3wvy9-MUIDataTableBodyCell-stackedParent tss-iwylj0-MUIDataTableBodyCell-responsiveStackedSmallParent css-1uoh5bq-MuiTableCell-root" data-colindex="4" data-tableid="04104633920335292" data-testid="MuiDataTableBodyCell-4-9"><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1ej321f-MUIDataTableBodyCell-cellHide tss-1t2q2nr-MUIDataTableBodyCell-stackedHeader tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">Active Status</div><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">No</div></td><td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium tss-1qtl85h-MUIDataTableBodyCell-root tss-1y3wvy9-MUIDataTableBodyCell-stackedParent tss-iwylj0-MUIDataTableBodyCell-responsiveStackedSmallParent css-1uoh5bq-MuiTableCell-root" data-colindex="5" data-tableid="04104633920335292" data-testid="MuiDataTableBodyCell-5-9"><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1ej321f-MUIDataTableBodyCell-cellHide tss-1t2q2nr-MUIDataTableBodyCell-stackedHeader tss-1vd39vz-MUIDataTableBodyCell-stackedCommon">Actions</div><div class="tss-1qtl85h-MUIDataTableBodyCell-root tss-1vd39vz-MUIDataTableBodyCell-stackedCommon"><div class="MuiBox-root css-1age63q"><span aria-label="Edit" class="" data-mui-internal-clone-element="true"><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1sgrh77-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.4 7.34L16.66 4.6A2 2 0 0 0 14 4.53l-9 9a2 2 0 0 0-.57 1.21L4 18.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 20h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71M16 10.68L13.32 8l1.95-2L18 8.73Z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button></span><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-76oni5-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="Delete" data-mui-internal-clone-element="true"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2M10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12Z"></path><path fill="currentColor" d="M9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1m6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button></div></div></td></tr>
  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display: userData._id,

        viewColumns: false,
        customBodyRender: (value) => value ? value : "-"
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
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        display: userData.role,

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
          //console.log(value, 'values**********', tableMeta, 'table-meta***********', updateValue, "***************update value*");
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

                <Modal

                  open={isModalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                // BackdropComponent={(props) => (
                //   <Backdrop {...props} sx={{ backgroundColor: "transparent",opacity:"0" }} />
                // )}
                >
                  <div>
                    {/* Your UserDataEditForm component goes here */}
                    <UserDataEditForm props={tableMeta.rowData} handleClose={handleCloseModal} />
                  </div>
                </Modal>



              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDeleteUser(tableMeta.
                    rowData
                  [0])

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
    // onRowClick: (rowData) => {
    //   console.log(rowData, "row data from table");
    //   const { id, name, password, isAdmin, isActive } = rowData
    //   const index = userData.findIndex((org) => org._id === rowData[0]);
    //   setCurrentOrgRow(userData[index]);
    //   navigate({
    //     pathname: "/merchant",
    //     search: createSearchParams({
    //       merchant_id: `${rowData[0]}`,
    //     }).toString(),

    //   });
    // },

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
                handleFormAdduser()
                handleEvent();
                setModalTitle("Add Organization Details");
              }}
              variant="contained"
              component={Link}
              to="#"
              startIcon={<Iconify icon="eva:plus-fill" />}

            >
              Add Merchant
            </Button>
          </Box>
          <Modal open={isModalAddOpen}
            onClose={handleAddUserModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description" >
            <div>
              <h2>Add User Form</h2>
              <div className="form-add" >
                <Form onSubmit={handleSubmitAddUser}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your name" onChange={(e) => { setAddUserData(addUserdata.name = e.target.value) }} value={addUserdata.name} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setAddUserData(addUserdata.email = e.target.value) }} value={addUserdata.email} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setAddUserData(addUserdata.password = e.target.value) }} value={addUserdata.password} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Btn variant="primary" type="submit" style={{ direction: "block", margin: "auto" }} handleClose={handleAddUserModal}>
                    Submit
                  </Btn>
                </Form>
              </div>
            </div>
          </Modal>
          <Scrollbar>
            <MUIDataTable
              title={"Organizations"}
              data={userData}
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
