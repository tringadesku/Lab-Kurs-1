import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Praktikantat = () => {

  const [dbPraktikantat, setdbPraktikantat] = useState([]);

  function getPraktikantat(){
    const url = 'https://localhost:7013/api/Praktikanti';
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(praktikantatFromServer => {
      console.log(praktikantatFromServer);
      setdbPraktikantat(praktikantatFromServer);
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

  useEffect(getPraktikantat,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
      <h3>Praktikantat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
          <th scope='col'>Praktikanti ID (PK)</th>
          <th scope='col'>Emri</th>
          <th scope='col'>Mbiemri</th>
          <th scope='col'>Mjeku Mbikqyres</th>
          <th scope='col'>Data e Fillimit</th>
          <th scope='col'>Data e Perfundimit</th>
          <th scope='col'>Oret</th>
          <th scope='col'>Aprovimi</th>
          <th> </th>
          <th><Link to="/addPraktikanti" onClick={() => {window.location.href="/addPraktikanti"}} className="btn btn-primary">Regjistro New</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbPraktikantat.map(dbPraktikantat => (
          <tr key={dbPraktikantat.idPraktikanti}>
            <td>{dbPraktikantat.idPraktikanti}</td>
            <td>{dbPraktikantat.emriPr}</td>
            <td>{dbPraktikantat.mbiemriPr}</td>
            <td>{dbPraktikantat.mjekuMbikqyres}</td>
            <td>{dbPraktikantat.dataFillimit}</td>
            <td>{dbPraktikantat.dataperfundimit}</td>
            <td>{dbPraktikantat.oret}</td>
            <td>{dbPraktikantat.aprovimi}</td>
          <td><Link to={`/editPraktikanti/${dbPraktikantat.idPraktikanti}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editPraktikanti/${dbPraktikantat.idPraktikanti}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Praktikantin "${dbPraktikantat.idPraktikanti}"? `)) deletePraktikanti(dbPraktikantat.idPraktikanti)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


  function onDeletePraktikanti(deletedIdPraktikanti){
    let praktikantatCopy = [...dbPraktikantat];
  
    const index = praktikantatCopy.findIndex((praktikantatCopyPraktikanti, currentIndex) => {
      if(praktikantatCopyPraktikanti.roomNr === deletedIdPraktikanti){
        return true;
      }
    });
  
    if(index !== -1){
      praktikantatCopy.splice(index, 1);
    }
  
    setdbPraktikantat(praktikantatCopy);
  
    alert("Praktikanti u fshi me sukses!");
  }

}