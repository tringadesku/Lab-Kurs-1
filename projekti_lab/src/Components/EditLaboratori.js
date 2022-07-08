import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const EditLaboratori = (props) => {

  const [formData, setFormData] = useState([]);
  const nrAnalizes = (props.match.params.id);

  function getLaboratoriById(){
    const url = `https://localhost:7013/api/Laboratori/${nrAnalizes}`;
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(laboratoriFromServer => {
      console.log(laboratoriFromServer);
      setFormData(laboratoriFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getLaboratoriById,[]);
  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const laboratoriToEdit = {
      nrAnalizes: formData.nrAnalizes,
      idUserLaboranti: formData.idUserLaboranti,
      idPacienti : formData.idPacienti,
      data : formData.data,
      lloji: formData.lloji
    };

    const url = 'https://localhost:7013/api/Laboratori';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
      },
      body: JSON.stringify(laboratoriToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Laboratori u editua me sukses!');
    {window.location.href="/laboratori"}


  });

  return (
    <div style={{marginRight: "33%", paddingLeft: "18%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Analizen</h1>

        <div className="mt-5">
            <label className="h3 form-label">Numri i Analizes</label>
            <input  value={nrAnalizes} name="nrAnalizes" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">ID e Laborantit</label>
            <input value={formData.idUserLaboranti} name="idUserLaboranti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">ID e Pacientit</label>
            <input value={formData.idPacienti}  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data</label>
            <input value={formData.data} name="data" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji</label>
            <input value={formData.lloji}  name="lloji" type="text" className="form-control" onChange={handleChange}/>
          </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/laboratori" onClick={() => {window.location.href="/laboratori"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
