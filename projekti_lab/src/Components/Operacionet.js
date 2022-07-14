import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

export const Operacionet = () => {

  const [dbOperacionet, setdbOperacionet] = useState([]);

  function getOperacionet(){
    const url = 'https://localhost:7013/api/Operacioni'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(operacionetFromServer => {
      console.log(operacionetFromServer);
      setdbOperacionet(operacionetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteOperacioni(idOperacioni){
    const url = `https://localhost:7013/api/Operacioni/${idOperacioni}`; 
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Operacioni u fshi me sukses!");
    })
    .catch(error => {
      console.log(error);
      alert("Ky operacion nuk mund te fshihet!");
    });

  }

  useEffect(getOperacionet,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Operacionet</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table"  style={{backgroundColor: "#A2BFC8"}}>
        <th scope='col'>Id Operacioni (PK)</th>
          <th scope='col'>ID Mjeku Kryesor</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Salla</th>
          <th scope='col'>Data</th>
          <th scope='col'>Ora</th>
          <th> </th>
          <th><Link to="/addOperacioni" onClick={() => {window.location.href="/addOperacioni"}} className="btn btn-secondary custom-btn">Shto Operacion</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbOperacionet.map(dbOperacionet => (
          <tr key={dbOperacionet.idOperacioni}>
          <td>{dbOperacionet.idOperacioni}</td>
          <td>{dbOperacionet.idUserMjekuKryesor}</td>
          <td>{dbOperacionet.idPacienti}</td>
          <td>{dbOperacionet.sallaNr}</td>
          <td>{moment.utc(dbOperacionet.data).format('MM/DD/YY')}</td>
          <td>{dbOperacionet.ora}</td>
          <td><Link to={`/editOperacioni/${dbOperacionet.idOperacioni}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editOperacioni/${dbOperacionet.idOperacioni}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Operacionin "${dbOperacionet.idOperacioni}"? `)) deleteOperacioni(dbOperacionet.idOperacioni)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteOperacioni(deletedIdOperacioni){
    let operacionetCopy = [...dbOperacionet];
  
    const index = operacionetCopy.findIndex((operacionetCopyOperacioni, currentIndex) => {
      if(operacionetCopyOperacioni.idOperacioni === deletedIdOperacioni){
        return true;
      }
    });
  
    if(index !== -1){
      operacionetCopy.splice(index, 1);
    }
  
    setdbOperacionet(operacionetCopy);
  
    alert("Operacioni u fshi me sukses!");
  }

}