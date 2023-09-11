import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>

        <h1>GameFight</h1>


        <Link to={"/select-player"}> Jouer </Link>

    </div>
  )
}

export default HomePage