import React from 'react'
import { Col, Row } from 'react-bootstrap'
import item from "../images/background.png"

export default function MainHomeScreen() {
  return (
    <div>
         <Row>
          <Col md={6}>Elecronic Product Upto 50%off</Col>
          <Col md={6}>
            <img src={item} alt="try"></img>
          </Col>
         </Row>
    </div>
  )
}
