import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditPraktikanti = (props) => {

  const [formData, setFormData] = useState([]);
  const idPraktikanti = (props.match.params.id);

  console.log(props);

  function getPraktikantetById(){
    const url = `https://localhost:7013/api/Praktikanti/${idPraktikanti}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(praktikantetFromServer => {
      console.log(praktikantetFromServer);
      setFormData(praktikantetFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getPraktikantetById,[]);  

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const praktikantiToEdit = {
      idPraktikanti:formData.idPraktikanti,
      emriPr: formData.emriPr,
      mbiemriPr: formData.mbiemriPr,
      mjekuMbikqyres: formData.mjekuMbikqyres,
      dataFillimit: formData.dataFillimit,
      dataPerfundimit: formData.dataPerfundimit,
      oret: formData.oret,
      aprovimi: formData.aprovimi
    };

    const url = 'https://localhost:7013/api/Praktikanti';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(praktikantiToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Praktikanti u editua me sukses!');
    {window.location.href="/praktikantet"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Praktikantin</h1>

        <div className="mt-5">
          <label className="h3 form-label">Praktikanti ID</label>
          <input value={formData.idPraktikanti} name="idPraktikanti" type="number" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Emri i Praktikantit</label>
          <input value={formData.emriPr} name="emriPr" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Mbiemri i Praktikantit</label>
          <input value={formData.mbiemriPr} name="mbiemriPr" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Mjeku Mbikqyres</label>
          <input value={formData.mjekuMbikqyres}  name="mjekuMbikqyres" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data e Fillimit</label>
          <input value={formData.dataFillimit} name="dataFillimit" type="date" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Data e Perfundimit</label>
          <input value={formData.dataPerfundimit} name="dataPerfundimit" type="date" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Oret</label>
          <input value={formData.oret} name="oret" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Aprovimi</label>
          <input value={formData.aprovimi} name="aprovimi" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/praktikantet" onClick={() => {window.location.href="/praktikantet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
