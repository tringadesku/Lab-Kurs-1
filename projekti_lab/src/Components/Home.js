import React,{useState, useEffect} from 'react'
import moment from 'moment';
import authHeader from "../Services/auth-header";

export const Home = () => {

  const emri = (localStorage.getItem("user_emri"));
  const mbiemri = (localStorage.getItem("user_mbiemri"));
  const [activeStaff, setActiveStaff] = useState([]);
  const useriId = (localStorage.getItem("user_id"));
  
  return (
    <div style={{paddingLeft: "18%"}}>
      <h5 className='mx-5'>Welcome,{emri} {mbiemri} !</h5>

      <button onClick={setActiveUser}>Check In</button>
      <button onClick={() => {removeActiveUser(useriId)}}>Check Out</button>
      
    </div>
    
  )

  function getStaff(){
    const url = 'https://localhost:7013/api/ActiveStaff';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(activeStaffUsers => {
      console.log(activeStaffUsers);
      setActiveStaff(activeStaffUsers);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getStaff,[]);
  
    function setActiveUser(){
      const url = 'https://localhost:7013/api/ActiveStaff';

      const activeUserToAdd = {
        useriId: (localStorage.getItem("user_id")),
        useriRole: (localStorage.getItem("user_role")),
        useriName: (localStorage.getItem("user_emri")) + " " + (localStorage.getItem("user_mbiemri")),
        checkedInTime: moment().format()
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(activeUserToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });  

    }

    function removeActiveUser(id){
      const url = `https://localhost:7013/api/ActiveStaff/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: authHeader()
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onRemoveActiveUser(id);
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    function onRemoveActiveUser(deletedUserid){
        let activeCopy = [...activeStaff];
      
        const index = activeCopy.findIndex((activeCopyStaff, currentIndex) => {
          if(activeCopyStaff.useriId === deletedUserid){
            return true;
          }
        });
      
        if(index !== -1){
          activeCopy.splice(index, 1);
        }
      
        setActiveStaff(activeCopy);
      }
  
    }
      

  

 

  



  