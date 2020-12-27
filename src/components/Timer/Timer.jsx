import React from 'react'

import { useGame } from '../../providers/GameProvider/GameProvider'

import './Timer.css'

export const Timer = () => {
  const { timeLeft } = useGame()

  return (
    <div className='timer'>
      {timeLeft}
    </div>
  )
}
