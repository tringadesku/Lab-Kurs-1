import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

export const AddPacienti = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const pacientiToAdd = {
      idPacienti: formData.idPacienti,
      emri: formData.emri,
      mbiemri: formData.mbiemri,
      ditelindja: formData.ditelindja,
      gjinia: formData.gjinia,
      shteti: formData.shteti,
      qyteti: formData.qyteti,
      emriRruges: formData.emriRruges,
      tipiGjakut: formData.tipiGjakut,
      alergji: formData.alergji,
      nrtelefonit: formData.nrtelefonit,
    };

      const url = 'https://localhost:7013/api/Pacienti';
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacientiToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch(error => {
        console.log(error);
      });

      alert('Pacienti u shtua me sukses!');
      {window.location.href="/pacientat"}

      

    }

  );
  return (
      <div style={{marginRight: "33%"}}>
        <form className="w-100 px-5" action="">
          <h1 className="mt-5">Regjistro Pacient te ri:</h1>

          <div className="mt-4">
            <label className="h3 form-label">ID</label>
            <input  name="idPacienti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri</label>
            <input  name="emri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mbiemri</label>
            <input  name="mbiemri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Ditelindja</label>
            <input  name="ditelindja" type="text" placeholder="viti-muaji-dita" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Gjinia</label>
            <input  name="gjinia" type="text" placeholder="M/F" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Shteti</label>
            <input  name="shteti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Qyteti</label>
            <input  name="qyteti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri Rruges</label>
            <input  name="emriRruges" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Tipi i Gjakut</label>
            <input  name="tipiGjakut" type="text" className="form-control" placeholder='A+/A-/B+/B-/0+/0-/AB+/AB-' onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Alergji</label>
            <input  name="alergji" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">NrTelefonit</label>
            <input  name="nrtelefonit" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Regjistro</button>
          <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

        </form>
      
    </div>
  )
}
