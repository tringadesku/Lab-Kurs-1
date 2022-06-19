import React, {useState} from "react";



export default function DhomatCreateForm(props){
  const initialFormData = Object.freeze({
    roomNr: "test",
    nrPacientave: 1
  });
  
  const [formData, setFormData] = useState(initialFormData);


  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const dhomaToCreate = {
      roomNr: formData.roomNr,
      nrPacientave: formData.nrPacientave
    };

    const url = 'https://localhost:7013/api/Dhoma';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dhomaToCreate)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    props.onDhomatCreated(dhomaToCreate);


  });

  return(
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Shto Dhome te re:</h1>

        <div className="mt-5">
          <label className="h3 form-label">Room Number</label>
          <input value={FormData.roomNr} name="roomNr" type="text" className="form-control" onChange={handleChange} />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Numri i Pacientave</label>
          <input value={formData.nrPacientave} name="nrPacientave" type="number" className="form-control" onChange={handleChange} />
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
        <button onClick={() => props.onDhomatCreated} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu Mbrapa</button>

      </form>
      

    </div>
  )
}