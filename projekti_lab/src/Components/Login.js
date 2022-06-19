import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'

export const Login = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });

  const handleSubmit = (e => {
    e.preventDefault();

    const inputUser = {
      email: formData.email,
      password: formData.password
    };

    const url = 'https://localhost:7013/api/User/login';
      
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputUser)
      })
      .then(response => response.text())
      .then(responseFromServer => {
        if (responseFromServer != "Invalid"){
          console.log(jwt(responseFromServer));
          localStorage.setItem("usertoken", responseFromServer);
          localStorage.setItem("user_role", jwt(responseFromServer).role);
          localStorage.setItem("user_emri", jwt(responseFromServer).emri);
          localStorage.setItem("user_mbiemri", jwt(responseFromServer).mbiemri);
          {window.location.href="/home"}
        } else{
          alert('Incorrect email or password!');;
        }

      })
      .catch(error => {
        console.log(error);
        
      });

  
    });

  return (
    <div style={{marginRight: "33%"}}>
    <form className="w-100 px-5" action="">
      <h1 className="mt-5">Log In:</h1>

      <div className="mt-5">
        <label className="h3 form-label">E-mail:</label>
        <input name="email" type="text" className="form-control" onChange={handleChange}/>
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Password:</label>
        <input name="password" type="password" className="form-control" onChange={handleChange}/>
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Log In</button>
    
    </form>
  
</div>
  )
}