import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary btn-lg w-100 mt-3">Dhomat</Link>
    </div>
  )
}
