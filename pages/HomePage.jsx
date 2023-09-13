import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeComponent from '../components/HomeComponent'
import { IsUserLoggedIn } from '../components/LoginComponent'

const HomePage = () => {
 
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)   

   useEffect(() => {
       checkUserConnected()
     
    
   }, [isAuthenticated])
 
   async function checkUserConnected (){
     console.log("Checking User, res ...");
     const response = await IsUserLoggedIn();
     console.log(response);
     if(response.data === true){
      console.log("User is authenticated");
      setIsAuthenticated(true)
      console.log(isAuthenticated);
     } 
  }
   
 
  return (
    <div>

        <h1>GameFight</h1>


        <HomeComponent></HomeComponent>

        {isAuthenticated && <>
        
          <Link to={"/select-player"}> Jouer </Link>
          <Link to={"/logout"}>Se Deconnecter</Link>
        </> }
        

        {!isAuthenticated && <Link to={"/login"}> Connectes-toi et joue </Link>}

    </div>
  )
}

export default HomePage