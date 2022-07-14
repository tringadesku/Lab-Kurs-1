import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

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
      alert("Fatura u fshi me sukses!");
      getFaturat();
    })
    .catch(error => {
      console.log(error);
      alert("Kjo fature nuk mund te fshihet!");
    });

  }

  useEffect(getFaturat,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Faturat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table"  style={{backgroundColor: "#A2BFC8"}}>
        <th scope='col'>Id Fatura (PK)</th>
          <th scope='col'>Id Recepsionisti</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Pershkrimi</th>
          <th scope='col'>Data</th>
          <th scope='col'>Pagesa Totale</th>
          <th scope='col'>Statusi</th>
          <th> </th>
          <th><Link to="/addFatura" onClick={() => {window.location.href="/addFatura"}} className="btn btn-secondary custom-btn">Shto Faturen</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbFaturat.map(dbFaturat => (
          <tr key={dbFaturat.idFatura}>
          <td>{dbFaturat.idFatura}</td>
          <td>{dbFaturat.idUserRecepsionisti}</td>
          <td>{dbFaturat.idPacienti}</td>
          <td>{dbFaturat.pershkrimi}</td>
          <td>{moment.utc(dbFaturat.data).format('MM/DD/YY')}</td>
          <td>{dbFaturat.pagesaTotale+" €"}</td>
          <td>{dbFaturat.statusi}</td>
          <td><Link to={`/editFatura/${dbFaturat.idFatura}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editFatura/${dbFaturat.idFatura}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Faturen "${dbFaturat.idFatura}"? `)) deleteFatura(dbFaturat.idFatura)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}