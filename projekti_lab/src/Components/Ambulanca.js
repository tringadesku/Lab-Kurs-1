import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const Ambulanca = () => {

  const [dbAmbulancat, setdbAmbulancat] = useState([]);

  function getAmbulancat(){
    const url = 'https://localhost:7013/api/Ambulanca';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(ambulancatFromServer => {
      console.log(ambulancatFromServer);
      setdbAmbulancat(ambulancatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteAmbulanca(nrAuto){
    const url = `https://localhost:7013/api/Ambulanca/${nrAuto}`;
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Ambulanca u fshi me sukses!");
      getAmbulancat();
    })
    .catch(error => {
      console.log(error);
      alert("Kjo ambulance nuk mund te fshihet ose mund te jete ne perdorim!");
    });

  }

  useEffect(getAmbulancat,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Ambulancat</h3>
    <table className='table'>
      <thead>
        <tr className="table" style={{backgroundColor: "#A2BFC8"}}>
          <th scope='col'>Numri Auto (PK)</th>
          <th scope='col'>Id Mjeku Lider</th>
          <th scope='col'>Lokacioni</th>
          <th scope='col'>Statusi</th>
          <th> </th>
          <th><Link to="/addAmbulanca" onClick={() => {window.location.href="/addAmbulanca"}} className="btn btn-secondary custom-btn">Shto Ambulance</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbAmbulancat.map(dbAmbulancat => (
          <tr key={dbAmbulancat.nrAuto}>
            <td>{dbAmbulancat.nrAuto}</td>
            <td>{dbAmbulancat.idUserMjekuLider}</td>
            <td>{dbAmbulancat.lokacioni}</td>
            <td>{dbAmbulancat.statusi}</td>
          <td><Link to={`/editAmbulanca/${dbAmbulancat.nrAuto}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editAmbulanca/${dbAmbulancat.nrAuto}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Ambulancen "${dbAmbulancat.nrAuto}"? `)) deleteAmbulanca(dbAmbulancat.nrAuto)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}
