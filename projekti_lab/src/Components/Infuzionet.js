import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";
import moment from 'moment';

export const Infuzionet = () => {

  const [dbInfuzionet, setdbInfuzionet] = useState([]);

  function getInfuzionet(){
    const url = 'https://localhost:7013/api/Infuzionet';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(infuzionetFromServer => {
      console.log(infuzionetFromServer);
      setdbInfuzionet(infuzionetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteInfuzioni(id){
    const url = `https://localhost:7013/api/Infuzionet/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteInfuzioni(id);
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getInfuzionet,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Infuzionet</h3>
      <table className='table table-striped'>
        <thead>
          <tr className="table-success">
            <th scope='col'>ID</th>
            <th scope='col'>ID Infermierit</th>
            <th scope='col'>ID Pacientit</th>
            <th scope='col'>Lloji</th>
            <th scope='col'>Data</th>
            <th scope='col'>Ora</th>
            <th> </th>
            <th><Link to="/addInfuzioni" onClick={() => { window.location.href = "/addInfuzioni"; } } className="btn btn-primary">Ruaj Infuzion</Link> </th>
          </tr>
        </thead>
        <tbody>
          {dbInfuzionet.map(dbInfuzionet => (
            <tr key={dbInfuzionet.id}>
              <td>{dbInfuzionet.id}</td>
              <td>{dbInfuzionet.idInfermieri}</td>
              <td>{dbInfuzionet.idPacienti}</td>
              <td>{dbInfuzionet.lloji}</td>
              <td>{moment.utc(dbInfuzionet.data).format('MM/DD/YY')}</td>
              <td>{dbInfuzionet.ora}</td>
              <td><Link to={`/editInfuzioni/${dbInfuzionet.id}`} className="btn btn-outline-success" onClick={() => { window.location.href = `/editInfuzioni/${dbInfuzionet.id}`; } }>Edit</Link></td>
              <td><button type="button" onClick={() => {
                if (window.confirm(`A jeni i sigurt qe doni te fshini Infuzionin "${dbInfuzionet.id}"? `))
                  deleteInfuzioni(dbInfuzionet.id);
              } } className="btn btn-danger">Delete</button></td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )

  function onDeleteInfuzioni(deletedId){
    let infuzionetCopy = [...dbInfuzionet];
  
    const index = infuzionetCopy.findIndex((infuzionetCopyInfuzioni, currentIndex) => {
      if(infuzionetCopyInfuzioni.id === deletedId){
        return true;
      }
    });
  
    if(index !== -1){
      infuzionetCopy.splice(index, 1);
    }
  
    setdbInfuzionet(infuzionetCopy);
  
    alert("Infuzioni u fshi me sukses!");
  }

}
