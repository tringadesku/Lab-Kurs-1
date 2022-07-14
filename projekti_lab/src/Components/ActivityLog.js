import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import authHeader from "../Services/auth-header";

export const ActivityLog = () => {

  const [activities, setActivities] = useState([]);

  function getActivities(){
    const url = 'https://localhost:7013/api/ActivityLogUser';
    fetch(url, {
      method: 'GET',
      headers: authHeader()
    })
    .then(response => response.json())
    .then(activitiesFromServer => {
      console.log(activitiesFromServer);
      setActivities(activitiesFromServer);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(getActivities,[]);


  return (
    <div className='table-responsive mt-1 mx-5' style={{paddingLeft: "13%"}}>
      <h3>Activity Log</h3>
    <table className='table table-striped'>
      <thead>
        <tr className="table" style={{backgroundColor: "#A2BFC8"}}>
          <th scope='col'>ID</th>
          <th scope='col'>Activity</th>
        </tr>
      </thead>
      <tbody>
          {activities.map(activities => (
          <tr key={activities.id}>
            <td>{activities.id}</td>
            <td>{activities.useriLoggedName} with ID {activities.useriLoggedId}, {activities.activity} {activities.activityOn} on {activities.ora}</td>
        </tr>   
          ))}
      </tbody>

    </table>
    
  </div>
  )

 

}
