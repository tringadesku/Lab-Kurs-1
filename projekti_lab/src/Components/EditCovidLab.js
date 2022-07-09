import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const EditCovidLab = (props) => {

  const [formData, setFormData] = useState([]);
  const analizaId = (props.match.params.id);

  function getCovidLabById(){
    const url = `https://localhost:7013/api/CovidLab/${analizaId}`;
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(covidLabFromServer => {
      console.log(covidLabFromServer);
      setFormData(covidLabFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getCovidLabById,[]);
  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const CovidLabToEdit = {
      analizaId: formData.analizaId,
      idUserLaboranti: formData.idUserLaboranti,
      pacientiId : formData.pacientiId,
      llojiTestit : formData.llojiTestit,
      mostra : formData.mostra,
      dataAnalizes : formData.dataAnalizes,
      rezultati : formData.rezultati,
    };

    const url = 'https://localhost:7013/api/CovidLab';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
      },
      body: JSON.stringify(CovidLabToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Covid-Analiza u editua me sukses!');
    {window.location.href="/CovidLab"}


  });

  return (
    <div style={{marginRight: "33%", paddingLeft: "18%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Covid-Analizen</h1>

        <div className="mt-5">
            <label className="h3 form-label">Analiza ID</label>
            <input  value={analizaId} name="analizaId" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">ID e Laborantit</label>
            <input value={formData.idUserLaboranti} name="idUserLaboranti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">ID e Pacientit</label>
            <input value={formData.pacientiId}  name="pacientiId" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji i Testit</label>
            <input value={formData.llojiTestit}  name="llojiTestit" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mostra</label>
            <input value={formData.mostra}  name="mostra" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data e Analizes</label>
            <input value={formData.dataAnalizes} name="dataAnalizes" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Rezultati</label>
            <input value={formData.rezultati}  name="rezultati" type="text" className="form-control" onChange={handleChange}/>
          </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/CovidLab" onClick={() => {window.location.href="/CovidLab"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
