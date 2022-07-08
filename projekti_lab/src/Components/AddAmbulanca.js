import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddAmbulanca = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const ambulancaToAdd = {
      nrAuto : formData.nrAuto,
      idUserMjekuLider: formData.idUserMjekuLider,
      lokacioni: formData.lokacioni,
      statusi: formData.statusi
    };

      const url = 'https://localhost:7013/api/Ambulanca';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(ambulancaToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Ambulanca u shtua me sukses!');
      {window.location.href="/ambulancat"}


    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Ambulance te re:</h1>

          <div className="mt-5">
            <label className="h3 form-label">Numri Auto</label>
            <input name="nrAuto" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">ID e Mjekut Lider</label>
            <input  name="idUserMjekuLider" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lokacioni</label>
            <input  name="lokacioni" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Statusi</label>
            <input  name="statusi" type="text" className="form-control" onChange={handleChange}/>
          </div>

      
          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/ambulancat" onClick={() => {window.location.href="/ambulancat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
