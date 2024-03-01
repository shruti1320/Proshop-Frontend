import { Modal } from "@mui/material"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MerchantInfo = () => {
    const data = []
    const [allData,setAlldata]=useState([])
    const API = process.env.REACT_APP_API_BASE_PATH + '/api/users/usersdata'
    const [user,setUser]=useState({})
    const location = useLocation();
    var state = location.search;
    state=state.split('=')
    //console.log(state[1], 'id   merchant page info----000000000000000000');
    const getData = () => {
        fetch(API)
          .then((req) => {
            return req.json()
          })
          .then((res) => {
          
            setAlldata(res)
          })
          .catch((err) => {
            console.log(err, 'errorn getting while userdata request');
          })
      }
      
    // Access the dataconst { userId, name, email, isAdmin, isActive } = state;
    const handleInformation = () => {

    }
    useEffect(()=>{
        getData()
      allData.filter((item)=>{
              if(item._id===state[1]){
                setUser(item)
                return true
              }
          })
          
          //console.log(user,'users========',allData);
    },[allData?.length])
    return (
        <div>
            <h4>Welcom {user?.name}</h4>
            <h2>Product Details</h2>
            
        </div>
    )
}

export default MerchantInfo