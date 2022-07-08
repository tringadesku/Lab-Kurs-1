import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddTermini = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const terminiToAdd = {
      idTermini : formData.idTermini,
      idMjeku: formData.idMjeku,
      idPacienti: formData.idPacienti,
      data: formData.data,
      ora: formData.ora,
      lloji: formData.lloji
    };

      const url = 'https://localhost:7013/api/Terminet';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(terminiToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Termini u shtua me sukses!');
      {window.location.href="/terminet"}


      

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Termin te ri:</h1>

          
          <div className="mt-5">
            <label className="h3 form-label">ID Termini</label>
            <input name="idTermini" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id e Mjekut</label>
            <input  name="idMjeku" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id Pacienti</label>
            <input  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

       
          <div className="mt-4">
            <label className="h3 form-label">Data</label>
            <input  name="data" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Ora</label>
            <input  name="ora" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji</label>
            <input  name="lloji" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/terminet" onClick={() => {window.location.href="/terminet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
