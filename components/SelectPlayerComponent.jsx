import React, { useEffect, useState } from 'react'
import data from '../utils/demo_data.json'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SelectPlayerComponent = () => {

    const [caracters, setCaracters] = useState([])
    const [selectedCaracter, setSelectedCaracter] = useState(null)
    const [IACaracter, setIACaracter] = useState(null)

    const navigate = useNavigate();

    useEffect( () => { 
      getCaracters()
    }, [])

    useEffect( () => {
      console.log("IA player Updated");
    }, [IACaracter])

    async function getCaracters(){
      const token = localStorage.getItem('gf-token')
      const headers = {
        "Authorization": token
      }
      // Add Token To request 
      const response =  await axios.get("http://localhost:3000/private/caracters", {headers : headers})
      setCaracters(response.data)
      //console.log(response);
    }

    const selectIACaracter =  () => {
      
      const copyCaracters = [...caracters]
      const index =  copyCaracters.indexOf(selectedCaracter); 
      copyCaracters.splice(index, 1)
    //  console.log("Index :" + index);
    //  console.log("copyCaracters");
      console.log(copyCaracters);
      

      var randomCaracter = copyCaracters[Math.floor(Math.random()*copyCaracters.length)];
    //  console.log("IA pick : ");
      
      setIACaracter(randomCaracter)
    //  console.log(IACaracter);
     

      
    }

    function navigateToGame(){
      
      console.log("Navigating to game");
      console.log("Selected by player : "  + selectedCaracter.name);
      console.log("Selected by IA: " + IACaracter.name);

   
      navigate(`/game/${selectedCaracter._id}/${IACaracter._id}`)

    }

    /*
    function selectIAcaracter(){

     
    }
    */


    let url = "to={`/game/${selectedCaracter._id}/${IACaracter._id}"


  return (
    <>
      <div> <p> Personnage choisi : {selectedCaracter ? selectedCaracter.name : "Aucun" }</p></div>

    <div className='caracters-display'> 
        {caracters && caracters.map( caracter => 
            
            
      <div key={caracter.id} className="player-card P1-card">
      <img className="card-img-top" src={caracter.picture} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{caracter.name}</h5>
          <p className="card-text"> caracter</p>
        </div>
        <ul className="list-group list-group-flush player-action">
          <li className="list-group-item">{caracter.defense} Defense</li>
          <li className="list-group-item">{caracter.speed} Vitesse</li>
          <li className="list-group-item">{caracter.strengh} Force</li>
          <li className="list-group-item">{caracter.stamina} Endurance</li>
        </ul>
        <div className="card-body">
          <button className="btn btn-secondary"  onClick={(e) => {
            e.preventDefault; 
            setSelectedCaracter(caracter)
            selectIACaracter()
            
           

            }}>Choisir</button>
         
        </div>
    </div>
            
            )}


    </div>
        {console.log(selectedCaracter)}
      
         {  selectedCaracter !== null ?
            <button className='btn btn-primary' onClick={
              (e) => {
              e.preventDefault()
            
              navigateToGame()
            }}>  Jouer </button> : null } 
    </>

  )
}

export default SelectPlayerComponent