import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditAmbulanca = (props) => {

  const [formData, setFormData] = useState([]);
  const nrAuto = (props.match.params.id);

  console.log(props);

  function getAmbulancaById(){
    const url = `https://localhost:7013/api/Ambulanca/${nrAuto}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(ambulancaFromServer => {
      console.log(ambulancaFromServer);
      setFormData(ambulancaFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getAmbulancaById,[]);  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const ambulancaToEdit = {
      nrAuto: formData.nrAuto,
      idUserMjekuLider: formData.idUserMjekuLider,
      lokacioni: formData.lokacioni,
      statusi: formData.statusi
    };

    const url = 'https://localhost:7013/api/Ambulanca';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ambulancaToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Ambulanca u editua me sukses!');
    {window.location.href="/ambulancat"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Ambulancen</h1>

        <div className="mt-5">
          <label className="h3 form-label">Numri Auto</label>
          <input value={nrAuto} name="nrAuto" type="number" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Mjeku Lider</label>
          <input value={formData.idUserMjekuLider}  name="idUser_Mjeku_Lider" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Lokacioni</label>
          <input value={formData.lokacioni} name="lokacioni" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Statusi</label>
          <input value={formData.statusi} name="statusi" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/ambulancat" onClick={() => {window.location.href="/ambulancat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
