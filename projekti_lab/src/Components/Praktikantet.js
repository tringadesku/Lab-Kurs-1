import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Praktikantet = () => {

  const [dbPraktikantet, setdbPraktikantet] = useState([]);

  function getPraktikantet(){
    const url = 'https://localhost:7013/api/Praktikanti'; 
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(praktikantetFromServer => {
      console.log(praktikantetFromServer);
      setdbPraktikantet(praktikantetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deletePraktikanti(idPraktikanti){
    const url = `https://localhost:7013/api/Praktikanti/${idPraktikanti}`; 
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeletePraktikanti(idPraktikanti); 
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getPraktikantet,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
      <h3>Praktikantet</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
        <th scope='col'>Id Praktikanti (PK)</th>
          <th scope='col'>Emri i Praktikantit</th> 
          <th scope='col'>Mbiemri i Praktikantit</th>
          <th scope='col'>Mjeku Mbikqyres</th>
          <th scope='col'>Data e Fillimit</th>
          <th scope='col'>Data e Perfundimit</th>
          <th scope='col'>Oret</th>
          <th scope='col'>Aprovimi</th>
          <th> </th>
          <th><Link to="/addPraktikanti" onClick={() => {window.location.href="/addPraktikanti"}} className="btn btn-primary">Shto Praktikantin</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbPraktikantet.map(dbPraktikantet => (
          <tr key={dbPraktikantet.idPraktikanti}>
          <td>{dbPraktikantet.idPraktikanti}</td>
          <td>{dbPraktikantet.emriPr}</td>
          <td>{dbPraktikantet.mbiemriPr}</td>
          <td>{dbPraktikantet.mjekuMbikqyres}</td>
          <td>{dbPraktikantet.dataFillimit}</td>
          <td>{dbPraktikantet.dataPerfundimit}</td>
          <td>{dbPraktikantet.oret}</td>
          <td>{dbPraktikantet.aprovimi}</td>
          <td><Link to={`/editPraktikanti/${dbPraktikantet.idPraktikanti}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editPraktikanti/${dbPraktikantet.idPraktikanti}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Praktikantin "${dbPraktikantet.idPraktikanti}"? `)) deletePraktikanti(dbPraktikantet.idPraktikanti)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onDeletePraktikanti(deletedIdPraktikanti){
    let PraktikantetCopy = [...dbPraktikantet];
  
    const index = PraktikantetCopy.findIndex((praktikantetCopyPraktikanti, currentIndex) => {
      if(praktikantetCopyPraktikanti.idPraktikanti === deletedIdPraktikanti){
        return true;
      }
    });
  
    if(index !== -1){
     PraktikantetCopy.splice(index, 1);
    }
  
    setdbPraktikantet(PraktikantetCopy);
  
    alert("Praktikanti u fshi me sukses!");
  }

}