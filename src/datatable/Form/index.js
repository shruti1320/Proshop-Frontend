
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './form.css'
import { useState } from 'react';
function UserDataEditForm({props}) {
  console.log(props,'propssssssssssssssssssssssssssssssssssssss');
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('')
    const handaleUpdate=()=>{
      const obj={
        name,
        email,
        password,
        role
      }
       fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile`,{
        method:"PUT",
        body :JSON.stringify(obj)
       })
       .then((req)=>req.json())
       .then((res)=>{
        console.log(res,'update user profile');
       })
    }
  return (
    <div className='form-edit'>
        <h1>Edit Form</h1>
        <Form onSubmit={handaleUpdate}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Role</Form.Label>
         <select style={{width:"100%",paddingBottom:"5px",paddingTop:"5px"}}>
            <option>Merchant</option>
            <option>Admin</option>
            <option>Customer</option>
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