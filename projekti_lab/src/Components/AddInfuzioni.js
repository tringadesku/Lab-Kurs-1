import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddInfuzioni = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const infuzioniToAdd = {
      id: formData.id,
      idInfermieri: formData.idInfermieri,
      idPacienti: formData.idPacienti,
      lloji: formData.lloji,
      ora: formData.ora
    };

      const url = 'https://localhost:7013/api/Infuzionet';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(infuzioniToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });


      alert('Infuzioni u shtua me sukses!');
      {window.location.href="/infuzionet"}

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Infuzion te ri:</h1>

          <div className="mt-4">
            <label className="h3 form-label">ID Infermierit</label>
            <input  name="idInfermieri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">ID Pacientit</label>
            <input  name="idPacienti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji</label>
            <input  name="lloji" type="text" className="form-control" onChange={handleChange}/>
          </div>
          
          <div className="mt-4">
            <label className="h3 form-label">Data</label>
            <input  name="data" type="date" className="form-control" placeholder="Viti-Muaji-Dita" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Ora</label>
            <input  name="ora" type="time" className="form-control" placeholder="HH:MM" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Regjistro</button>
          <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}

