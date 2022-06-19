import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditTermini = (props) => {

  const [formData, setFormData] = useState([]);
  const idTermini = (props.match.params.id);

  console.log(props);

  function getTerminiById(){
    const url = `https://localhost:7013/api/Terminet/${idTermini}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(terminetFromServer => {
      console.log(terminetFromServer);
      setFormData(terminetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getTerminiById,[]);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const terminiToEdit = {
      idTermini: formData.idTermini,
      idMjeku : formData.idMjeku,
      idPacienti : formData.idPacienti,
      data : formData.data,
      ora : formData.ora,
      lloji : formData.lloji,
    };

    const url = 'https://localhost:7013/api/Terminet';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(terminiToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Termini u editua me sukses!');
    {window.location.href="/terminet"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Terminin</h1>

        <div className="mt-5">
          <label className="h3 form-label">ID Termini</label>
          <input value={idTermini} name="idTermini" type="text" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Mjeku</label>
          <input value={formData.idMjeku} name="idMjeku" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Pacienti</label>
          <input value={formData.idPacienti} name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data</label>
          <input value={formData.data} name="data" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Ora</label>
          <input value={formData.ora} name="ora" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Lloji</label>
          <input value={formData.lloji} name="lloji" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/terminet" onClick={() => {window.location.href="/terminet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
