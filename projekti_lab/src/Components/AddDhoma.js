import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddDhoma = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const dhomaToAdd = {
      roomNr: formData.roomNr,
      nrPacientave: formData.nrPacientave
    };

      const url = 'https://localhost:7013/api/Dhoma';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(dhomaToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Dhoma u shtua me sukses!');
      {window.location.href="/dhomat"}


      

    }

  );
  return (
      <div style={{marginRight: "33%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Dhome te re:</h1>

          <div className="mt-5">
            <label className="h3 form-label">Room Number</label>
            <input name="roomNr" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Numri i Pacientave</label>
            <input  name="nrPacientave" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
