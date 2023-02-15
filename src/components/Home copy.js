import React, { Fragment , useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Contacts from './Contacts';
import {Link, useNavigate} from 'react-router-dom'

import * as apigateway from './ApiGateWay.js';

function Home(){



    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8080/smile/get-all-users', {
          method: "GET",
          headers: {"Authorization": `Bearer test@gmail.com`}
        }).then(response => response.json())
        .then(data => setData(data))
      },[]);

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:8080/healthEme/api/V1/get-contacts')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    // }, []);

    let history = useNavigate();

    const viewProfile = (trackers) =>{
     //   localStorage.setItem('dailytrackers', trackers);J
        localStorage.setItem('dailytrackers', JSON.stringify(trackers));
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
        apigateway.deletContacts(id);
        history('/');
    }


   

    return (
        <Fragment>
            <div style={{margin: "10rem"}}>
                <Link className='d-grid gap-2' to = "/create">
                    <Button size ="lg"> Create New Participant </Button>
                </Link>
                <br>
                </br>
                <Table striped bordered hover size ="sm">
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
                    <tbody>
                        {
                        
                                data && data.length > 0
                            ?
                            data.map((item) =>{
                            return (
                                <tr>
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
                                            viewProfile(item.dailytrackers)}> View </Button>
                                        </Link>
                                        &nbsp;
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
            </div>
        </Fragment>
    )
}

export default Home;