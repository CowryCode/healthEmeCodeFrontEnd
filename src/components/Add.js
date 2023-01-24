import React, {useState} from 'react';
import {Button, Form, FormControl} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Contacts from './Contacts';
import * as apigateway from './ApiGateWay.js';
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from 'react-router-dom'


function Add(){
    const[firstname, setFirstName] = useState('');
    const[lastname, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[phonenumber, setPhoneNumber] = useState('');
    const[image, setImageUrl] = useState('');

    let history = useNavigate();


    
    const  handleSubmit = (e) =>{
        e.preventDefault();
    

       const ids = uuid();
       let uniqueid = ids.slice(0,8);
       let fn = firstname;
       let ln = lastname;
       let em = email;
       let pn = phonenumber;
       let img = image;
       Contacts.push({id: uniqueid, FirstName: fn, LastName: ln, Email: em, PhoneNumber: pn, ImageUrl: img});

        apigateway.saveContact(fn, ln, em, pn, img);

        history('/');
    }


    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('file', file);

        fetch('https://your-api-url.com/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    return(
        <div>
            <Form className='d-grid gap-2' style={{margin: "15rem"}}>
                <Form.Group className='mb-3' controlId='formFN'>
                    <FormControl type="text" placeholder='Enter FirstName' required onChange={(e) => setFirstName(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formnLN'>
                    <FormControl type="text" placeholder='Enter LastName' required onChange={(e) => setLastName(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formEmail'>
                    <FormControl type="text" placeholder='Enter Email' required onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formPN'>
                    <FormControl type="text" placeholder='Enter PhoneNumber' required onChange={(e) => setPhoneNumber(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formURL'>
                    <FormControl type="text" placeholder='Enter Url' required onChange={(e) => setImageUrl(e.target.value)}>
                    </FormControl>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
            </Form>
             <div></div>
            <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload</button>
        </form>
        </div>
    )
}



export default Add;