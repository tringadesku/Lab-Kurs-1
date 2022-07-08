import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddOperacioni = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const operacioniToAdd = {
      idOperacioni : formData.idOperacioni,
      idUserMjekuKryesor: formData.idUserMjekuKryesor,
      idPacienti: formData.idPacienti,
      sallaNr: formData.sallaNr,
      data: formData.data,
      ora: formData.ora
    };

      const url = 'https://localhost:7013/api/Operacioni';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(operacioniToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Operacioni u shtua me sukses!');
      {window.location.href="/operacionet"}


      

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Operacion te ri:</h1>

          
          <div className="mt-5">
            <label className="h3 form-label">ID Operacioni</label>
            <input name="idOperacioni" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id e Mjekut Kryesor</label>
            <input  name="idUserMjekuKryesor" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Id Pacienti</label>
            <input  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

       
          <div className="mt-4">
            <label className="h3 form-label">Salla</label>
            <input  name="sallaNr" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data</label>
            <input  name="data" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Ora</label>
            <input  name="ora" type="time" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/operacionet" onClick={() => {window.location.href="/operacionet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
