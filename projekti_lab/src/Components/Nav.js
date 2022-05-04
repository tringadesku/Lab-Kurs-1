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
      </nav>



      </div>

      
  )
}
