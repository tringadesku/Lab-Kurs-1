import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";


export const EditPacienti = (props) => {
  const idPacienti = (props.match.params.id);
  const [formData, setFormData] = useState([]);

  function getPacientiById(){
    const url = `https://localhost:7013/api/Pacienti/${idPacienti}`;
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(pacientiFromServer => {
      console.log(pacientiFromServer);
      setFormData(pacientiFromServer);
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getPacientiById,[]);

  //console.log(typeof initialFormData.emri);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const pacientiToEdit = {
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
      },
      body: JSON.stringify(pacientiToEdit)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
    })
    .catch(error => {
      console.log(error);
    });

    alert('Pacienti u editua me sukses!');
    {window.location.href="/pacientat"}


  });

  return (
    <div style={{marginRight: "33%", paddingLeft: "18%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Pacientin</h1>

        <div className="mt-5">
            <label className="h3 form-label">ID e Pacientit</label>
            <input  value={formData.idPacienti} name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri</label>
            <input value={formData.emri}  name="emri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mbiemri</label>
            <input value={formData.mbiemri}  name="mbiemri" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Ditelindja</label>
            <input value={formData.ditelindja} name="ditelindja" type="date" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Gjinia</label>
            <input value={formData.gjinia}  name="gjinia" type="text"  className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Shteti</label>
            <input value={formData.shteti}  name="shteti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Qyteti</label>
            <input value={formData.qyteti}  name="qyteti" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri Rruges</label>
            <input value={formData.emriRruges}  name="emriRruges" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Tipi i Gjakut</label>
            <input value={formData.tipiGjakut}  name="tipiGjakut" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Alergji</label>
            <input value={formData.alergji}  name="alergji" type="text" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">NrTelefonit</label>
            <input value={formData.nrtelefonit} name="nrtelefonit" type="text" className="form-control" onChange={handleChange}/>
          </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
