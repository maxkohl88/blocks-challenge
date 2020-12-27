import React from 'react'

import { Timer } from '../Timer/Timer'
import { StartButton } from '../StartButton/StartButton'
import { Win } from '../Win/Win'
import { Inventory } from '../Inventory/Inventory'
import { StatusDisplay } from '../StatusDisplay/StatusDisplay'

import './StatusView.css'
import { useGame } from '../../providers/GameProvider/GameProvider'

export const StatusView = () => {
  const {
    timeLeft,
    currentChipCount,
    level
  } = useGame()

  return (
    <div className="StatusView">
      <StatusDisplay label='LEVEL' status={level} />
      <StatusDisplay label='TIME' status={timeLeft} />
      <StatusDisplay label='CHIPS' status={currentChipCount} />
      {/* <Timer initialSeconds={175}/> */}
      {/* <Win /> */}
      <Inventory />
      {/* <StartButton /> */}
    </div>
  )
}
