import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

export const CovidLab = () => {

  const [dbCovidLab, setdbCovidlabs] = useState([]);

  function getCovidLab(){
    const url = 'https://localhost:7013/api/CovidLab'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(covidLabFromServer => {
      console.log(covidLabFromServer);
      setdbCovidlabs(covidLabFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteCovidLab(analizaId){
    const url = `https://localhost:7013/api/CovidLab/${analizaId}`; 
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Covid-Analiza u fshi me sukses!");
      getCovidLab();
    })
    .catch(error => {
      console.log(error);
      alert("Kjo analize nuk mund te fshihet!");
    });

  }

  useEffect(getCovidLab,[]);

  return (
    <div className='table-responsive mt-1 mx-5'  style={{paddingLeft: "13%"}}>
      <h3>Covid Laboratori</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table"  style={{backgroundColor: "#A2BFC8"}}>
        <th scope='col'>Analiza ID (PK)</th>
          <th scope='col'>Id User Laboranti</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Lloji i Testit</th>
          <th scope='col'>Lloji i Mostres</th>
          <th scope='col'>Data</th>
          <th scope='col'>Rezultati</th>
          <th></th>
          <th><Link to="/addCovidLab" onClick={() => {window.location.href="/addCovidLab"}} className="btn btn-secondary custom-btn">Shto Covid-Analize</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbCovidLab.map(dbCovidLab => (
          <tr key={dbCovidLab.analizaId}>
          <td>{dbCovidLab.analizaId}</td>
          <td>{dbCovidLab.idUserLaboranti}</td>
          <td>{dbCovidLab.pacientiId}</td>
          <td>{dbCovidLab.llojiTestit}</td>
          <td>{dbCovidLab.mostra}</td>
          <td>{moment.utc(dbCovidLab.dataAnalizes).format('MM/DD/YY')}</td>
          <td>{dbCovidLab.rezultati}</td>
          <td><Link to={`/editCovidLab/${dbCovidLab.analizaId}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editCovidLab/${dbCovidLab.analizaId}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Analizen-Covid "${dbCovidLab.analizaId}"? `)) deleteCovidLab(dbCovidLab.analizaId)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}