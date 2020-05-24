import {
  UPDATE_PLAYER_LOCATION,
  START_GAME,
  END_GAME
} from '../../actions/GameActions'

export function GameReducer (state, action) {
  switch (action.type) {
    case UPDATE_PLAYER_LOCATION: {
      const { xDelta, yDelta } = action
      const { currentPlayerCell, rows, config } = state

      const [ currentRow, currentCol ] = currentPlayerCell.split('-')

      const movesOverEdge = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        return ((currentRowNumeric + yDelta) >= config.numRows) ||
          ((currentColNumeric + xDelta) >= config.cellsPerRow) ||
          ((currentRowNumeric + yDelta) < 0) ||
          ((currentColNumeric + xDelta) < 0)
      }

      const movesIntoExit = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        const nextRowNumeric = currentRowNumeric + yDelta
        const nextColNumeric = currentColNumeric + xDelta

        const nextPlayerCell = [ nextRowNumeric, nextColNumeric ].join('-')

        return nextPlayerCell === '12-12'
      }

      if (movesOverEdge()) {
        return state
      }

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

      const isWin = movesIntoExit()

      const updatedState = {
        ...state,
        rows: updateBoard(cellUpdates),
        currentPlayerCell: [(parseInt(currentRow) + yDelta), (parseInt(currentCol) + xDelta)].join('-'),
        win: isWin,
        inProgress: !isWin
      }

      return updatedState
    }
    case START_GAME: {
      return { ...state, inProgress: true }
    }
    case END_GAME: {
      return { ...state, inProgress: false, win: action.win }
    }
    default: {
      throw new Error(`Action [${action.type}] not recognized by GameReducer`)
    }
  }
}