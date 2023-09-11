import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from '../pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SelectPlayerPage from '../pages/SelectPlayerPage'
import ScorePage from '../pages/ScorePage'
import GamePage from '../pages/GamePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>

        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path="/select-player" element={<SelectPlayerPage></SelectPlayerPage>}></Route>
        <Route path="/score" element={<ScorePage></ScorePage>}></Route>
        <Route path="/game" element={<GamePage></GamePage>}></Route> 
      </Routes>


     
    </>
  )
}

export default App
