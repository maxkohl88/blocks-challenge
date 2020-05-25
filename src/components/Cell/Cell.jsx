import React from 'react'

import { cellMap } from '../Cells/cellMap'

import './Cell.css'

export const Cell = React.memo(({ type }) => {
  const CellContent = cellMap[type]

  return (
    <div className='cell'>
      <CellContent />
    </div>
  )
})