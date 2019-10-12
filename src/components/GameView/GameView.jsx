import React from 'react'

import { GameRow } from '../GameRow/GameRow'

import './GameView.css'

const generateCells = (numCells) => {
  let cells = {}
  let tempCellCount = numCells
  let cellId = numCells - tempCellCount

  while (tempCellCount > 0) {
    cellId = numCells - tempCellCount

    cells[cellId] = {
      id: cellId,
      type: 'basic-tile'
    }

    tempCellCount --
  }

  return cells
}

const generateGame = ({ numRows, cellsPerRow }) => {
  let rows = {}
  let tempRowCount = numRows
  let rowId = numRows - tempRowCount

  while (tempRowCount > 0) {
    rowId = numRows - tempRowCount

    rows[rowId] = {
      id: rowId,
      cells: generateCells(cellsPerRow)
    }

    tempRowCount --
  }

  return { rows }
}

const withPlayer = ({ rows }) => ({ cellId }) => {
  const [ rowIndex, cellIndex ] = cellId.split('-')

  rows[rowIndex].cells[cellIndex] = {
    ...rows[rowIndex].cells[cellIndex],
    type: 'player'
  }


  return { rows }
}

const useArrowKeys = (updateGameState) => ({ code }) => {
  let rowDelta = 0
  let columnDelta = 0

  switch (code) {
    case 'KeyW': {
      console.log('Move up')
      rowDelta = -1
      break
    }
    case 'KeyS': {
      console.log('Move down')
      rowDelta = 1
      break
    }
    case 'KeyA': {
      console.log('Move left')
      columnDelta = -1
      break
    }
    case 'KeyD': {
      console.log('Move right')
      columnDelta = 1
      break
    }
    default: {
      console.log('Key has no effect')
      break
    }
  }

  updateGameState(({ rows, currentPlayerCell }) => {
    const [ prevRow, prevCol ] = currentPlayerCell.split('-')

    const nextRow = parseInt(prevRow) + rowDelta
    const nextCol = parseInt(prevCol) + columnDelta

    const newRows = {
      ...rows,
      [nextRow]: {
        ...rows[nextRow],
        cells: {
          ...rows[nextRow].cells,
          [nextCol]: {
            ...rows[nextRow].cells[nextCol],
            type: 'player'
          }
        }
      },
      [parseInt(prevRow)]: {
        ...rows[parseInt(prevRow)],
        cells: {
          ...rows[parseInt(prevRow)].cells,
          [parseInt(prevCol)]: {
            ...rows[parseInt(prevRow)].cells[parseInt(prevCol)],
            type: 'basic-tile'
          }
        }
      },
    }

    return {
      rows: newRows,
      currentPlayerCell: `${nextRow}-${nextCol}`
    }
  })
}

export const GameView = ({ gameConfig }) => {
  const { rows } = withPlayer(generateGame(gameConfig))({ cellId: '8-8' })

  const [ gameState, updateGameState ] = React.useState({ rows, currentPlayerCell: '8-8' })

  // React.useEffect(() => {
  window.addEventListener('keydown', useArrowKeys(updateGameState))
  // }, [])

  console.log(gameState)

  return (
    <div className="GameView">
      {
        Object.keys(gameState.rows).map((rowId) => (
          <GameRow key={`GameRow_${rowId}`} cells={gameState.rows[rowId].cells} />
        ))
      }
    </div>
  )
}