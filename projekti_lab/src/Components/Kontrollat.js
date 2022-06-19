import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Kontrollat = () => {

  const [dbKontrollat, setdbKontrollat] = useState([]);

  function getKontrollat(){
    const url = 'https://localhost:7013/api/Kontrolla'; 
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(kontrollatFromServer => {
      console.log(kontrollatFromServer);
      setdbKontrollat(kontrollatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteKontrolla(idKontrolla){
    const url = `https://localhost:7013/api/Kontrolla/${idKontrolla}`; 
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteKontrolla(idKontrolla); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getKontrollat,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
      <h3>Kontrollat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'>Id Kontrolla (PK)</th>
          <th scope='col'>Id UserMjeku</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Diagnoza</th>
          <th scope='col'>Pershkrimi</th>
          <th scope='col'>Receta</th>
          <th> </th>
          <th><Link to="/addKontrolla" onClick={() => {window.location.href="/addKontrolla"}} className="btn btn-primary">Shto Kontrolle</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbKontrollat.map(dbKontrollat => (
          <tr key={dbKontrollat.idKontrolla}>
          <td>{dbKontrollat.idKontrolla}</td>
          <td>{dbKontrollat.idUserMjeku}</td>
          <td>{dbKontrollat.idPacienti}</td>
          <td>{dbKontrollat.diagnoza}</td>
          <td>{dbKontrollat.pershkrimi}</td>
          <td>{dbKontrollat.receta}</td>
          <td><Link to={`/editKontrolla/${dbKontrollat.idKontrolla}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editKontrolla/${dbKontrollat.idKontrolla}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Kontrollen "${dbKontrollat.idKontrolla}"? `)) deleteKontrolla(dbKontrollat.idKontrolla)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteKontrolla(deletedIdKontrolla){
    let kontrollatCopy = [...dbKontrollat];
  
    const index = kontrollatCopy.findIndex((kontrollatCopyKontrolla, currentIndex) => {
      if(kontrollatCopyKontrolla.idKontrolla === deletedIdKontrolla){
        return true;
      }
    });
  
    if(index !== -1){
      kontrollatCopy.splice(index, 1);
    }
  
    setdbKontrollat(kontrollatCopy);
  
    alert("Kontrolla u fshi me sukses!");
  }

}