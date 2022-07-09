import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddTrajtimiMujor = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const TrajtimiMujorToAdd = {
      //nrT : formData.nrT,
      idPacienti: formData.idPacienti,
      dataFillimit: formData.dataFillimit,
      dataMbarimit: formData.dataMbarimit,
      lloji: formData.lloji

    };

      const url = 'https://localhost:7013/api/TrajtimetMujore';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(TrajtimiMujorToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Trajtimi Mujor u shtua me sukses!');
      {window.location.href="/trajtimet"}


      

    }

  );
  return (
      <div style={{marginRight: "33%", paddingLeft: "18%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Shto Trajtim Mujor te ri:</h1>


          <div className="mt-4">
            <label className="h3 form-label">Id Pacienti</label>
            <input  name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Data e Fillimit</label>
            <input  name="dataFillimit" type="date" className="form-control" onChange={handleChange}/>
          </div>

          
          <div className="mt-4">
            <label className="h3 form-label">Data e Mbarimit</label>
            <input  name="dataMbarimit" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Lloji</label>
            <input  name="lloji" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Shto</button>
          <Link to="/trajtimet" onClick={() => {window.location.href="/trajtimet"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
