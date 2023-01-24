import React, {useState, useEffect} from 'react';
import {Button, Form, FormControl} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Contacts from './Contacts';
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from 'react-router-dom'

import * as apigateway from './ApiGateWay.js';

function Edit(){

    const[firstname, setFirstName] = useState('');
    const[lastname, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[phonenumber, setPhoneNumber] = useState('');
    const[image, setImageUrl] = useState('');
    const[id, setId] = useState('');

    let history = useNavigate();

    var index = Contacts.map(function(e){
        return e.id
    }).indexOf(id);

    const  handleSubmit =(e) =>{
        e.preventDefault();
       
        apigateway.update(firstname, lastname, email, phonenumber, image, id);

        history('/');
    }

    useEffect(() =>{
        setFirstName(localStorage.getItem('firstName'))
        setLastName(localStorage.getItem('lastName'))
        setEmail(localStorage.getItem('email'))
        setPhoneNumber(localStorage.getItem('phoneNumber'))
        setImageUrl(localStorage.getItem('imgURL'))
        setId(localStorage.getItem('id'))

    },[])

    return (
        <div>
              <Form className='d-grid gap-2' style={{margin: "15rem"}}>
              <Form.Group className='mb-3' controlId='formFN'>
                    <FormControl type="text" placeholder='Enter FirstName' value={firstname} required onChange={(e) => setFirstName(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formnLN'>
                    <FormControl type="text" placeholder='Enter LastName' value={lastname} required onChange={(e) => setLastName(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formEmail'>
                    <FormControl type="text" placeholder='Enter Email' value={email} required onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formPN'>
                    <FormControl type="text" placeholder='Enter PhoneNumber' value={phonenumber} required onChange={(e) => setPhoneNumber(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formURL'>
                    <FormControl type="text" placeholder='Enter Url' value={image} required onChange={(e) => setImageUrl(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Update</Button>
            </Form>
        </div>
    )

}

export default Edit;