import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const Terminet = () => {

  const [dbTerminet, setdbTerminet] = useState([]);

  function getTerminet(){
    const url = 'https://localhost:7013/api/Terminet'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(terminetFromServer => {
      console.log(terminetFromServer);
      setdbTerminet(terminetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteTerminet(idTermini){
    const url = `https://localhost:7013/api/Terminet/${idTermini}`; 
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteTermini(idTermini); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getTerminet,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Terminet</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'>Id Termini (PK)</th>
          <th scope='col'>Id Mjeku</th> 
          <th scope='col'>Id Pacienti</th>
          <th scope='col'>Data</th>
          <th scope='col'>Ora</th>
          <th scope='col'>Lloji</th>
          <th> </th>
          <th><Link to="/addTermini" onClick={() => {window.location.href="/addTermini"}} className="btn btn-primary">Shto Termin</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbTerminet.map(dbTerminet => (
          <tr key={dbTerminet.idTermini}>
          <td>{dbTerminet.idTermini}</td>
          <td>{dbTerminet.idMjeku}</td>
          <td>{dbTerminet.idPacienti}</td>
          <td>{dbTerminet.data}</td>
          <td>{dbTerminet.ora}</td>
          <td>{dbTerminet.lloji}</td>
          <td><Link to={`/editTermini/${dbTerminet.idTermini}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editTermini/${dbTerminet.idTermini}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Terminin "${dbTerminet.idTermini}"? `)) deleteTerminet(dbTerminet.idTermini)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeleteTermini(deletedIdTermini){
    let TerminetCopy = [...dbTerminet];
  
    const index = TerminetCopy.findIndex((terminetCopyTermini, currentIndex) => {
      if(terminetCopyTermini.idTermini === deletedIdTermini){
        return true;
      }
    });
  
    if(index !== -1){
      TerminetCopy.splice(index, 1);
    }
  
    setdbTerminet(TerminetCopy);
  
    alert("Termini u fshi me sukses!");
  }

}