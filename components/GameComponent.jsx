import React, { useState } from 'react'
import PlayerComponent from './PlayerComponent';


const GameComponent = () => {

  const [round, setRound] = useState(1)
  const [player1, setPlayer1] = useState({
    "name" : null, 
    "health" : 100, 
    "isAlive" : true

  })

  const [player2, setPlayer2] = useState ({
    "name" : "IA", 
    "health" : 100, 
    "isAlive" : true
  })
  
  


  function endGame() {
    console.log("Game End");
  }

  function CheckIfAlive() {

    if (player1.health < 1) {
      console.log("P1 is dead, Victory P2");
      setPlayer1(player1.isAlive = false)
      endGame()

    }

    if (player2.health < 1) {
      console.log("P2 is dead, Victory P1");
      setPlayer2(player2.isAlive = false)
      endGame() 
    }

  }

  function P1_Attack() {

    setPlayer1(player1.health-= Math.floor(Math.random() * 11))
    console.log("P1 Santé restante: " + player1.health );
    CheckIfAlive()
  }


  function P2_Attack() {

    setPlayer2(player2.health -= Math.floor(Math.random() * 11))
    console.log("P2 Santé restante: " + player2.health );
    CheckIfAlive()

  }

  while(player1.isAlive && player2.isAlive ){
    
    P1_Attack()
    P2_Attack()

  }

  return (
    <div className='gameboard'>


      <div className="player-card P1-card">
        <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYWrRRLBgztSbwpzR8-kujdJGnS4aiIeCcg&usqp=CAU" alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul className="list-group list-group-flush player-action">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
      </div>


      <div className="player-card P2-card" >
        <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn49YO-6bSlei9seIkgG_VewQ1VQvzGugP5w&usqp=CAU" alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul className="list-group list-group-flush player-action">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
      </div>




    </div>
  )
}

export default GameComponent