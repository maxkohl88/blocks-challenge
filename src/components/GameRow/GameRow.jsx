import React from 'react'

import { Cell } from '../Cell/Cell'

import './GameRow.css'

export const GameRow = ({ cells }) => {
  return (
    <div className="GameRow">
      {Object.keys(cells).map((cellId) => <Cell key={`Cell_${cellId}`} {...cells[cellId]}/>)}
    </div>
  )
}