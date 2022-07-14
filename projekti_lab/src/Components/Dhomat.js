import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import {checkAdmin} from "../Services/checkRolet"

export const Dhomat = () => {

  const [dbDhomat, setdbDhomat] = useState([]);

  function getDhomat(){
    const url = 'https://localhost:7013/api/Dhoma';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(dhomatFromServer => {
      console.log(dhomatFromServer);
      setdbDhomat(dhomatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteDhoma(roomNr){
    const url = `https://localhost:7013/api/Dhoma/${roomNr}`;
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Dhoma u fshi me sukses!");
      getDhomat();
    })
    .catch(error => {
      console.log(error);
      alert("Kjo dhome nuk mund te fshihet ose mund te jete ne perdorim!");
    });

  }

  useEffect(getDhomat,[]);


  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Dhomat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table" style={{backgroundColor: "#A2BFC8"}}>
          <th scope='col'>RoomNr (PK)</th>
          <th scope='col'>Nr Pacientave</th>
          <th> </th>
          <th>{ checkAdmin() && <Link to="/addDhoma" onClick={() => {window.location.href="/addDhoma"}} className="btn btn-secondary costum-btn">Shto dhome</Link> }</th>
        </tr>
      </thead>
      <tbody>
          {dbDhomat.map(dbDhomat => (
          <tr key={dbDhomat.roomNr}>
            <td>{dbDhomat.roomNr}</td>
            <td>{dbDhomat.nrPacientave}</td>
          <td><Link to={`/editDhoma/${dbDhomat.roomNr}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editDhoma/${dbDhomat.roomNr}`}}>Edit</Link></td>
          <td>{ checkAdmin() && <button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Dhomen "${dbDhomat.roomNr}"? `)) deleteDhoma(dbDhomat.roomNr)}} className="btn btn-secondary">Delete</button>}</td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )




}
