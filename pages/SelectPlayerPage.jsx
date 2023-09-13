import React, { useState } from 'react'
import SelectPageComponent from '../components/SelectPlayerComponent'
import { IsUserLoggedIn } from '../components/LoginComponent'
import { useNavigate } from "react-router-dom";


const SelectPlayerPage = () => {

  const [userLogged, setUserLogged ] = useState(false)
  const navigate = useNavigate()

  async function checkUser(){

    const user = await IsUserLoggedIn()
   // console.log(user);
    if(user.data === true){
      setUserLogged(true)
    }else{
      navigate("/login")
    }

  } 

  checkUser()

  return (
    <>
      <h1>Choisis ton personanage</h1>

   <SelectPageComponent></SelectPageComponent>


   <h3> Tu ne trouves pas le tien ? Alors Commence-en nouveau </h3>
    <button className='btn btn-primary'>Créer un personnage</button>

   </>
  )
}

export default SelectPlayerPage