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
            <div>
                <table style={{border:"1px solid black",textAlign:"center"}}>
                    <thead >
                        <tr >
                            <th >Sr No.</th>
                            <th>Product</th>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Discription</th>
                            <th>No. of Reviews</th>

                        </tr>
                    </thead>
                    <tbody>
                       
                        {data?.length > 0 && data != undefined && data.map((item, index) => (
                            <tr key={index} onClick={handleInformation}>
                                <td>{index}</td>
                                <td>{item.image}</td>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{item.countInStock}</td>
                                <td>{item.discription}</td>
                                <td>{item.numReviews}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal>
                    <div>
                        <button>X</button>
                        <div>
                            <h3>Product Info</h3>
                            <div>
                                <h3>{ }</h3>

                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default MerchantInfo