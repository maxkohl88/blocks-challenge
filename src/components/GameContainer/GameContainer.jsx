import React, { createContext, useState } from 'react'

import { GameView } from '../GameView/GameView'
import { StatusView } from '../StatusView/StatusView'

import { GameProvider } from '../../providers/GameProvider/GameProvider'

import './GameContainer.css'

const defaultConfig = {
  numRows: 15,
  cellsPerRow: 15
}

const initialGameContext = {
  inProgress: false,
  win: false
}

export const GameContainer = () => {
  const [ gameState, updateGameState ] = useState(initialGameContext)

  const providerValue = {
    ...gameState,
    updateGameState
  }

  return (
    <GameProvider>
      <div className="GameContainer">
        <GameView gameConfig={defaultConfig} />
        <StatusView />
      </div>
    </GameProvider>
  )
}