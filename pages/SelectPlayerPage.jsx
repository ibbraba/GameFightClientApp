import React from 'react'
import SelectPageComponent from '../components/SelectPlayerComponent'

const SelectPlayerPage = () => {
  return (
    <>
      <h1>Choisis ton personanage</h1>

   <SelectPageComponent></SelectPageComponent>


   <h3> Tu ne trouves pas le tien ? Alors Commence-en nouveau </h3>
    <button>Créer un personnage</button>

   </>
  )
}

export default SelectPlayerPage