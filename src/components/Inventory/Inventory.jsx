import React from 'react'
import { useGame } from '../../providers/GameProvider/GameProvider'
import { Film } from '../Cells/Film/Film'

import './Inventory.css'

export const Inventory = () => {
  const { inventory } = useGame()

  return (
    <div className='inventory'>
      {inventory.map((item, i) => {
        return (
          <div key={i} className='inventory-item'>
            {item.type === 'film' && (<Film />)}
          </div>
        )
      })}
    </div>
  )
}
