import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Laboratori = () => {

  const [dbLaboratorat, setdbLaboratorat] = useState([]);

  function getLaboratori(){
    const url = 'https://localhost:7013/api/Laboratori'; 
    fetch(url, {
      method: 'GET'
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
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteLaboratori(nrAnalizes); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getLaboratori,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
      <h3>Laboratori</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'>Nr. Analizes (PK)</th>
          <th scope='col'>Id User Laboranti</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Data</th>
          <th scope='col'>Lloji</th>
          <th></th>
          <th><Link to="/addLaboratori" onClick={() => {window.location.href="/addLaboratori"}} className="btn btn-primary">Shto Analize</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbLaboratorat.map(dbLaboratorat => (
          <tr key={dbLaboratorat.nrAnalizes}>
          <td>{dbLaboratorat.nrAnalizes}</td>
          <td>{dbLaboratorat.idUserLaboranti}</td>
          <td>{dbLaboratorat.idPacienti}</td>
          <td>{dbLaboratorat.data}</td>
          <td>{dbLaboratorat.lloji}</td>
          <td><Link to={`/editLaboratori/${dbLaboratorat.nrAnalizes}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editLaboratori/${dbLaboratorat.nrAnalizes}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Analizen "${dbLaboratorat.nrAnalizes}"? `)) deleteLaboratori(dbLaboratorat.nrAnalizes)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteLaboratori(deletedIdLaboratori){
    let laboratoriCopy = [...dbLaboratorat];
  
    const index = laboratoriCopy.findIndex((laboratoriCopyLaboratori, currentIndex) => {
      if(laboratoriCopyLaboratori.nrAnalizes === deletedIdLaboratori){
        return true;
      }
    });
  
    if(index !== -1){
      laboratoriCopy.splice(index, 1);
    }
  
    setdbLaboratorat(laboratoriCopy);
  
    alert("Laboratori u fshi me sukses!");
  }

}