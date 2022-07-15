import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'

export const Login = () => {
  const [formData, setFormData] = useState(null);
  const [formErrors,setFormErrors]= useState({});
  const [isSubmit,setIsSubmit]= useState(false);


  const handleChange = (e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  });
  

  const handleSubmit = (e => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);

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
        if (responseFromServer !== "Invalid"){
          console.log(jwt(responseFromServer));
          localStorage.setItem("usertoken", responseFromServer);
          localStorage.setItem("user_role", jwt(responseFromServer).role);
          localStorage.setItem("user_emri", jwt(responseFromServer).emri);
          localStorage.setItem("user_mbiemri", jwt(responseFromServer).mbiemri);
          localStorage.setItem("user_id", jwt(responseFromServer).id);
          {window.location.href="/home"}
        }
         else{
          alert('Incorrect email or password!');
        }
        
      })
      .catch(error => {
        console.log(error);
        
      });
    })

 useEffect(()=>{
if(Object.keys(formErrors).length===0 && isSubmit){
  console.log(formData);
}



})

    const validate = (values)=> {
      const errors={};
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!values.email){
        errors.email = "E-mail is required!";
      }else if(!regex.test(values.email)){
        errors.email = "Invalid E-mail Format!";
      }
      if(!values.password){
        errors.password = "Password is required!";
      }else if(values.password.length<5){
        errors.password="Password must be at least 5 characters!"
      }



return errors;
    };

  return (
    <div class="login-div">
      <h1 style={{position: 'absolute', marginTop: "7.5%",marginRight:"5%", fontSize:"60px"}}>Hospital</h1>
      <h1 style={{position: 'absolute', marginTop: "11.3%", marginRight: "13%", fontSize:"60px"}}>Management</h1>
      <h1 style={{position: 'absolute', marginTop: "15.5%", marginRight: "1.5%", fontSize:"60px"}}>System</h1>
    <div  class="login-space" style={{marginLeft: "48%"}}>
    <fieldset>
    <form className="w-100 px-5" action="">
      <h2 className="mt-3" style={{paddingTop: "20px"}}>Log In:</h2>

      <div className="mt-5">
        <label className="h3 form-label"style={{paddingTop: "10px"}}>E-mail:</label>
        <input name="email" type="text" placeholder="Enter your email here" className="form-control" required onChange={handleChange}
         style={{height: "50px",fontSize:"18px"}}/>
      </div>
      <p class="error" style={{ position: "absolute"}}>{formErrors.email}</p>

      <div className="mt-5">
        <label className="h3 form-label" style={{paddingTop: "10px"}}>Password:</label>
        <input name="password" type="password" placeholder="Enter your password here"  className="form-control" onChange={handleChange}
        style={{height: "50px",fontSize:"18px"}}/>
      </div>
      <p class="error" style={{ position: "absolute"}}>{formErrors.password}</p>
      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100" style={{backgroundColor: "rgba(96,157,178,255)", border:"0px", height:"50px",marginTop:"50px"}}>Log In</button>
   
    </form>
    </fieldset>

</div>
</div>
  )
}
