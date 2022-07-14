import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

export const Pacientat = () => {

  const [dbPacientat, setdbPacientat] = useState([]);

  function getPacientat(){
    const url = 'https://localhost:7013/api/Pacienti';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(pacientatFromServer => {
      console.log(pacientatFromServer);
      setdbPacientat(pacientatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deletePacienti(idPacienti){
    const url = `https://localhost:7013/api/Pacienti/${idPacienti}`;
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Pacienti u fshi me sukses!");
      getPacientat();
    })
    .catch(error => {
      console.log(error);
      alert("Ky pacient nuk mund te fshihet ose mund te jete ne perdorim!");
    });

  }

  useEffect(getPacientat,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Pacientat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table" style={{backgroundColor: "#A2BFC8"}}>
          <th scope='col'>Pacienti ID (PK)</th>
          <th scope='col'>Emri</th>
          <th scope='col'>Mbiemri</th>
          <th scope='col'>Ditelindja</th>
          <th scope='col'>Gjinia</th>
          <th scope='col'>Shteti</th>
          <th scope='col'>Qyteti</th>
          <th scope='col'>Emri i Rruges</th>
          <th scope='col'>Tipi i Gjakut</th>
          <th scope='col'>Alergji</th>
          <th scope='col'>Nr Tel</th>
          <th> </th>
          <th><Link to="/addPacienti" onClick={() => {window.location.href="/addPacienti"}} className="btn btn-secondary custom-btn">Regjistro New</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbPacientat.map(dbPacientat => (
          <tr key={dbPacientat.idPacienti}>
            <td>{dbPacientat.idPacienti}</td>
            <td>{dbPacientat.emri}</td>
            <td>{dbPacientat.mbiemri}</td>
            <td>{moment.utc(dbPacientat.ditelindja).format('MM/DD/YY')}</td>
            <td>{dbPacientat.gjinia}</td>
            <td>{dbPacientat.shteti}</td>
            <td>{dbPacientat.qyteti}</td>
            <td>{dbPacientat.emriRruges}</td>
            <td>{dbPacientat.tipiGjakut}</td>
            <td>{dbPacientat.alergji}</td>
            <td>{dbPacientat.nrtelefonit}</td>
          <td><Link to={`/editPacienti/${dbPacientat.idPacienti}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editPacienti/${dbPacientat.idPacienti}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Pacientin "${dbPacientat.idPacienti}"? `)) deletePacienti(dbPacientat.idPacienti)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}
