import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditDhoma = (props) => {

  const [dhomaById, setDhomaById] = useState([]);
  const roomNr = (props.match.params.id);

  console.log(props);

  function getDhomaById(){
    const url = `https://localhost:7013/api/Dhoma/${roomNr}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(dhomatFromServer => {
      console.log(dhomatFromServer);
      setDhomaById(dhomatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getDhomaById,[]);

  const initialFormData = {
    roomNr: roomNr,
    nrPacientave: dhomaById.nrPacientave
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const dhomaToEdit = {
      roomNr: formData.roomNr,
      nrPacientave: formData.nrPacientave
    };

    const url = 'https://localhost:7013/api/Dhoma';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dhomaToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Dhoma u editua me sukses!');
    {window.location.href="/dhomat"}


  });

  return (
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Dhomen</h1>

        <div className="mt-5">
          <label className="h3 form-label">Room Number</label>
          <input value={formData.roomNr} name="roomNr" type="text" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Numri i Pacientave</label>
          <input value={formData.nrPacientave} placeholder={dhomaById.nrPacientave} name="nrPacientave" type="number" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
