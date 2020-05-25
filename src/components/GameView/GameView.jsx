import React from 'react'

import { GameRow } from '../GameRow/GameRow'

import { useGame } from '../../providers/GameProvider/GameProvider'
import { useKeyboard } from '../../hooks/useKeyboard/useKeyboard'

import './GameView.css'


export const GameView = () => {
  const { updatePlayerLocation, rows } = useGame()

  useKeyboard({ handleKeyChange: updatePlayerLocation })

  return (
    <div className="GameView">
      {
        Object.keys(rows).map((rowId) => (
          <GameRow key={`GameRow_${rowId}`} cells={rows[rowId].cells} />
        ))
      }
    </div>
  )
}
