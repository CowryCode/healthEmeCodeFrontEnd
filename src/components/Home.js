import React, { Fragment , useEffect, useState} from 'react';
import {Button, Table, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
// import Contacts from './Contacts';
import {Link, useNavigate} from 'react-router-dom'

import * as apigateway from './ApiGateWay.js';

function Home(){



    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [msg, setMsg] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8080/smile/get-all-appdownloaded-users', {
          method: "GET",
          headers: {"Authorization": `Bearer test@gmail.com`}
        }).then(response => response.json())
        .then(data => setData(data))

        fetch('http://localhost:8080/smile/get-all-app-not-downloaded-users', {
          method: "GET",
          headers: {"Authorization": `Bearer test@gmail.com`}
        }).then(response => response.json())
        .then(data1 => setData1(data1))

        fetch('http://localhost:8080/smile/get-unapproved-tribemessages', {
          method: "GET",
          headers: {"Authorization": `Bearer test@gmail.com`}
        }).then(response => response.json())
        .then(msg => setMsg(msg))

      },[]);

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:8080/healthEme/api/V1/get-contacts')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    // }, []);

    let history = useNavigate();

    const viewProfile = (trackers, id) =>{
     //   localStorage.setItem('dailytrackers', trackers);J
        localStorage.setItem('dailytrackers', JSON.stringify(trackers));
        localStorage.setItem('participantID', id);
    }

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
       // apigateway.deletContacts(id);
        history('/');
    }



    return (
        <Fragment>
            <div style={{margin: "10rem"}}>
                <Row>
                    <Col xs={12} md={3}>
                    <Link className='d-grid gap-2' to = "/create"> <Button size ="lg"> Create New Participant </Button></Link>
                    </Col>
                    <Col xs={12} md={3}>
                    <Link className='d-grid gap-2' to = "/supportmessage"> <Button size ="lg"> myTribe Messages ({msg.length}) </Button></Link>
                    </Col>
                    <Col xs={12} md={4}>
                        
                    </Col>
                </Row>
                <div>
                <br>
                </br>
                <Row>
                    <Col xs={12} md={8}>
                    <h6>Number of Participants that downloaded app : {data.length}</h6>
                    <Table striped bordered hover size ="sm" responsive="xl" className="table-fixed-header">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                 SmileGram Points
                            </th>
                            <th>
                                 Smile Duration (Sec.)
                            </th>
                            <th>
                                Total Time Spent (Sec.)
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{overflowY: "auto" }}>
                        {
                                data && data.length > 0
                            ?
                            data.map((item) =>{
                            return (
                                <tr key={item.id}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.smilegrampoints}
                                    </td>
                                    <td>
                                        {item.accumulatedValue}
                                    </td>
                                    <td>
                                        {item.todayAccumulatedSpentTime}
                                    </td>
                                    <td>
                                        <Link to = {'/viewprofile'}> 
                                        <Button onClick={() => 
                                            viewProfile(item.dailytrackers, item.name)}> View </Button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                            })
                            :
                            "No Participant has downloaded the app"
                        }
                    </tbody>
                </Table>
                    </Col>
                    <Col xs={12} md={4}>
                    <h6> Undownloaded app : {data1.length}</h6>
                    <Table striped bordered hover size ="sm">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                 Date Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                data1 && data1.length > 0
                            ?
                            data1.map((item) =>{
                            return (
                                <tr key={item.id}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.dateCreated}
                                    </td>
                                </tr>
                            )
                            })
                            :
                            "All Participants has downloaded the app"
                        }
                    </tbody>
                    </Table>
                    </Col>
                </Row>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;