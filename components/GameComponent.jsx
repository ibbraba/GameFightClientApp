import React, { useEffect, useState } from 'react'
import PlayerComponent from './PlayerComponent';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';


const GameComponent = () => {

  const navigate = useNavigate()
  const [caracters, setCaracters] = useState([])
  const [round, setRound] = useState(1)

  const [player1, setPlayer1] = useState(null)

  const [player2, setPlayer2] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameOn, setGameOn] = useState(true)
  const [winner, setWinner] = useState(null)

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
    
    try {
      const token = localStorage.getItem('gf-token')
      const headers = {
        "Authorization": token
      }
      // Add Token To request 
      const response =  await axios.get("http://localhost:3000/private/caracters", {headers : headers})
      console.log("GET caracters");
      return response.data
      
    } catch (error) {
       console.log(error)
       navigate("/")
    }
   
     
  }


  function CheckGameState() {

    console.log("Gamestate: P1 health " + player1.defense + " ,P2 health " + player2.defense );


    if(player1.defense <= 0){
      console.log("Game over, victory P2");
      setGameOn(false)
      setWinner(player2)
      console.log(winner);
      return
    }

    if(player2.defense <= 0){
      console.log("Game over, victory P1");
      setGameOn(false)
      setWinner(player1)
      return
    }

  }

  function P1_Attack() {
    

   
    const defense = player2.defense
    const defenseAfterAttack = defense-Math.floor(Math.random() * player1.strengh )
    console.log("After Attack : " + defenseAfterAttack);

    setPlayer2((prevState) => ({
      ...prevState,
      defense : defenseAfterAttack > 0 ? defenseAfterAttack : 0  }))
    
      console.log("After setState : " + player2.defense);

   // console.log("Attack from P1 to P2");
   // console.log("P2 Santé restante: " + player2.defense );
    CheckGameState()
    IATurn()
    CheckGameState()
    //CheckIfAlive()
  }

  function P1_Heal(){
   
    const defense = player1.defense
    setPlayer1((prevState) => ({
      ...prevState,
      defense : defense + Math.floor(Math.random() * player1.defense/8 )}))

      CheckGameState()
    //console.log("Healing P1");
    //console.log("P1 Santé restante: " + player1.defense);
    
    IATurn()
    CheckGameState()
  }


  function IATurn(){
 
    CheckGameState()
    setTimeout(() => {
      console.log('IA Turn');
      if(player2.defense < player1.strengh){
        P2_Heal()
      }else{
        P2_Attack()
      } 
     

    }, 1500);

   
     
  }

  function P2_Attack() {

    console.log("Attack P2");

    const defense = player1.defense
    const defenseAfterAttck = defense-Math.floor(Math.random() * player2.strengh )

    setPlayer1((prevState) => ({
      ...prevState,
      defense :  defenseAfterAttck   }))

      console.log("P2 GS");
      CheckGameState()
   // console.log("Attack from P2 to P1");
   // console.log("P1 Santé restante: " + player1.defense );


   

  }

  function P2_Heal(){

    const defense = player2.defense 
    console.log("p2 Def" + defense );

    setPlayer2((prevState) => ({
      ...prevState,
      defense : defense + Math.floor(Math.random() * player2.defense) }))
      CheckGameState()
   // console.log("Healing P2");


   


      
  }

  
/*
  for(let i=0; i<5; i++){
    
    //P1_Attack()
    //P2_Attack()
    console.log("Attack");
  }
*/
  return (
    <>
    <Link className='btn btn-primary' to={"/"}>Acceuil</Link>
    { gameOn &&

    <div className='gameboard'>

      {player1 &&
        <div className="player-card P1-card">
          <img className="card-img-top" src={player1.picture} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{player1.name}</h5>
            <p className="card-text">Joueur</p>
          </div>
          <ul className="list-group list-group-flush player-action">
          <li className="list-group-item">{player1.defense} Defense</li>
          <li className="list-group-item">{player1.speed} Vitesse</li>
          <li className="list-group-item">{player1.strengh} Force</li>
          <li className="list-group-item">{player1.stamina} Endurance</li>
        </ul>
        <div className="card-body">
          { playerTurn && <>
            <button className="btn btn-secondary" href="#" onClick={P1_Attack} > Attaquer </button>
            <button href="#" className="btn btn-secondary" onClick={P1_Heal}>Soins </button>
            </>
         }
       
          </div>
        </div>
      }
      {player2 &&
      <div className="player-card P2-card" >
      <img className="card-img-top" src={player2.picture} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{player2.name}</h5>
            <p className="card-text">IA</p>
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

    }



    {!gameOn &&
    
    <>
    
      <div>
          {winner === player1 && <h3> Victoire</h3>}
          {!winner === player2 && <h3> Defaite</h3>}

        <h5>
          Partie terminée
         </h5>  
        
        
        
      </div>
      <Link className='btn btn-primary' to={`/game/${p1}/${p2}`} > Rejouer </Link>
      <Link className='btn btn-primary' to={`/select-player`}>Choix du personnage</Link>
      <Link className='btn btn-primary' to={"/"}>Retour à l'acceuil</Link>
    </>

    }
    </>
  )
}

export default GameComponent