import React from 'react'

import { GameView } from '../GameView/GameView'
import { StatusView } from '../StatusView/StatusView'

import './GameContainer.css'

const defaultConfig = {
  numRows: 15,
  cellsPerRow: 15
}

export const GameContainer = () => {
  return (
    <div className="GameContainer">
      <GameView gameConfig={defaultConfig} />
      <StatusView />
    </div>
  )
}