import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Ambulanca = () => {

  const [dbAmbulancat, setdbAmbulancat] = useState([]);

  function getAmbulancat(){
    const url = 'https://localhost:7013/api/Ambulanca';
    fetch(url, {
      method: 'GET'
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
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteAmbulanca(nrAuto);
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getAmbulancat,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
      <h3>Ambulancat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
          <th scope='col'>Numri Auto (PK)</th>
          <th scope='col'>Id Mjeku Lider</th>
          <th scope='col'>Lokacioni</th>
          <th scope='col'>Statusi</th>
          <th> </th>
          <th><Link to="/addAmbulanca" onClick={() => {window.location.href="/addAmbulanca"}} className="btn btn-primary">Shto Ambulance</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbAmbulancat.map(dbAmbulancat => (
          <tr key={dbAmbulancat.nrAuto}>
            <td>{dbAmbulancat.nrAuto}</td>
            <td>{dbAmbulancat.idUserMjekuLider}</td>
            <td>{dbAmbulancat.lokacioni}</td>
            <td>{dbAmbulancat.statusi}</td>
          <td><Link to={`/editAmbulanca/${dbAmbulancat.nrAuto}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editAmbulanca/${dbAmbulancat.nrAuto}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Ambulancen "${dbAmbulancat.nrAuto}"? `)) deleteAmbulanca(dbAmbulancat.nrAuto)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteAmbulanca(deletedNrAuto){
    let ambulancatCopy = [...dbAmbulancat];
  
    const index = ambulancatCopy.findIndex((ambulancatCopyAmbulanca, currentIndex) => {
      if(ambulancatCopyAmbulanca.nrAuto === deletedNrAuto){
        return true;
      }
    });
  
    if(index !== -1){
      ambulancatCopy.splice(index, 1);
    }
  
    setdbAmbulancat(ambulancatCopy);
  
    alert("Ambulanca u fshi me sukses!");
  }

}
