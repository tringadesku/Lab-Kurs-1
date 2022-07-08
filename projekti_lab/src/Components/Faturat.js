import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";

export const Faturat = () => {

  const [dbFaturat, setdbFaturat] = useState([]);

  function getFaturat(){
    const url = 'https://localhost:7013/api/Fatura'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(faturatFromServer => {
      console.log(faturatFromServer);
      setdbFaturat(faturatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteFatura(idFatura){
    const url = `https://localhost:7013/api/Fatura/${idFatura}`; 
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteFatura(idFatura); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getFaturat,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Faturat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'>Id Fatura (PK)</th>
          <th scope='col'>Id Recepsionisti</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Pershkrimi</th>
          <th scope='col'>Data</th>
          <th scope='col'>Pagesa Totale</th>
          <th scope='col'>Statusi</th>
          <th> </th>
          <th><Link to="/addFatura" onClick={() => {window.location.href="/addFatura"}} className="btn btn-primary">Shto Faturen</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbFaturat.map(dbFaturat => (
          <tr key={dbFaturat.idFatura}>
          <td>{dbFaturat.idFatura}</td>
          <td>{dbFaturat.idUserRecepsionisti}</td>
          <td>{dbFaturat.idPacienti}</td>
          <td>{dbFaturat.pershkrimi}</td>
          <td>{dbFaturat.data}</td>
          <td>{dbFaturat.pagesaTotale}</td>
          <td>{dbFaturat.statusi}</td>
          <td><Link to={`/editFatura/${dbFaturat.idFatura}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editFatura/${dbFaturat.idFatura}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Faturen "${dbFaturat.idFatura}"? `)) deleteFatura(dbFaturat.idFatura)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteFatura(deletedIdFatura){
    let FaturatCopy = [...dbFaturat];
  
    const index = FaturatCopy.findIndex((faturatCopyFatura, currentIndex) => {
      if(faturatCopyFatura.idFatura === deletedIdFatura){
        return true;
      }
    });
  
    if(index !== -1){
     FaturatCopy.splice(index, 1);
    }
  
    setdbFaturat(FaturatCopy);
  
    alert("Fatura u fshi me sukses!");
  }

}