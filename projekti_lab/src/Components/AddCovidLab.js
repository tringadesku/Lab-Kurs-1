import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddCovidLab = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const CovidLabToAdd = {
      analizaId: formData.analizaId,
      idUserLaboranti: formData.idUserLaboranti,
      pacientiId: formData.pacientiId,
      llojiTestit: formData.llojiTestit,
      mostra: formData.mostra,
      dataAnalizes: formData.dataAnalizes,
      rezultati: formData.rezultati,
      
    };

      const url = 'https://localhost:7013/api/CovidLab';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(CovidLabToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });


      //alert('Covid-Analiza u shtua me sukses!');
      //{window.location.href="/CovidLab"}
      

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Covid-Analize te re:</h1>

          <div className="mt-4">
            <label className="h3 form-label">Laboranti ID</label>
            <input  name="idUserLaboranti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Pacienti ID</label>
            <input  name="pacientiId" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji i Testit</label>
            <input  name="llojiTestit" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji i Mostres</label>
            <input  name="mostra" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data e Analizes</label>
            <input  name="dataAnalizes" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Rezultati</label>
            <input  name="rezultati" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Ruaj</button>
          <Link to="/CovidLab" onClick={() => {window.location.href="/CovidLab"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}

