import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {

  const usertoken = (localStorage.getItem("usertoken"));

  function checkRecepsionist(){
    const roli = (localStorage.getItem("user_role"));
    if (roli == "Recepsionist"){
      return true;
    }
  }

  function checkInfermier(){
    const roli = (localStorage.getItem("user_role"));
    if (roli == "Infermier"){
      return true;
    }
  }

  function checkMjek(){
    const roli = (localStorage.getItem("user_role"));
    if (roli == "Mjek"){
      return true;
    }
  }

  function checkLaborant(){
    const roli = (localStorage.getItem("user_role"));
    if (roli == "Laborant"){
      return true;
    }
  }

  function checkInfermier(){
    const roli = (localStorage.getItem("user_role"));
    if (roli == "Infermier"){
      return true;
    }
  }

  function checkAdmin(){
    const roli = (localStorage.getItem("user_role"));
    if (roli == "Admin"){
      return true;
    }
  }

  const emri = (localStorage.getItem("user_emri"));
  const mbiemri = (localStorage.getItem("user_mbiemri"));
  const roli = (localStorage.getItem("user_role"));

  function logout(){
    localStorage.clear();
    {window.location.href="/login"}
  }
  return (
    <div>
      <nav className="navbar navbar-light mt-5 mx-5 bg-secondary" style={{display: "flex"}}>
        <h1 className='p-1 text-light'>Dashboard</h1>
        <div>
        <h5 className='text-light'>User: {emri} {mbiemri}</h5>
        <h5 className='text-light'>Role: {roli} </h5>
        </div>
        {usertoken && (checkAdmin() || checkInfermier()) && <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary btn-lg w-15 mt-3">Dhomat</Link>}
        {usertoken && checkRecepsionist() && <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary btn-lg w-15  mt-3">Pacientat</Link>}
        {usertoken && checkRecepsionist() && <Link to="/faturat" onClick={() => {window.location.href="/faturat"}} className="btn btn-secondary btn-lg w-15  mt-3">Faturat</Link>}
        {usertoken && (checkRecepsionist || checkMjek()) && <Link to="/terminet" onClick={() => {window.location.href="/terminet"}} className="btn btn-secondary btn-lg w-15  mt-3">Terminet</Link>}
        {usertoken && checkAdmin() && <Link to="/users" onClick={() => {window.location.href="/users"}} className="btn btn-secondary btn-lg w-15  mt-3">Users</Link>}
        {usertoken && checkInfermier() && <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary btn-lg w-15  mt-3">Infuzionet</Link>}
        {usertoken && checkMjek() && <Link to="/kontrollat" onClick={() => {window.location.href="/kontrollat"}} className="btn btn-secondary btn-lg w-15  mt-3">Kontrollat</Link>}
        {usertoken && checkMjek() && <Link to="/praktikantet" onClick={() => {window.location.href="/praktikantet"}} className="btn btn-secondary btn-lg w-15  mt-3">Praktikantet</Link>}
        {usertoken && checkLaborant() && <Link to="/laboratori" onClick={() => {window.location.href="/laboratori"}} className="btn btn-secondary btn-lg w-15  mt-3">Laboratori</Link>}
        {usertoken && checkMjek() && <Link to="/operacionet" onClick={() => {window.location.href="/operacionet"}} className="btn btn-secondary btn-lg w-15  mt-3">Operacioni</Link>}
        <Link to="/login" onClick={logout} className="btn btn-danger btn-lg w-15 mt-3 mx-5">Log Out</Link>

      </nav>



      </div>

      
  )
}
