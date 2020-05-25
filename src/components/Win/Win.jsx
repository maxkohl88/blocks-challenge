import React from 'react'

import { useGame } from '../../providers/GameProvider/GameProvider'

import './Win.css'

export const Win = () => {
  const { win } = useGame()

  return (
    <div className='win'>
      { win && <span>You Win!</span> }
    </div>
  )
}
