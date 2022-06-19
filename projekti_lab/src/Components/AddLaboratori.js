import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddLaboratori = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const laboratoriToAdd = {
      iduserLaboranti: formData.iduserLaboranti,
      idPacienti: formData.idPacienti,
      data: formData.data,
      lloji: formData.lloji,
      
    };

      const url = 'https://localhost:7013/api/Laboratori';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(laboratoriToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });


      alert('Laboratori u shtua me sukses!');
      {window.location.href="/laboratori"}
      

    }

  );
  return (
      <div style={{marginRight: "33%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Analize te re:</h1>

          <div className="mt-4">
            <label className="h3 form-label">Laboranti ID</label>
            <input  name="idUserLaboranti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Pacienti ID</label>
            <input  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data</label>
            <input  name="data" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji</label>
            <input  name="lloji" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Ruaj</button>
          <Link to="/laboratori" onClick={() => {window.location.href="/laboratori"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}

