import React, { Fragment , useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Contacts from './Contacts';
import {Link, useNavigate} from 'react-router-dom'

import * as apigateway from './ApiGateWay.js';

function Home(){

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/healthEme/api/V1/get-contacts')
            .then(response => response.json())
            .then(data => setData(data))
    }, []);

    let history = useNavigate();

    const handleEdit = (id, fn, ln, email, pn, url) =>{
        localStorage.setItem('firstName', fn);
        localStorage.setItem('lastName', ln);
        localStorage.setItem('email', email);
        localStorage.setItem('phoneNumber', pn);
        localStorage.setItem('imgURL', url);
        localStorage.setItem('id', id);
    }

    const handleDelete = (id) => {
        alert("Contact deleted")
        apigateway.deletContacts(id);
        history('/');
    }


   

    return (
        <Fragment>
            <div style={{margin: "10rem"}}>
                <Table striped bordered hover size ="sm">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Phone Number
                            </th>
                            <th>
                                Image Url
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        
                                data && data.length > 0
                            ?
                            data.map((item) =>{
                            return (
                                <tr>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.firstName}
                                    </td>
                                    <td>
                                        {item.lastName}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.phoneNumber}
                                    </td>
                                    <td>
                                        {item.imgURL}
                                    </td>
                                    <td>
                                        <Link to = {'/edit'}> 
                                        <Button onClick={() => 
                                            handleEdit(item.id, item.firstName, item.lastName, item.email, item.phoneNumber, item.imgURL)}> Edit </Button>
                                        </Link>
                                        &nbsp;
                                        <Button onClick={() => handleDelete(item.id)}> Delete </Button>
                                    </td>
                                </tr>
                            )
                            })
                            :
                            "No Contacts available now"
                        }
                    </tbody>
                </Table>
                <br>
                </br>
                <Link className='d-grid gap-2' to = "/create">
                    <Button size ="lg"> Create </Button>
                </Link>
            </div>
        </Fragment>
    )
}

export default Home;