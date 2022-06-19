import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-light mt-5 mx-5 bg-secondary" style={{display: "flex"}}>
        <h1 className='p-1 text-light'>Dashboard</h1>
        <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary btn-lg w-15 mt-3">Dhomat</Link>
        <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary btn-lg w-15  mt-3">Pacientat</Link>
        <Link to="/users" onClick={() => {window.location.href="/users"}} className="btn btn-secondary btn-lg w-15  mt-3">Users</Link>
        <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary btn-lg w-15  mt-3">Infuzionet</Link>
        <Link to="/kontrollat" onClick={() => {window.location.href="/kontrollat"}} className="btn btn-secondary btn-lg w-15  mt-3">Kontrollat</Link>
        <Link to="/faturat" onClick={() => {window.location.href="/faturat"}} className="btn btn-secondary btn-lg w-15  mt-3">Faturat</Link>
        <Link to="/ambulancat" onClick={() => {window.location.href="/ambulancat"}} className="btn btn-secondary btn-lg w-15  mt-3">Ambulancat</Link>
        <Link to="/praktikantet" onClick={() => {window.location.href="/praktikantet"}} className="btn btn-secondary btn-lg w-15  mt-3">Praktikantet</Link>
        <Link to="/laboratori" onClick={() => {window.location.href="/laboratori"}} className="btn btn-secondary btn-lg w-15  mt-3">Laboratori</Link>
        <Link to="/operacionet" onClick={() => {window.location.href="/operacionet"}} className="btn btn-secondary btn-lg w-15  mt-3">Operacioni</Link>
        <Link to="/terminet" onClick={() => {window.location.href="/terminet"}} className="btn btn-secondary btn-lg w-15  mt-3">Terminet</Link>


      </nav>



      </div>

      
  )
}
