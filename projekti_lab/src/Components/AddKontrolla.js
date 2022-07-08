import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddKontrolla = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const kontrollaToAdd = {
      idKontrolla : formData.idKontrolla,
      idUserMjeku: formData.idUserMjeku,
      idPacienti: formData.idPacienti,
      diagnoza: formData.diagnoza,
      pershkrimi: formData.pershkrimi,
      receta: formData.receta
    };

      const url = 'https://localhost:7013/api/Kontrolla';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(kontrollaToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Kontrolla u shtua me sukses!');
      {window.location.href="/kontrollat"}


      

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Kontrolle te re:</h1>

          
          <div className="mt-5">
            <label className="h3 form-label">ID Kontrolla</label>
            <input name="idKontrolla" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id e Mjekut</label>
            <input  name="idUserMjeku" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id Pacienti</label>
            <input  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

       
          <div className="mt-4">
            <label className="h3 form-label">Diagnoza</label>
            <input  name="diagnoza" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Pershkrimi</label>
            <input  name="pershkrimi" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Receta</label>
            <input  name="receta" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/kontrollat" onClick={() => {window.location.href="/kontrollat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
