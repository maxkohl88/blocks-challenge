import React from 'react'

import { useGame } from '../../providers/GameProvider/GameProvider'

import './StartButton.css'

export const StartButton = () => {
  const { inProgress, startGame } = useGame()

  return (
    !inProgress && <button className='startButton'onClick={startGame}>Start</button>
  )
}