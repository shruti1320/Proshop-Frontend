
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './form.css'
import { useState } from 'react';
function UserDataEditForm({props,handleClose}) {
  console.log(props,'propssssssssssssssssssssssssssssssssssssss');
 // ['65d889ce3ccec2c3a0e8b4f7', 'cisha', 'cisha@gmail.com', false, false, undefined]
  const [name,setName]=useState(props[1])
  const [email,setEmail]=useState(props[2])
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('user')

  //console.log(name,'name',email,'email',role,'roles');
    const handaleUpdate=()=>{
      const obj={
        name,
        email,
        password,
        role,
        isActive:true
      }
       fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`,{
        method:"PUT",
        body :JSON.stringify(obj)
       
       })
       .then((req)=>req.json())
       .then((res)=>{
        console.log(res,'update user profile');
        handleClose()
        
       })

    }
  return (
    <div className='form-edit'>
        <h1>Edit Form</h1>
        <Form onSubmit={handaleUpdate}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your name" onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Role</Form.Label>
         <select style={{width:"100%",paddingBottom:"5px",paddingTop:"5px"}} onChange={(e)=>setRole(e.target.value)}>
            <option value='merchant'>Merchant</option>
            <option value='admin'>Admin</option>
            <option value='user'>Customer</option>
         </select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{direction:"block",margin:"auto"}}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default UserDataEditForm;