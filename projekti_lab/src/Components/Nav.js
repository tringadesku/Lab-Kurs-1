import React from 'react'
import { Link } from 'react-router-dom'
import { BsPersonLinesFill, BsFillPersonFill} from "react-icons/bs"
import {RiBillLine, RiSyringeLine} from "react-icons/ri"
import {AiOutlineCalendar} from "react-icons/ai"
import {BiUserCircle} from "react-icons/bi"
import {MdMeetingRoom, MdOutlineEmergency} from "react-icons/md"
import {GiMedicalDrip, GiLoveInjection} from "react-icons/gi"
import {TbReportMedical} from "react-icons/tb"
import {HiOutlineClipboardList} from "react-icons/hi"
import {MdOutlineCoronavirus} from "react-icons/md"





export const Nav = () => {

  const usertoken = (localStorage.getItem("usertoken"));

  function checkRecepsionist(){
    const roli = (localStorage.getItem("user_role"));
    if (roli === "Recepsionist"){
      return true;
    }
  }

  function checkInfermier(){
    const roli = (localStorage.getItem("user_role"));
    if (roli ==="Infermier"){
      return true;
    }
  }

  function checkMjek(){
    const roli = (localStorage.getItem("user_role"));
    if (roli === "Mjek"){
      return true;
    }
  }

  function checkLaborant(){
    const roli = (localStorage.getItem("user_role"));
    if (roli === "Laborant"){
      return true;
    }
  }

  function checkInfermier(){
    const roli = (localStorage.getItem("user_role"));
    if (roli === "Infermier"){
      return true;
    }
  }

  function checkAdmin(){
    const roli = (localStorage.getItem("user_role"));
    if (roli === "Admin"){
      return true;
    }
  }

  const emri = (localStorage.getItem("user_emri"));
  const mbiemri = (localStorage.getItem("user_mbiemri"));
  const roli = (localStorage.getItem("user_role"));

  function logout(){
    localStorage.clear();
    {window.location.href="/"}
  }
  return (
    <div>
      <nav className="navbar navbar-light mt-5 mx-5 bg-secondary" style={{display: "flex"}}>
        <h1 className='p-1 text-light'>Hospital Management System</h1>
        <div style={{display: "flex"}}>
        <h5 className='text-light' style={{alignSelf: "flex-end"}}><BiUserCircle/>{emri} {mbiemri}, {roli}</h5>
        <Link to="/" onClick={logout} className="btn btn-danger btn-md w-15 mt-3 mx-5">Log Out</Link>
        </div>
      </nav>

      <nav className="navbar row navbar-light mx-5 mt-2 bg-secondary" style={{width: "12%", position: "absolute", height: "80%", alignContent: 'flex-start'}}>
      {usertoken && (checkAdmin() || checkInfermier()) && <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary btn-lg rounded-0 text-start"><MdMeetingRoom/> Dhomat</Link>}
        {usertoken && checkRecepsionist() && <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"> <BsPersonLinesFill /> Pacientat</Link>}
        {usertoken && checkRecepsionist() && <Link to="/faturat" onClick={() => {window.location.href="/faturat"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"> <RiBillLine/> Faturat</Link>}
        {usertoken && checkRecepsionist() && <Link to="/trajtimet" onClick={() => {window.location.href="/trajtimet"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"> <HiOutlineClipboardList/> Trajtimet Mujore</Link>}
        {usertoken && (checkRecepsionist() || checkMjek()) && <Link to="/terminet" onClick={() => {window.location.href="/terminet"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"> <AiOutlineCalendar/> Terminet</Link>}
        {usertoken && checkAdmin() && <Link to="/users" onClick={() => {window.location.href="/users"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"> <BiUserCircle/> Users</Link>}
        {usertoken && checkInfermier() && <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><GiMedicalDrip /> Infuzionet</Link>}
        {usertoken && checkMjek() && <Link to="/kontrollat" onClick={() => {window.location.href="/kontrollat"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><TbReportMedical/> Kontrollat</Link>}
        {usertoken && checkMjek() && <Link to="/praktikantet" onClick={() => {window.location.href="/praktikantet"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><BsFillPersonFill/> Praktikantet</Link>}
        {usertoken && (checkLaborant() || checkMjek()) && <Link to="/laboratori" onClick={() => {window.location.href="/laboratori"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><RiSyringeLine/> Laboratori</Link>}
        {usertoken && (checkLaborant() || checkMjek()) && <Link to="/CovidLab" onClick={() => {window.location.href="/CovidLab"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><MdOutlineCoronavirus/> Covid Laboratori</Link>}
        {usertoken && checkMjek() && <Link to="/operacionet" onClick={() => {window.location.href="/operacionet"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><GiLoveInjection/> Operacionet</Link>}
        {usertoken && checkMjek() && <Link to="/ambulancat" onClick={() => {window.location.href="/ambulancat"}} className="btn btn-secondary btn-lg w-15 rounded-0 text-start"><MdOutlineEmergency/> Ambulanca</Link>}
      </nav>
      </div>

      
  )
}
