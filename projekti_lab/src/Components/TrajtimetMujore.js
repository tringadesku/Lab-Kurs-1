import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

export const TrajtimetMujore = () => {

  const [dbTrajtimetMujore, setdbTrajtimetMujore] = useState([]);

  function getTrajtimetMujore(){
    const url = 'https://localhost:7013/api/TrajtimetMujore'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(trajtimetFromServer => {
      console.log(trajtimetFromServer);
      setdbTrajtimetMujore(trajtimetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteTrajtimetMujore(nrT){
    const url = `https://localhost:7013/api/TrajtimetMujore/${nrT}`; 
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteTrajtimetMujore(nrT); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getTrajtimetMujore,[]);


  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Trajtimet Mujore</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'> Trajtimi ID (PK)</th>
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Data Fillimit</th>
          <th scope='col'>Data Mbarimit</th>
          <th scope='col'>Lloji</th>
          <th> </th>
          <th><Link to="/addTrajtimi" onClick={() => {window.location.href="/addTrajtimi"}} className="btn btn-primary">Shto Trajtimin Mujor</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbTrajtimetMujore.map(dbTrajtimetMujore => (
          <tr key={dbTrajtimetMujore.nrT}>
          <td>{dbTrajtimetMujore.nrT}</td>
          <td>{dbTrajtimetMujore.idPacienti}</td>
          <td>{moment.utc(dbTrajtimetMujore.dataFillimit).format('MM/DD/YY')}</td>
          <td>{moment.utc(dbTrajtimetMujore.dataMbarimit).format('MM/DD/YY')}</td>
          <td>{dbTrajtimetMujore.lloji}</td>
          <td><Link to={`/editTrajtimi/${dbTrajtimetMujore.nrT}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editTrajtimi/${dbTrajtimetMujore.nrT}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Trajtimin Mujor "${dbTrajtimetMujore.nrT}"? `)) deleteTrajtimetMujore(dbTrajtimetMujore.nrT)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteTrajtimetMujore(deletedNrT){
    let TrajtimetCopy = [...dbTrajtimetMujore];
  
    const index = TrajtimetCopy.findIndex((trajtimetCopyTrajtimet, currentIndex) => {
      if(trajtimetCopyTrajtimet.nrT === deletedNrT){
        return true;
      }
    });
  
    if(index !== -1){
     TrajtimetCopy.splice(index, 1);
    }
  
    setdbTrajtimetMujore(TrajtimetCopy);
  
    alert("Trajtimi Mujor u fshi me sukses!");
  }

}