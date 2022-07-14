import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";

export const Userat = () => {

  const [dbUsers, setdbUsers] = useState([]);

  function getUsers(){
    const url = 'https://localhost:7013/api/User';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(usersFromServer => {
      console.log(usersFromServer);
      setdbUsers(usersFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  function deleteUser(idUser){
    const url = `https://localhost:7013/api/User/${idUser}`;
    fetch(url, {
      method: 'DELETE',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      alert("Useri u fshi me sukses!");
      getUsers();
    })
    .catch(error => {
      console.log(error);
      alert("Ky User nuk mund te fshihet ose mund te jete ne perdorim!");
    });

  }

  useEffect(getUsers,[]);


  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Users</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table" style={{backgroundColor: "#A2BFC8"}}>
          <th scope='col'>ID_User (PK)</th>
          <th scope='col'>Emri</th>
          <th scope='col'>Mbiemri</th>
          <th scope='col'>Pozita</th>
          <th scope='col'>Email</th>
          <th scope='col'>Password</th>
          <th scope='col'>Nr Tel</th>
          <th> </th>
          <th><Link to="/addUser" onClick={() => {window.location.href="/addUser"}} className="btn btn-secondary costum-btn">Shto User</Link> </th>
        </tr>
      </thead>
      <tbody>
          {dbUsers.map(dbUsers => (
          <tr key={dbUsers.idUser}>
            <td>{dbUsers.idUser}</td>
            <td>{dbUsers.emri}</td>
            <td>{dbUsers.mbiemri}</td>
            <td>{dbUsers.pozita}</td>
            <td>{dbUsers.email}</td>
            <td>{dbUsers.password}</td>
            <td>{dbUsers.nrtelefonit}</td>
          <td><Link to={`/editUser/${dbUsers.idUser}`} className="btn btn-outline-secondary" onClick={() => {window.location.href=`/editUser/${dbUsers.idUser}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Userin "${dbUsers.idUser}"? `)) deleteUser(dbUsers.idUser)}} className="btn btn-secondary">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )


}
