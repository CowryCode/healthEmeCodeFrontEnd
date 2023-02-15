import React, {useState} from 'react';
import {Button, Form, FormControl, Row, Col,} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Contacts from './Contacts';
import * as apigateway from './ApiGateWay.js';
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from 'react-router-dom'


function CreateParticipate(){
    const[email, setEmail] = useState('');
    const[opinoID, setOpinoID] = useState('');
    // const[email, setEmail] = useState('');
    // const[phonenumber, setPhoneNumber] = useState('');
    // const[image, setImageUrl] = useState('');

    let history = useNavigate();


    
    const  handleSubmit = (e) =>{
        e.preventDefault();
    

    //    const ids = uuid();
    //    let uniqueid = ids.slice(0,8);
    //    let fn = firstname;
    //    let ln = lastname;
    //    let em = email;
    //    let pn = phonenumber;
    //    let img = image;
    //    Contacts.push({id: uniqueid, FirstName: fn, LastName: ln, Email: em, PhoneNumber: pn, ImageUrl: img});


        let em = email;
        let dal = opinoID;
        apigateway.createParticipants(em, dal);

        history('/');
    }


    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }

  

    return(
        <div>
            <Row>
                    <Col xs={12} md={3}>
                    
                    </Col>
                    <Col xs={12} md={6}>
                    <Form className='d-grid gap-2' style={{margin: "15rem"}}>
                <Form.Group className='mb-3' controlId='formNamae'>
                    <FormControl type="text" placeholder='Enter Email Address' required onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formnID'>
                    <FormControl type="text" placeholder='Enter DalOpinoID' required onChange={(e) => setOpinoID(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
            </Form>
                    </Col>
                    <Col xs={12} md={3}>
                        
                    </Col>
                </Row>
             <div></div>
        </div>
    )
}



export default CreateParticipate;