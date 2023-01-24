import axios from 'axios';
import Contacts from './Contacts';

export function saveContact(fn, ln, email, pn, url){

    const data = {
        firstName: fn,
        lastName :ln,
        email : email,
        phoneNumber : pn,
        imgURL : url
      };

      axios.post('http://localhost:8080/healthEme/api/V1/save-contact', JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

export function update(fn, ln, email, pn, url, id){

    const data = {
        id: id,
        firstName: fn,
        lastName :ln,
        email : email,
        phoneNumber : pn,
        imgURL : url
      };


      axios.post('http://localhost:8080/healthEme/api/V1/updatecontact/'+id, JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

export function deletContacts(id){
    let response =   axios.delete('http://localhost:8080/healthEme/api/V1/remove-contact/'+id)
    .then(response => {
      // handle the response data
      console.log(response.data);
    })
    .catch(error => {
      // handle the error
      console.log(error);
    });
  
  //   let jsonArray = JSON.parse(response).data
    let jsonArray = response.data;
     return convertJsonToContacts(jsonArray);
  }

export function getContacts(){
  let response =   axios.get('http://localhost:8080/healthEme/api/V1/get-contacts')
  .then(response => {
    // handle the response data
    console.log(response.data);
  })
  .catch(error => {
    // handle the error
    console.log(error);
  });

//   let jsonArray = JSON.parse(response).data
  let jsonArray = response.data;
   return convertJsonToContacts(jsonArray);
}

function convertJsonToContacts(jsonArray) {
    let contactArray = jsonArray.map(function(jsonElement) {
        let Contact = {
            name: jsonElement.name,
            age: jsonElement.age,
            id: jsonElement.id,
    FirstName: jsonElement.firstName,
    LastName: jsonElement.lastName,
    Email: jsonElement.email,
    PhoneNumber: jsonElement.phoneNumber,
    ImageUrl: jsonElement.imgURL
        };
        return Contact;
    });
    return contactArray;
}

