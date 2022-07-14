import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import {BiCheckboxChecked, BiCheckboxMinus} from "react-icons/bi"
import authHeader from "../Services/auth-header";
import { BsPersonLinesFill, BsFillPersonFill} from "react-icons/bs"
import {RiBillLine, RiSyringeLine} from "react-icons/ri"
import {AiOutlineCalendar} from "react-icons/ai"
import {BiUserCircle, BiExit} from "react-icons/bi"
import {MdMeetingRoom, MdOutlineEmergency, MdHome} from "react-icons/md"
import {GiMedicalDrip, GiLoveInjection} from "react-icons/gi"
import {TbReportMedical} from "react-icons/tb"
import {HiOutlineClipboardList} from "react-icons/hi"
import {MdOutlineCoronavirus} from "react-icons/md"
import {BsFillEyeFill} from "react-icons/bs"
import {checkAdmin, checkInfermier, checkLaborant, checkRecepsionist, checkMjek} from "../Services/checkRolet";

export const Home = () => {

  const emri = (localStorage.getItem("user_emri"));
  const mbiemri = (localStorage.getItem("user_mbiemri"));
  const [activeStaff, setActiveStaff] = useState([]);
  const useriId = (localStorage.getItem("user_id"));

  function getStaff(){
    const url = 'https://localhost:7013/api/ActiveStaff';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(activeStaffUsers => {
      console.log(activeStaffUsers);
      setActiveStaff(activeStaffUsers);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getStaff,[]);
  
  return (
    <div style={{height: "100%", marginLeft: "16%", marginRight:"3.5%", display: 'flex',
    marginTop: "10px", marginBottom:"2%", justifyContent: 'space-around', backgroundColor: "#A2BFC8"}}>

      <div>
        <h4 className='mx-2 mt-1'>Welcome, {emri} {mbiemri}!</h4>
        <h5 className='mx-2 mt-1'>Go to: </h5>
        <div style={{display: 'flex', flexWrap: 'wrap', width: "650px", justifyContent: 'space-around'}}>

        {(checkAdmin() || checkInfermier()) &&
                <Link to="/dhomat" onClick={() => {window.location.href="/dhomat"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
                <div className='mt-2'>
                  <h1><MdMeetingRoom/></h1>
                  <h5>Dhomat</h5>
                  <p>Add, Edit, Delete</p>
                </div>
              </Link>
        }

        {checkRecepsionist() &&
          <Link to="/pacientat" onClick={() => {window.location.href="/pacientat"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><BsPersonLinesFill/></h1>
              <h5>Pacientat</h5>
              <p>Register, Edit, Delete</p>
            </div>
          </Link>
        }

        {checkRecepsionist() &&
          <Link to="/faturat" onClick={() => {window.location.href="/faturat"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><RiBillLine/></h1>
              <h5>Faturat</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {(checkRecepsionist() || checkMjek()) &&
          <Link to="/terminet" onClick={() => {window.location.href="/terminet"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><AiOutlineCalendar/></h1>
              <h5>Terminet</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {(checkRecepsionist() || checkMjek()) &&
          <Link to="/trajtimet" onClick={() => {window.location.href="/trajtimet"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><HiOutlineClipboardList/></h1>
              <h5>Trajtimet Mujore</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {checkAdmin() &&
          <Link to="/users" onClick={() => {window.location.href="/users"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><BiUserCircle/></h1>
              <h5>Users</h5>
              <p>Create, Edit, Delete</p>
            </div>
          </Link>
        }

        {checkAdmin() &&
          <Link to="/activitylog" onClick={() => {window.location.href="/activitylog"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><BsFillEyeFill/></h1>
              <h5>Activity Log</h5>
              <p>Read</p>
            </div>
          </Link>
        }

        {checkInfermier() &&
          <Link to="/infuzionet" onClick={() => {window.location.href="/infuzionet"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><GiMedicalDrip/></h1>
              <h5>Infuzionet</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {checkMjek() &&
          <Link to="/kontrollat" onClick={() => {window.location.href="/kontrollat"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><TbReportMedical/></h1>
              <h5>Kontrollat</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {checkMjek() &&
          <Link to="/praktikantet" onClick={() => {window.location.href="/praktikantet"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><BsFillPersonFill/></h1>
              <h5>Praktikantet</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {checkMjek() &&
          <Link to="/operacionet" onClick={() => {window.location.href="/operacionet"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><GiLoveInjection/></h1>
              <h5>Operacionet</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }  

        {checkMjek() &&
          <Link to="/ambulancat" onClick={() => {window.location.href="/ambulancat"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><MdOutlineEmergency/></h1>
              <h5>Ambulanca</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }

        {(checkLaborant() || checkMjek()) &&
          <Link to="/laboratori" onClick={() => {window.location.href="/laboratori"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><RiSyringeLine/></h1>
              <h5>Laboratori</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }  

        {(checkLaborant() || checkMjek()) &&
          <Link to="/CovidLab" onClick={() => {window.location.href="/CovidLab"}} className="btn btn-secondary card-btn text-white text-center mb-3" style={{width: "300px"}}>
            <div className='mt-2'>
              <h1><MdOutlineCoronavirus/></h1>
              <h5>Covid Laboratori</h5>
              <p>Add, Edit, Delete</p>
            </div>
          </Link>
        }             

        </div>
      </div>

      

      <div style={{paddingRight: "4%", marginTop: "6%"}}>
      <button type="button" className="btn btn-secondary custom-btn px-5 mx-1" onClick={setActiveUser}><BiCheckboxChecked/>Check In</button>
      <button type="button" className="btn btn-secondary px-5 mx-1 text-white" onClick={() => {removeActiveUser(useriId)}}><BiCheckboxMinus/>Check Out</button>

      <ul className="list-group mt-1">
        <li className="list-group-item" style={{backgroundColor:"#6897A6", color: "white"}}>Active Staff</li>
        {activeStaff.map(activeStaff => (
              <li className="list-group-item">{activeStaff.useriRole}: {activeStaff.useriName}, ID {activeStaff.useriId}</li>
            ))}
      </ul>

      </div>
    


      
    </div>
    
  )

  
    function setActiveUser(){
      const url = 'https://localhost:7013/api/ActiveStaff';

      const activeUserToAdd = {
        useriId: (localStorage.getItem("user_id")),
        useriRole: (localStorage.getItem("user_role")),
        useriName: (localStorage.getItem("user_emri")) + " " + (localStorage.getItem("user_mbiemri")),
        checkedInTime: moment().format()
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'bearer ' + (localStorage.getItem("usertoken"))
        },
        body: JSON.stringify(activeUserToAdd)
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        getStaff();
      })
      .catch(error => {
        console.log(error);
      });  

    }

    function removeActiveUser(id){
      const url = `https://localhost:7013/api/ActiveStaff/${id}`;
      fetch(url, {
        method: 'DELETE',
        headers: authHeader()
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        getStaff();
      })
      .catch(error => {
        console.log(error);
      });
    }
  
  
    }
      

  

 

  



  