import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditUser = (props) => {

  const [formData, setFormData] = useState([]);
  const idUser = (props.match.params.id);

  function getUserById(){
    const url = `https://localhost:7013/api/User/${idUser}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(userFromServer => {
      console.log(userFromServer);
      setFormData(userFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getUserById,[]);
  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const userToEdit = {
      idUser: idUser,
      emri: formData.emri,
      mbiemri: formData.mbiemri,
      pozita: formData.pozita,
      email : formData.email,
      password : formData.password,
      nrtelefonit: formData.nrtelefonit,
    };

    const url = 'https://localhost:7013/api/User';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Useri u editua me sukses!');
    {window.location.href="/users"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Userin</h1>

        <div className="mt-5">
            <label className="h3 form-label">ID e Userit</label>
            <input  value={idUser} name="idUser" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri</label>
            <input value={formData.emri} name="emri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mbiemri</label>
            <input value={formData.mbiemri}  name="mbiemri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Pozita</label>
            <input value={formData.pozita} name="pozita" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Email</label>
            <input value={formData.email}  name="email" type="email" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Password</label>
            <input value={formData.password}  name="password" type="password" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">NrTelefonit</label>
            <input value={formData.nrtelefonit} name="nrtelefonit" type="text" className="form-control" onChange={handleChange}/>
          </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/users" onClick={() => {window.location.href="/users"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
