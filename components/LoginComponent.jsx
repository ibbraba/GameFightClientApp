import axios, { Axios } from 'axios'
import React, { useState } from 'react'

export async function IsUserLoggedIn(){
    const token = localStorage.getItem('gf-token')
    console.log(token);


    const headers = {
      "Authorization": token
    }

    if(!token) {

      return false
    }else{
      const response = await axios.get("http://localhost:3000/validate", {
        headers: headers
      })

      return response
    }
}

const LoginComponent = () => {



 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    async function connectUser(){

      console.log("username: " + username);
      console.log("PW: " + password);

      const response = await axios.post("http://localhost:3000/login", { 
        username : {username}, 
        password : {password}
      })
      console.log(response );
      localStorage.setItem("gf-token", response.data)
    }


   

  
    return (
    <>
    
    <h2>Tu veux jouer ? Connectes toi d'abord</h2>

    <form  > 
      
    <div className='form-control'> 
      
      
      <div className="form-group">
      <label htmlFor="username">Username</label>
      <input type="text" className="form-control" onChange={(event) => setUsername(event.target.value)} name="username"/>
       </div>
      


      <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} name='password'/>
      </div>
  
  
    <button type='submit' className='btn btn-primary' onClick={(e) => {e.preventDefault();  connectUser()   }}> Se connecter </button>

    </div>
  
  </form>
  </>

  )
}

export default LoginComponent