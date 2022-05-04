import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditInfuzioni = (props) => {

  const [infuzioniById, setInfuzioniById] = useState([]);
  const id = (props.match.params.id);

  console.log(props);

  function getInfuzioniById(){
    const url = `https://localhost:7013/api/Infuzionet/${id}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(infuzioniFromServer => {
      console.log(infuzioniFromServer);
      setInfuzioniById(infuzioniFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getInfuzioniById,[]);

  const initialFormData = {
    id: id,
    idInfermieri: infuzioniById.idInfermieri,
    idPacienti: infuzioniById.idPacienti,
    lloji: infuzioniById.lloji,
    ora: infuzioniById.ora
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const infuzioniToEdit = {
      id: id,
      idInfermieri: formData.idInfermieri,
      idPacienti: formData.idPacienti,
      lloji: formData.lloji,
      ora: formData.ora
    };

    const url = 'https://localhost:7013/api/Infuzionet';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infuzioniToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Infuzioni u editua me sukses!');
    {window.location.href="/infuzionet"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Infuzionin</h1>

        <div className="mt-5">
          <label className="h3 form-label">Infuzioni ID</label>
          <input value={id} name="id" type="number" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Infermieri</label>
          <input value={formData.idInfermieri} placeholder={infuzioniById.idInfermieri} name="idInfermieri" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Pacientit</label>
          <input value={formData.idPacienti} placeholder={infuzioniById.idPacienti} name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Lloji</label>
          <input value={formData.lloji} placeholder={infuzioniById.lloji} name="lloji" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Ora</label>
          <input value={formData.ora} placeholder={infuzioniById.ora} name="ora" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
