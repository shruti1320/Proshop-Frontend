import React from 'react'
import "../scss/Dashboard.scss"
import { Col, Row, Image } from 'react-bootstrap'

export default function DashboardScreen() {
    return (
        <div>
            <Row>
                <Col md={4}>
                    <p className='laptop-text mt-5 pt-5 ps-5'>LAPTOPS FOR THE FUTURE</p>
                    <p className='ps-5'>The new 18 inch bezeless display offering a 4K display with smart screen feature.</p>
                </Col>
                <Col className='ellipse '>
                    <Image>
                        
                    </Image>
                </Col>
            </Row>



        </div>
    )
}
