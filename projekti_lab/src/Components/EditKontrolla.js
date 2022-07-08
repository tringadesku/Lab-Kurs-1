import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const EditKontrolla = (props) => {

  const [formData, setFormData] = useState([]);
  const idKontrolla = (props.match.params.id);

  console.log(props);

  function getKontrollaById(){
    const url = `https://localhost:7013/api/Kontrolla/${idKontrolla}`;
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(kontrollaFromServer => {
      console.log(kontrollaFromServer);
      setFormData(kontrollaFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getKontrollaById,[]);  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const kontrollaToEdit = {
      idKontrolla: formData.idKontrolla,
      idUserMjeku: formData.idUserMjeku,
      idPacienti: formData.idPacienti,
      diagnoza: formData.diagnoza,
      pershkrimi: formData.pershkrimi,
      receta: formData.receta
    };

    const url = 'https://localhost:7013/api/Kontrolla';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
      },
      body: JSON.stringify(kontrollaToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Kontrolla u editua me sukses!');
    {window.location.href="/kontrollat"}


  });

  return (
    <div style={{marginRight: "33%", paddingLeft: "18%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Kontrollen</h1>

        <div className="mt-5">
          <label className="h3 form-label">ID Kontrolla</label>
          <input value={idKontrolla} name="idKontrolla" type="text" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Mjeku</label>
          <input value={formData.idUserMjeku}  name="idUser_Mjeku" type="number" className="form-control" onChange={handleChange}/>
        </div>


        <div className="mt-4">
          <label className="h3 form-label">ID Pacienti</label>
          <input value={formData.idPacienti} name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        
        <div className="mt-4">
          <label className="h3 form-label">Diagnoza</label>
          <input value={formData.diagnoza} name="diagnoza" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Pershkrimi</label>
          <input value={formData.pershkrimi} name="pershkrimi" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Receta</label>
          <input value={formData.receta} name="receta" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/kontrollat" onClick={() => {window.location.href="/kontrollat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
