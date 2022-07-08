import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddFatura = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const faturaToAdd = {
      //idFatura : formData.idFatura,
      idUserRecepsionisti: formData.idUserRecepsionisti,
      idPacienti: formData.idPacienti,
      pershkrimi: formData.pershkrimi,
      data: formData.data,
      pagesaTotale: formData.pagesaTotale,
      statusi: formData.statusi

    };

      const url = 'https://localhost:7013/api/Fatura';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(faturaToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Fatura u shtua me sukses!');
      {window.location.href="/faturat"}


      

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Fature te re:</h1>


          <div className="mt-4">
            <label className="h3 form-label">Id e Recepsionistit</label>
            <input  name="idUserRecepsionisti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id Pacienti</label>
            <input  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

       
          <div className="mt-4">
            <label className="h3 form-label">Pershkrimi</label>
            <input  name="pershkrimi" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data</label>
            <input  name="data" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Pagesa Totale</label>
            <input  name="pagesaTotale" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Statusi</label>
            <input  name="statusi" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/faturat" onClick={() => {window.location.href="/faturat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
