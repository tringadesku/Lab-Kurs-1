import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Dhomat = () => {

  const [dbDhomat, setdbDhomat] = useState([]);
  const [dhomaEdited, setDhomaEdited] = useState(null);

  function getDhomat(){
    const url = 'https://localhost:7013/api/Dhoma';
    fetch(url, {
      method: 'GET'
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
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteDhoma(roomNr);
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getDhomat,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
          <th scope='col'>RoomNr (PK)</th>
          <th scope='col'>Nr Pacientave</th>
          <th> </th>
          <th><Link to="/addDhoma" onClick={() => {window.location.href="/addDhoma"}} className="btn btn-primary">Shto dhome</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbDhomat.map(dbDhomat => (
          <tr key={dbDhomat.roomNr}>
            <td>{dbDhomat.roomNr}</td>
            <td>{dbDhomat.nrPacientave}</td>
          <td><Link to={`/editDhoma/${dbDhomat.roomNr}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editDhoma/${dbDhomat.roomNr}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Dhomen "${dbDhomat.roomNr}"? `)) deleteDhoma(dbDhomat.roomNr)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDhomaEdited(dhomaEdited){
    setDhomaEdited(null);
    if(dhomaEdited === null){
      return;
    }

    let dhomatCopy = [...dbDhomat];

    const index = dhomatCopy.findIndex((dhomatCopyDhoma, currentIndex) => {
      if(dhomatCopyDhoma.roomNr === dhomaEdited.roomNr){
        return true;
      }
    });

    if(index !== -1){
      dhomatCopy[index] = dhomaEdited;
    }

    setdbDhomat(dhomatCopy);

    alert("Dhoma u editua me sukses!");
  }

  function onDeleteDhoma(deletedRoomNr){
    let dhomatCopy = [...dbDhomat];
  
    const index = dhomatCopy.findIndex((dhomatCopyDhoma, currentIndex) => {
      if(dhomatCopyDhoma.roomNr === deletedRoomNr){
        return true;
      }
    });
  
    if(index !== -1){
      dhomatCopy.splice(index, 1);
    }
  
    setdbDhomat(dhomatCopy);
  
    alert("Dhoma u fshi me sukses!");
  }

}