import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditOperacioni = (props) => {

  const [formData, setFormData] = useState([]);
  const idOperacioni = (props.match.params.id);

  console.log(props);

  function getOperacioniById(){
    const url = `https://localhost:7013/api/Operacioni/${idOperacioni}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(operacioniFromServer => {
      console.log(operacioniFromServer);
      setFormData(operacioniFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getOperacioniById,[]);  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const operacioniToEdit = {
      idOperacioni: formData.idOperacioni,
      idUserMjekuKryesor: formData.idUserMjekuKryesor,
      idPacienti: formData.idPacienti,
      sallaNr: formData.sallaNr,
      data: formData.data,
      ora: formData.ora
    };

    const url = 'https://localhost:7013/api/Operacioni';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(operacioniToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Operacioni u editua me sukses!');
    {window.location.href="/operacionet"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Operacionin</h1>

        <div className="mt-5">
          <label className="h3 form-label">ID Kontrolla</label>
          <input value={idOperacioni} name="idOperacioni" type="text" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Mjeku Kryesor</label>
          <input value={formData.idUserMjekuKryesor}  name="idUser_Mjeku_Kryesor" type="number" className="form-control" onChange={handleChange}/>
        </div>


        <div className="mt-4">
          <label className="h3 form-label">ID Pacienti</label>
          <input value={formData.idPacienti} name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        
        <div className="mt-4">
          <label className="h3 form-label">Salla</label>
          <input value={formData.sallaNr} name="sallaNr" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data</label>
          <input value={formData.data} name="data" type="date" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Ora</label>
          <input value={formData.ora} name="ora" type="time" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/operacionet" onClick={() => {window.location.href="/operacionet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
