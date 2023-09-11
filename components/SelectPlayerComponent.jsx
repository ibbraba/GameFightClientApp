import React, { useState } from 'react'
import data from '../utils/demo_data.json'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SelectPlayerComponent = () => {

    const [caracters, setCaracters] = useState(data)

    async function getCaracters(){

      const response = axios.get("http://localhost:3000/caracter")
      console.log(response);
    }

    getCaracters()


  return (
    <div> 
        {caracters.map( caracter => 
            
            
      <div key={caracter.id} className="player-card P1-card">
      <img className="card-img-top" src={caracter.picture} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{caracter.name}</h5>
          <p className="card-text"> caracter</p>
        </div>
        <ul className="list-group list-group-flush player-action">
          <li className="list-group-item">{caracter.defense} Defense</li>
          <li className="list-group-item">{caracter.speed} Vitesse</li>
          <li className="list-group-item">{caracter.strenght} Force</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
    </div>
            
            )}

    <Link to="/game" className='btn btn-primary'> Jouer </Link>

    </div>

  )
}

export default SelectPlayerComponent