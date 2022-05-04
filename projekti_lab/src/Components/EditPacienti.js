import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


export const EditPacienti = (props) => {

  const [pacientiById, setPacientiById] = useState([]);
  const idPacienti = (props.match.params.id);

  function getPacientiById(){
    const url = `https://localhost:7013/api/Pacienti/${idPacienti}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(dhomatFromServer => {
      console.log(dhomatFromServer);
      setPacientiById(dhomatFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getPacientiById,[]);

  const initialFormData = {
    idPacienti: idPacienti,
    emri: pacientiById.emri,
    mbiemri: pacientiById.mbiemri,
    ditelindja: pacientiById.ditelindja,
    gjinia: pacientiById.gjinia,
    shteti: pacientiById.shteti,
    qyteti: pacientiById.qyteti,
    emriRruges: pacientiById.emriRruges,
    tipiGjakut: pacientiById.tipiGjakut,
    nrtelefonit: pacientiById.nrtelefonit,
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
      nrtelefonit: formData.nrtelefonit,
    };

    const url = 'https://localhost:7013/api/Pacienti';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
    <div style={{marginRight: "33%"}}>
      <form className="w-100 px-5" action="">
        <h1 className="mt-5">Edito Pacientin</h1>

        <div className="mt-5">
            <label className="h3 form-label">ID e Pacientit</label>
            <input  value={formData.idPacienti} name="idPacienti" type="number" className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri</label>
            <input value={formData.emri}  name="emri" type="text" placeholder={pacientiById.emri} className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Mbiemri</label>
            <input value={formData.mbiemri}  name="mbiemri" type="text" className="form-control" placeholder={pacientiById.mbiemri} onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Ditelindja</label>
            <input value={formData.ditelindja} name="ditelindja" type="text" placeholder={pacientiById.ditelindja} className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Gjinia</label>
            <input value={formData.gjinia}  name="gjinia" type="text" placeholder={pacientiById.gjinia} className="form-control" onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Shteti</label>
            <input value={formData.shteti}  name="shteti" type="text" className="form-control" placeholder={pacientiById.shteti} onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Qyteti</label>
            <input value={formData.qyteti}  name="qyteti" type="text" className="form-control" placeholder={pacientiById.qyteti} onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Emri Rruges</label>
            <input value={formData.emriRruges}  name="emriRruges" type="text" className="form-control" placeholder={pacientiById.emriRruges} onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Tipi i Gjakut</label>
            <input value={formData.tipiGjakut}  name="tipiGjakut" type="text" className="form-control" placeholder={pacientiById.tipiGjakut} onChange={handleChange}/>
          </div>

          <div className="mt-4">
            <label className="h3 form-label">NrTelefonit</label>
            <input value={formData.nrtelefonit} name="nrtelefonit" type="text" className="form-control" placeholder={pacientiById.nrtelefonit} onChange={handleChange}/>
          </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Edito</button>
        <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary btn-lg w-100 mt-3">Kthehu mbrapa</Link>

      </form>
      

    </div>
  )
}
