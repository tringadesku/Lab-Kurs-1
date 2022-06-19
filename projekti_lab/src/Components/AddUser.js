import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddUser = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const userToAdd = {
      emri: formData.emri,
      mbiemri: formData.mbiemri,
      pozita: formData.pozita,
      email: formData.email,
      password: formData.password,
      nrtelefonit: formData.nrtelefonit,
    };

      const url = 'https://localhost:7013/api/User';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(userToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });


      alert('Useri u shtua me sukses!');
      {window.location.href="/users"}
      

    }

  );
  return (
      <div style={{marginRight: "33%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto User te ri:</h1>

          <div className="mt-4">
            <label className="h3 form-label">Emri</label>
            <input  name="emri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mbiemri</label>
            <input  name="mbiemri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Pozita</label>
            <input  name="pozita" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Email</label>
            <input  name="email" type="email" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Password</label>
            <input  name="password" type="password" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">NrTelefonit</label>
            <input  name="nrtelefonit" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Regjistro</button>
          <Link to="/users" onClick={() => {window.location.href="/users"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}

