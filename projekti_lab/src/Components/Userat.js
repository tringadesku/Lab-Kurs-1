import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Userat = () => {

  const [dbUsers, setdbUsers] = useState([]);
  const [userEdited, setUserEdited] = useState(null);

  function getUsers(){
    const url = 'https://localhost:7013/api/User';
    fetch(url, {
      method: 'GET'
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
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onDeleteUser(idUser);
    })
    .catch(error => {
      console.log(error);
    });

  }

  useEffect(getUsers,[]);

  return (
    <div className='table-responsive mt-1 mx-5'>
    <table className='table table-striped'>
      <thead>
        <tr className="table-success">
          <th scope='col'>ID_User (PK)</th>
          <th scope='col'>Emri</th>
          <th scope='col'>Mbiemri</th>
          <th scope='col'>Pozita</th>
          <th scope='col'>Email</th>
          <th scope='col'>Password</th>
          <th scope='col'>Nr Tel</th>
          <th> </th>
          <th><Link to="/addUser" onClick={() => {window.location.href="/addUser"}} className="btn btn-primary">Shto User</Link> </th>
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
          <td><Link to={`/editUser/${dbUsers.idUser}`} className="btn btn-outline-success" onClick={() => {window.location.href=`/editUser/${dbUsers.idUser}`}}>Edit</Link></td>
          <td><button type="button" onClick={() => {if(window.confirm(`A jeni i sigurt qe doni te fshini Userin "${dbUsers.idUser}"? `)) deleteUser(dbUsers.idUser)}} className="btn btn-danger">Delete</button></td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

  function onUserEdited(userEdited){
    setUserEdited(null);
    if(userEdited === null){
      return;
    }

    let usersCopy = [...dbUsers];

    const index = usersCopy.findIndex((usersCopyUser, currentIndex) => {
      if(usersCopyUser.idUser === userEdited.idUser){
        return true;
      }
    });

    if(index !== -1){
      usersCopy[index] = userEdited;
    }

    setdbUsers(usersCopy);

    alert("Useri u editua me sukses!");
  }

  function onDeleteUser(deletedIdUser){
    let usersCopy = [...dbUsers];
  
    const index = usersCopy.findIndex((usersCopyUser, currentIndex) => {
      if(usersCopyUser.idUser === deletedIdUser){
        return true;
      }
    });
  
    if(index !== -1){
      usersCopy.splice(index, 1);
    }
  
    setdbUsers(usersCopy);
  
    alert("Useri u fshi me sukses!");
  }

}
