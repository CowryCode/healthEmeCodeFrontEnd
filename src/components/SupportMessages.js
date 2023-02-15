import React, { Fragment , useEffect, useState} from 'react';
import {Button, Table, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
// import Contacts from './Contacts';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

import * as apigateway from './ApiGateWay.js';

function SupportMessages(){

    const [data, setData] = useState([]);
  

    useEffect(()=>{
        fetch('http://localhost:8080/smile/get-unapproved-tribemessages', {
          method: "GET",
          headers: {"Authorization": `Bearer test@gmail.com`}
        }).then(response => response.json())
        .then(data => setData(data))
        .then((result) => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    },[]);

    let history = useNavigate();

    const viewProfile = (trackers, id) =>{
     //   localStorage.setItem('dailytrackers', trackers);J
        localStorage.setItem('dailytrackers', JSON.stringify(trackers));
        localStorage.setItem('participantID', id);
    }

    const fetchData = async (imessageId, url, data) => {
        const response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer `+imessageId
            }
          })
          .then(response => {
            console.log(response.data);
            const json = response.json();
            setData(json);
          })
          .catch(error => {
            console.log(error);
          });

        // const response = await fetch(url, JSON.stringify(data), {
        //   method: "POST",
        //   headers: {"Authorization": `Bearer `+imessageId}
        // });
        // const json = await response.json();
        // setData(json);
      };
    

    const handleApproval =  async (imessageId, recieverID) => {
        const data = {
            id: imessageId,
            receiverID: recieverID,
          };

          const response = await fetch("http://localhost:8080/smile/approved-message", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer `+imessageId,
            },
          });
      
          if (response.ok) {
            const updatedData = await response.json();
            setData(updatedData);
          }


        //   const response = await fetch('http://localhost:8080/smile/approved-message', JSON.stringify(data), {
        //   method: "POST",
        //   headers: {"Authorization": `Bearer `+imessageId}
        // });

        //   const json = await response.json();
        //   setData(json);
          
       // fetchData(imessageId, 'http://localhost:8080/smile/approved-message', data)
    }




    const handleDelete = async (imessageId) => {
        const response = await fetch('http://localhost:8080/smile/delete-message', {
          method: "GET",
          headers: {"Authorization": `Bearer `+imessageId}
        });
        const json = await response.json();
        setData(json);
        //fetchData(imessageId, 'http://localhost:8080/smile/delete-message')
    }

    const handleEdit = (id, fn, ln, email, pn, url) =>{
        localStorage.setItem('firstName', fn);
        localStorage.setItem('lastName', ln);
        localStorage.setItem('email', email);
        localStorage.setItem('phoneNumber', pn);
        localStorage.setItem('imgURL', url);
        localStorage.setItem('id', id);
    }

    return (
        <Fragment>
            <div style={{margin: "10rem"}}>
                <Row>
                    <Col xs={12} md={2}> </Col>
                    <Col xs={12} md={3}>
                    <Link className='d-grid gap-2' to = "/"> <Button size ="lg"> Home </Button></Link>
                    </Col>
                    <Col xs={12} md={4}>
                        
                    </Col>
                </Row>
                <div>
                <br>
                </br>
                <Row>
                    <Col xs={12} md={1}></Col>
                    <Col xs={12} md={12}>
                    <h6>Pending Messages : {data.length}</h6>
                    <Table striped bordered hover size ="sm">
                    <thead>
                        <tr>
                            <th>
                               Reciever ID
                            </th>
                            <th>
                                 Content
                            </th>
                        
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                data && data.length > 0
                            ?
                            data.map((item) =>{
                            return (
                                <tr key={item.id}>
                                    <td>
                                        {item.receiverID}
                                    </td>
                                    <td>
                                        {item.content}
                                    </td>
                                    
                                
                                    <td>
                                    <Row>
                                      <Col s={12} md={6}>
                                      <Button onClick={() =>  handleApproval(item.id, item.receiverID)}> Approve</Button>
                                      </Col>
                                      <Col xs={12} md={6}>
                                      <Button variant='danger'  onClick={() =>  handleDelete(item.id)}> Delete </Button>
                                      </Col>

                                    </Row>
                                       
                                    </td>
                                </tr>
                            )
                            })
                            :
                            "No Contacts available now"
                        }
                     </tbody>
                   </Table>
                 </Col>
                 <Col xs={12} md={1}></Col>
                </Row>
                </div>
            </div>
        </Fragment>
    )
};

export default SupportMessages;