import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditFatura = (props) => {

  const [formData, setFormData] = useState([]);
  const idFatura = (props.match.params.id);

  console.log(props);

  function getFaturaById(){
    const url = `https://localhost:7013/api/Fatura/${idFatura}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(faturatFromServer => {
      console.log(faturatFromServer);
      setFormData(faturatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getFaturaById,[]);  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const faturaToEdit = {
      idFatura:idFatura,
      idUserRecepsionisti: formData.idUserRecepsionisti,
      idPacienti: formData.idPacienti,
      pershkrimi: formData.pershkrimi,
      data: formData.data,
      pagesaTotale: formData.pagesaTotale,
      statusi: formData.statusi
    };

    const url = 'https://localhost:7013/api/Fatura';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(faturaToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Fatura u editua me sukses!');
    {window.location.href="/faturat"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Faturen</h1>

        <div className="mt-5">
          <label className="h3 form-label">Fatura ID</label>
          <input value={idFatura} name="idFatura" type="number" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Recepsionisti</label>
          <input value={formData.idUserRecepsionisti} name="idRecepsionisti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Pacientit</label>
          <input value={formData.idPacienti}  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Pershkrimi</label>
          <input value={formData.pershkrimi} name="pershkrimi" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data</label>
          <input value={formData.data} name="data" type="date" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Pagesa Totale</label>
          <input value={formData.pagesaTotale} name="pagesaTotale" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Statusi</label>
          <input value={formData.statusi} name="statusi" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/faturat" onClick={() => {window.location.href="/faturat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
