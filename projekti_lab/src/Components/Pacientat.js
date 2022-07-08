import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";

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
      onDeletePacienti(idPacienti);
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getPacientat,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Pacientat</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
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
          <th><Link to="/addPacienti" onClick={() => {window.location.href="/addPacienti"}} className="btn btn-primary">Regjistro New</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbPacientat.map(dbPacientat => (
          <tr key={dbPacientat.idPacienti}>
            <td>{dbPacientat.idPacienti}</td>
            <td>{dbPacientat.emri}</td>
            <td>{dbPacientat.mbiemri}</td>
            <td>{dbPacientat.ditelindja}</td>
            <td>{dbPacientat.gjinia}</td>
            <td>{dbPacientat.shteti}</td>
            <td>{dbPacientat.qyteti}</td>
            <td>{dbPacientat.emriRruges}</td>
            <td>{dbPacientat.tipiGjakut}</td>
            <td>{dbPacientat.alergji}</td>
            <td>{dbPacientat.nrtelefonit}</td>
          <td><Link to={`/editPacienti/${dbPacientat.idPacienti}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editPacienti/${dbPacientat.idPacienti}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Pacientin "${dbPacientat.idPacienti}"? `)) deletePacienti(dbPacientat.idPacienti)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


  function onDeletePacienti(deletedIdPacienti){
    let pacientatCopy = [...dbPacientat];
  
    const index = pacientatCopy.findIndex((pacientatCopyPacienti, currentIndex) => {
      if(pacientatCopyPacienti.roomNr === deletedIdPacienti){
        return true;
      }
    });
  
    if(index !== -1){
      pacientatCopy.splice(index, 1);
    }
  
    setdbPacientat(pacientatCopy);
  
    alert("Pacienti u fshi me sukses!");
  }

}
