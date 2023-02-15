import React, { Fragment , useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Contacts from './Contacts';
import {Link, useNavigate} from 'react-router-dom'

import * as apigateway from './ApiGateWay.js';

import { Card, Col } from "react-bootstrap";

function ViewProfile(){

    const [dailytrackers, setDailyTrackers] = useState([]);
    const [participantID, setParticipantID] = useState([]);

    useEffect(() =>{
       // setDailyTrackers(localStorage.getItem('dailytrackers'))

        const storedArray = localStorage.getItem('dailytrackers');
        setDailyTrackers(JSON.parse(storedArray));
        setParticipantID(localStorage.getItem('participantID'));
    },[])

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
      //  apigateway.deletContacts(id);
        history('/');
    }


    return (
        <Fragment>
            <div style={{margin: "10rem"}}>
                <Col xs={12} sm={6} md={4}>
                    <Card>
                        <Card.Body>
                        <Card.Title>{participantID} </Card.Title>
                        <Card.Subtitle>Daily Tracker</Card.Subtitle>
                        {/* <Card.Text>
                            <p>Date Registered: San Francisco, CA</p>
                        </Card.Text> */}
                        </Card.Body>
                    </Card>
                    <Link className='d-grid gap-2' to = "/">
                    <Button size ="lg"> Home </Button>
                </Link>
                </Col>
                <br>
                </br>

                <Table striped bordered hover size ="sm">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                 Data Created
                            </th>
                            <th>
                                 SmileGram Point
                            </th>
                            <th>
                                 Smile Duration (Sec.)
                            </th>
                            <th>
                                Total Time Spent (Sec.)
                            </th>
                            <th>
                                Submitted BMI
                            </th>
                            {/* <th>
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                                dailytrackers && dailytrackers.length > 0
                            ?
                            dailytrackers.map((item) =>{
                            return (
                                <tr>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.trackerIdentifier}
                                    </td>
                                    <td>
                                        {item.achievedScore}
                                    </td>
                                    <td>
                                        {item.todayAccumulatedSmileDuration}
                                    </td>
                                    <td>
                                        {item.todayAccumulatedSpentTime}
                                    </td>
                                    <td>
                                        {item.submittedDailyQuestionnaire}
                                    </td>
                                    {/* <td>
                                        <Link to = {'/edit'}> 
                                        <Button onClick={() => 
                                            handleEdit(item.id, item.firstName, item.lastName, item.email, item.phoneNumber, item.imgURL)}> View </Button>
                                        </Link>
                                        &nbsp;
                                        <Link to = {'/edit'}> 
                                        <Button onClick={() => 
                                            handleEdit(item.id, item.firstName, item.lastName, item.email, item.phoneNumber, item.imgURL)}> Edit </Button>
                                        </Link>
                                        &nbsp;
                                        <Button onClick={() => handleDelete(item.id)}> Delete </Button>
                                    </td> */}
                                </tr>
                            )
                            })
                            :
                            "No Contacts available now"
                        }
                    </tbody>
                </Table>
            </div>
        </Fragment>
    )
}

export default ViewProfile;