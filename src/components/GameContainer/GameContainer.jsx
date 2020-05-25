import React from 'react'

import { GameView } from '../GameView/GameView'
import { StatusView } from '../StatusView/StatusView'

import { GameProvider } from '../../providers/GameProvider/GameProvider'

import './GameContainer.css'

export const GameContainer = () => {
  return (
    <GameProvider>
      <div className="GameContainer">
        <GameView />
        <StatusView />
      </div>
    </GameProvider>
  )
}
