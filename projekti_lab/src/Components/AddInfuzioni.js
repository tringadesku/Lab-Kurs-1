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
          'Content-Type': 'application/json'
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


      console.log(infuzioniToAdd);
      

    }

  );
  return (
      <div style={{marginRight: "33%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Infuzion te ri:</h1>

          <div className="mt-5">
            <label className="h3 form-label">Infuzioni ID</label>
            <input name="id" type="number" className="form-control" onChange={handleChange}/>
          </div>

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
            <label className="h3 form-label">Ora</label>
            <input  name="ora" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Regjistro</button>
          <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
