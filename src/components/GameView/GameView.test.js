import React from 'react'
import {
  initialPlayerCellId,
  GameReducer,
  initialGameState,
  UPDATE_PLAYER_LOCATION } from './GameView'

describe('GameReducer', () => {
  it('moves the player right by one', () => {
    const xDelta = 1
    const yDelta = 0

    const testAction = {
      type: UPDATE_PLAYER_LOCATION,
      xDelta,
      yDelta
    }

    const [ currentRow, currentCol ] = initialPlayerCellId.split('-')

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
    }, { ...initialGameState.rows }))

    const expected = {
      ...initialGameState,
      rows: updateBoard(cellUpdates)
    }

    expect(expected).toEqual(GameReducer(initialGameState, testAction))
  })
})
