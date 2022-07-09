import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const EditTrajtimiMujor = (props) => {

  const [formData, setFormData] = useState([]);
  const nrT = (props.match.params.id);

  console.log(props);

  function getTrajtimiMujorById(){
    const url = `https://localhost:7013/api/TrajtimetMujore/${nrT}`;
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(trajtimetFromServer => {
      console.log(trajtimetFromServer);
      setFormData(trajtimetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getTrajtimiMujorById,[]);  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const TrajtimiMujorToEdit = {
      nrT:nrT,
      idPacienti: formData.idPacienti,
      dataFillimit: formData.dataFillimit,
      dataMbarimit: formData.dataMbarimit,
      lloji: formData.lloji
    };

    const url = 'https://localhost:7013/api/TrajtimetMujore';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
      },
      body: JSON.stringify(TrajtimiMujorToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Trajtimi Mujor u editua me sukses!');
    {window.location.href="/trajtimet"}


  });

  return (
    <div style={{marginRight: "33%", paddingLeft: "18%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Trajtimin</h1>

        <div className="mt-5">
          <label className="h3 form-label">Trajtimi Mujor ID</label>
          <input value={nrT} name="nrT" type="number" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">ID Pacientit</label>
          <input value={formData.idPacienti}  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data e Fillimit</label>
          <input value={formData.dataFillimit} name="dataFillimit" type="date" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data e Mbarimit</label>
          <input value={formData.dataMbarimit} name="dataMbarimit" type="date" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Lloji</label>
          <input value={formData.lloji} name="lloji" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/trajtimet" onClick={() => {window.location.href="/trajtimet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
