// BootstrapModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function BootstrapModal({ isOpen, handleClose, title }) {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [role,setRole]=useState=useState('')
  const getUserDetails = []
  const handaleUpdate = () => {
    // e.preventDefault()

    // console.log(isModalAddOpen, " value ");


    const obj = {
      name,
      email,
      password,
      role: role ||'merchant'
    }
    console.log(obj, 'obj');
    fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(obj)
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res, 'response from req');
        alert('Account Added Successfully')

      })
      .catch((err) => {
        alert('please signup first')
        return err
      })
    handleClose()

  }
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handaleUpdate}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Your name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Role</Form.Label>
            <select onChange={(e)=>{setRole(e.target.value)}}>
              <option value='user'>User</option>
              <option value='merchant'>Merchant</option>
              
            </select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* Add additional buttons or actions if needed */}
        <Button variant="primary" onClick={handaleUpdate}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BootstrapModal;
