import React from 'react'

import { Timer } from '../Timer/Timer'
import { StartButton } from '../StartButton/StartButton'
import { Win } from '../Win/Win'

import './StatusView.css'

export const StatusView = () => {
  return (
    <div className="StatusView">
      <Timer initialSeconds={175}/>
      <StartButton />
      <Win />
    </div>
  )
}