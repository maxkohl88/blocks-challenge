import React from 'react'

import { GameRow } from '../GameRow/GameRow'

import './GameView.css'

export const UPDATE_PLAYER_LOCATION = 'UPDATE_PLAYER_LOCATION'

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

  return rows
}

const withPlayer = (rows) => ({ cellId }) => {
  const [ rowIndex, cellIndex ] = cellId.split('-')

  rows[rowIndex].cells[cellIndex] = {
    ...rows[rowIndex].cells[cellIndex],
    type: 'player'
  }


  return rows
}

export const initialPlayerCellId = '8-8'
const gameConfig = {
  numRows: 15,
  cellsPerRow: 15
}

export const initialGameState = {
  rows:  withPlayer(generateGame(gameConfig))({ cellId: initialPlayerCellId }),
  currentPlayerCell: initialPlayerCellId
}

export function GameReducer (state, action) {
  switch (action.type) {
    case UPDATE_PLAYER_LOCATION: {
      const { xDelta, yDelta } = action
      const { currentPlayerCell, rows } = state

      const [ currentRow, currentCol ] = currentPlayerCell.split('-')

      const cellUpdates = [
        {
          rowId: parseInt(currentRow),
          colId: parseInt(currentCol),
          type: 'basic-tile'
        },
        {
          rowId: parseInt(currentRow) + yDelta,
          colId: parseInt(currentCol) + xDelta,
          type: 'player'
        }
      ]

      const updateBoard = (updates) => (updates.reduce((acc, { rowId, colId, type }) => {
        return {
          ...acc,
          [rowId]: {
            ...acc[rowId],
            cells: {
              ...acc[rowId].cells,
              [colId]: {
                ...acc[rowId].cells[colId],
                type
              }
            }
          }
        }
      }, { ...rows }))

      const updatedState = {
        ...state,
        rows: updateBoard(cellUpdates),
        currentPlayerCell: [(parseInt(currentRow) + yDelta), (parseInt(currentCol) + xDelta)].join('-')
      }

      console.log(updatedState)

      return updatedState
    }
    default: {
      throw new Error(`Action [${action.type}] not recognized by GameReducer`)
    }
  }
}

export const GameView = (props) => {
  const [ gameState, dispatch ] = React.useReducer(GameReducer, initialGameState)

  React.useEffect(() => {
    const updateGameState = (xDelta, yDelta) => {
      dispatch({
        type: UPDATE_PLAYER_LOCATION,
        xDelta,
        yDelta
      })
    }

    const handleKeyChange = ({ code }) => {
      let yDelta = 0
      let xDelta = 0

      switch (code) {
        case 'KeyW': {
          console.log('Move up')
          yDelta = -1
          break
        }
        case 'KeyS': {
          console.log('Move down')
          yDelta = 1
          break
        }
        case 'KeyA': {
          console.log('Move left')
          xDelta = -1
          break
        }
        case 'KeyD': {
          console.log('Move right')
          xDelta = 1
          break
        }
        default: {
          console.log('Key has no effect')
          break
        }
      }

      updateGameState(xDelta, yDelta)
    }

    window.addEventListener('keyup', handleKeyChange)

    return () => {
      window.removeEventListener('keyup', handleKeyChange)
    }
  }, [dispatch])

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