import React from 'react'
import { Link } from 'react-router-dom'
import {Dhomat} from './Dhomat'


export const Home = () => {

  const emri = (localStorage.getItem("user_emri"));
  const mbiemri = (localStorage.getItem("user_mbiemri"));
  
  return (
    <div>
      <h5 className='mx-5'>Welcome, {emri} {mbiemri} !</h5>
    </div>

    
  )
}
