import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Operacionet = () => {

  const [dbOperacionet, setdbOperacionet] = useState([]);

  function getOperacionet(){
    const url = 'https://localhost:7013/api/Operacioni'; 
    fetch(url, {
      method: 'GET'
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
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteOperacioni(idOperacioni); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getOperacionet,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
      <h3>Operacionet</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'>Id Operacioni (PK)</th>
          <th scope='col'>ID Mjeku Kryesor</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Salla</th>
          <th scope='col'>Data</th>
          <th scope='col'>Ora</th>
          <th> </th>
          <th><Link to="/addOperacioni" onClick={() => {window.location.href="/addOperacioni"}} className="btn btn-primary">Shto Operacion</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbOperacionet.map(dbOperacionet => (
          <tr key={dbOperacionet.idOperacioni}>
          <td>{dbOperacionet.idOperacioni}</td>
          <td>{dbOperacionet.idUserMjekuKryesor}</td>
          <td>{dbOperacionet.idPacienti}</td>
          <td>{dbOperacionet.sallaNr}</td>
          <td>{dbOperacionet.data}</td>
          <td>{dbOperacionet.ora}</td>
          <td><Link to={`/editOperacioni/${dbOperacionet.idOperacioni}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editOperacioni/${dbOperacionet.idOperacioni}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Operacionin "${dbOperacionet.idOperacioni}"? `)) deleteOperacioni(dbOperacionet.idOperacioni)}} className="btn btn-danger">Delete</button></td>
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