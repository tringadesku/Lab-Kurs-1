import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddPraktikanti = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const praktikantiToAdd = {
   
    idPraktikanti: formData.idPraktikanti,
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(praktikantiToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Praktikanti u shtua me sukses!');
      {window.location.href="/praktikantet"}


      

    }

  );
  return (
      <div style={{marginRight: "33%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Praktikant te ri:</h1>

          <div className="mt-4">
            <label className="h3 form-label">ID e Praktikantit</label>
            <input  name="idPraktikanti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri i Praktikantit</label>
            <input  name="emriPr" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mbiemri i Praktikantit</label>
            <input  name="mbiemriPr" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mjeku Mbikqyres</label>
            <input  name="mjekuMbikqyres" type="number" className="form-control" onChange={handleChange}/>
          </div>

       
          <div className="mt-4">
            <label className="h3 form-label">Data e Fillimit</label>
            <input  name="dataFillimit" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data e Perfundimit</label>
            <input  name="dataPerfundimit" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Oret</label>
            <input  name="oret" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Aprovimi</label>
            <input  name="aprovimi" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/praktikantet" onClick={() => {window.location.href="/praktikantet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
