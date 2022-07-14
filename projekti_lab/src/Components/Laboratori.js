import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

export const Laboratori = () => {

  const [dbLaboratorat, setdbLaboratorat] = useState([]);

  function getLaboratori(){
    const url = 'https://localhost:7013/api/Laboratori'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(laboratoriFromServer => {
      console.log(laboratoriFromServer);
      setdbLaboratorat(laboratoriFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteLaboratori(nrAnalizes){
    const url = `https://localhost:7013/api/Laboratori/${nrAnalizes}`; 
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Analiza u fshi me sukses!");
      getLaboratori();
    })
    .catch(error => {
      console.log(error);
      alert("Kjo analize nuk mund te fshihet!");
    });

  }

  useEffect(getLaboratori,[]);

  return (
    <div className='table-responsive mt-1 mx-5'  style={{paddingLeft: "13%"}}>
      <h3>Laboratori</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table"  style={{backgroundColor: "#A2BFC8"}}>
        <th scope='col'>Nr. Analizes (PK)</th>
          <th scope='col'>Id User Laboranti</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Data</th>
          <th scope='col'>Lloji</th>
          <th></th>
          <th><Link to="/addLaboratori" onClick={() => {window.location.href="/addLaboratori"}} className="btn btn-secondary custom-btn">Shto Analize</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbLaboratorat.map(dbLaboratorat => (
          <tr key={dbLaboratorat.nrAnalizes}>
          <td>{dbLaboratorat.nrAnalizes}</td>
          <td>{dbLaboratorat.idUserLaboranti}</td>
          <td>{dbLaboratorat.idPacienti}</td>
          <td>{moment.utc(dbLaboratorat.data).format('MM/DD/YY')}</td>
          <td>{dbLaboratorat.lloji}</td>
          <td><Link to={`/editLaboratori/${dbLaboratorat.nrAnalizes}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editLaboratori/${dbLaboratorat.nrAnalizes}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Analizen "${dbLaboratorat.nrAnalizes}"? `)) deleteLaboratori(dbLaboratorat.nrAnalizes)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}