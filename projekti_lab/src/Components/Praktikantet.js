import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header"
import moment from 'moment';

export const Praktikantet = () => {

  const [dbPraktikantet, setdbPraktikantet] = useState([]);

  function getPraktikantet(){
    const url = 'https://localhost:7013/api/Praktikanti'; 
    fetch(url, {
      method: 'GET',
      headers: authHeader()
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
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Praktikanti u fshi me sukses!");
      getPraktikantet();
    })
    .catch(error => {
      console.log(error);
      alert("Ky praktikant nuk mund te fshihet ose mund te jete ne perdorim!");
    });

  }

  useEffect(getPraktikantet,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Praktikantet</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table"  style={{backgroundColor: "#A2BFC8"}}>
        <th scope='col'>Id Praktikanti (PK)</th>
          <th scope='col'>Emri i Praktikantit</th> 
          <th scope='col'>Mbiemri i Praktikantit</th>
          <th scope='col'>Mjeku Mbikqyres</th>
          <th scope='col'>Data e Fillimit</th>
          <th scope='col'>Data e Perfundimit</th>
          <th scope='col'>Oret</th>
          <th scope='col'>Aprovimi</th>
          <th> </th>
          <th><Link to="/addPraktikanti" onClick={() => {window.location.href="/addPraktikanti"}} className="btn btn-secondary custom-btn">Shto Praktikantin</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbPraktikantet.map(dbPraktikantet => (
          <tr key={dbPraktikantet.idPraktikanti}>
          <td>{dbPraktikantet.idPraktikanti}</td>
          <td>{dbPraktikantet.emriPr}</td>
          <td>{dbPraktikantet.mbiemriPr}</td>
          <td>{dbPraktikantet.mjekuMbikqyres}</td>
          <td>{moment.utc(dbPraktikantet.dataFillimit).format('MM/DD/YY')}</td>
          <td>{moment.utc(dbPraktikantet.dataPerfundimit).format('MM/DD/YY')}</td>
          <td>{dbPraktikantet.oret}</td>
          <td>{dbPraktikantet.aprovimi}</td>
          <td><Link to={`/editPraktikanti/${dbPraktikantet.idPraktikanti}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editPraktikanti/${dbPraktikantet.idPraktikanti}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Praktikantin "${dbPraktikantet.idPraktikanti}"? `)) deletePraktikanti(dbPraktikantet.idPraktikanti)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}