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
      alert("Infuzioni u fshi me sukses!");
      getInfuzionet();
    })
    .catch(error => {
      console.log(error);
      alert("Ky infuzion nuk mund te fshihet!");
    });

  }

  useEffect(getInfuzionet,[]);

  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Infuzionet</h3>
      <table className='table table-striped'>
        <thead>
          <tr className="table"  style={{backgroundColor: "#A2BFC8"}}>
            <th scope='col'>ID</th>
            <th scope='col'>ID Infermierit</th>
            <th scope='col'>ID Pacientit</th>
            <th scope='col'>Lloji</th>
            <th scope='col'>Data</th>
            <th scope='col'>Ora</th>
            <th> </th>
            <th><Link to="/addInfuzioni" onClick={() => { window.location.href = "/addInfuzioni"; } } className="btn btn-secondary custom-btn">Ruaj Infuzion</Link> </th>
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
              <td><Link to={`/editInfuzioni/${dbInfuzionet.id}`} className="btn btn-outline-secondary" onClick={() => { window.location.href = `/editInfuzioni/${dbInfuzionet.id}`; } }>Edit</Link></td>
              <td><button type="button" onClick={() => {
                if (window.confirm(`A jeni i sigurt qe doni te fshini Infuzionin "${dbInfuzionet.id}"? `))
                  deleteInfuzioni(dbInfuzionet.id);
              } } className="btn btn-secondary">Delete</button></td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )


}
