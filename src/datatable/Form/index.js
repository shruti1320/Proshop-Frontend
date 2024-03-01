
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'

import { useState } from 'react';
export default function UserDataEditForm({ isOpen, handleClose, id }) {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  //console.log(name,'name',email,'email',role,'roles');
  const handaleUpdate = () => {
    const obj = {
      name,
      email,
      password,
      role,
      isActive: true
    }
    fetch(`${process.env.REACT_APP_API_BASE_PATH}/api/users/profile/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj)

    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res, 'update user profile');
        handleClose()

      })

  }
  return (
    <Modal show={isOpen} onHide={handleClose} style={{backgroundColor:"transparent"}}>
      <Modal.Header closeButton>
        <Modal.Title>Edit profile form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Role</Form.Label>
            <select style={{ width: "100%", paddingBottom: "5px", paddingTop: "5px" }} onChange={(e) => setRole(e.target.value)}>
              <option value='merchant'>Merchant</option>
              <option value='admin'>Admin</option>
              <option value='user'>Customer</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

        </Form></Modal.Body>
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

