import React, { useEffect, useState } from 'react'
import PlayerComponent from './PlayerComponent';
import { useParams } from 'react-router-dom';

import axios from 'axios';


const GameComponent = () => {


  const [caracters, setCaracters] = useState([])
  const [round, setRound] = useState(1)

  const [player1, setPlayer1] = useState(null)

  const [player2, setPlayer2] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(true)


  useEffect(() => {

    findPlayers()
    console.log(player1);
    console.log(player2);
  }, [])

/*
  useEffect(() => {
    console.log("Action triggerd");
  }, [player1.defense, player2.defense])
*/
  const { p1, p2 } = useParams()


  const findPlayers = async () => {
    
    const caracters = await getcaracters()

    setCaracters(caracters)

    const player1 = caracters.find(x => x._id == p1)
    setPlayer1(player1)



    const player2 = caracters.find(x => x._id == p2)
    setPlayer2(player2)
  
  }

  
  async function getcaracters() {
    
    const token = localStorage.getItem('gf-token')
      const headers = {
        "Authorization": token
      }
      // Add Token To request 
      const response =  await axios.get("http://localhost:3000/private/caracters", {headers : headers})
      console.log("GET caracters");
      return response.data
     
  }

  

  
  function endGame() {
    console.log("Game End");
  }

  function CheckIfAlive() {

    if (player1.health < 1) {
      console.log("P1 is dead, Victory P2");
  
      endGame()

    }

    if (player2.health < 1) {
      console.log("P2 is dead, Victory P1");
  
      endGame() 
    }

  }

  function P1_Attack() {
    const defense = player2.defense
    setPlayer2((prevState) => ({
      ...prevState,
      defense : defense-Math.floor(Math.random() * player1.strengh) }))
    
    console.log("Attack from P1 to P2");
    console.log("P2 Santé restante: " + player2.defense );
    //CheckIfAlive()
  }

  function P1_Heal(){
    const defense = player1.defense
    setPlayer1((prevState) => ({
      ...prevState,
      defense : defense + Math.floor(Math.random() * player1.defense/5) }))

    console.log("Healing P1");
  }

  function P2_Attack() {

    player2.health -= Math.floor(Math.random() * 11)
   // console.log("P2 Santé restante: " + player2.health );
    CheckIfAlive()

  }


  
/*
  for(let i=0; i<5; i++){
    
    //P1_Attack()
    //P2_Attack()
    console.log("Attack");
  }
*/
  return (
    <div className='gameboard'>

      {player1 &&
        <div className="player-card P1-card">
          <img className="card-img-top" src={player1.picture} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{player1.name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul className="list-group list-group-flush player-action">
          <li className="list-group-item">{player1.defense} Defense</li>
          <li className="list-group-item">{player1.speed} Vitesse</li>
          <li className="list-group-item">{player1.strengh} Force</li>
          <li className="list-group-item">{player1.stamina} Endurance</li>
        </ul>
        <div className="card-body">
          <button className="btn btn-secondary" href="#" onClick={P1_Attack} > Attaquer </button>
            <button href="#" className="btn btn-secondary" onClick={P1_Heal}>Soins </button>
          </div>
        </div>
      }
      {player2 &&
      <div className="player-card P2-card" >
      <img className="card-img-top" src={player2.picture} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{player2.name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        <ul className="list-group list-group-flush player-action">
          <li className="list-group-item">{player2.defense} Defense</li>
          <li className="list-group-item">{player2.speed} Vitesse</li>
          <li className="list-group-item">{player2.strengh} Force</li>
          <li className="list-group-item">{player2.stamina} Endurance</li>
        </ul>
         
      </div>
      }




    </div>
  )
}

export default GameComponent