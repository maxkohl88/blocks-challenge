import {
  UPDATE_PLAYER_LOCATION,
  START_GAME,
  END_GAME,
  RESET_GAME,
  UPDATE_GAME_TIME
} from '../../actions/GameActions'

export function GameReducer (state, action) {
  switch (action.type) {
    case UPDATE_PLAYER_LOCATION: {
      const {
        currentPlayerCell,
        rows,
        config,
        canMove,
        inventory,
        currentChipCount
      } = state

      // SS 1: return state if cannot move
      if (!canMove) {
        return state
      }

      const { xDelta, yDelta } = action

      const [ currentRow, currentCol ] = currentPlayerCell.split('-')

      // edge check (future: barrier check. walls, edge, etc)
      // for edge: make outer edge of map all walls. so check becomes
      // movesIntoWall instead of over edge. simpler/more reusable
      const movesOverEdge = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        return ((currentRowNumeric + yDelta) >= config.numRows) ||
          ((currentColNumeric + xDelta) >= config.cellsPerRow) ||
          ((currentRowNumeric + yDelta) < 0) ||
          ((currentColNumeric + xDelta) < 0)
      }

      // SS 2: return state if move is over edge
      if (movesOverEdge()) {
        return state
      }

      const movesIntoWall = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        const nextRowNumeric = currentRowNumeric + yDelta
        const nextColNumeric = currentColNumeric + xDelta

        const nextPlayerCell = rows[nextRowNumeric].cells[nextColNumeric]

        return nextPlayerCell.type === 'wall'
      }

      // SS 3: return state if moves into wall
      if (movesIntoWall()) {
        return state
      }


      const movesIntoFilm = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        const nextRowNumeric = currentRowNumeric + yDelta
        const nextColNumeric = currentColNumeric + xDelta

        const nextPlayerCell = rows[nextRowNumeric].cells[nextColNumeric]

        return nextPlayerCell.type === 'film'
      }

      if (movesIntoFilm() && currentChipCount != 0) {
        return state
      }

      const movesIntoChip = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        const nextRowNumeric = currentRowNumeric + yDelta
        const nextColNumeric = currentColNumeric + xDelta

        const nextPlayerCell = rows[nextRowNumeric].cells[nextColNumeric]

        return nextPlayerCell.type === 'chip' ? nextPlayerCell : false
      }

      const movesIntoExit = () => {
        const currentRowNumeric = parseInt(currentRow)
        const currentColNumeric = parseInt(currentCol)

        const nextRowNumeric = currentRowNumeric + yDelta
        const nextColNumeric = currentColNumeric + xDelta

        const nextPlayerCell = [ nextRowNumeric, nextColNumeric ].join('-')

        return nextPlayerCell === '12-12'
      }

      const hasFilm = () => inventory.some((inv) => inv.type === 'film')

      // SS 4: if moving into exit and film not collected, return state
      if (movesIntoExit() && !hasFilm()) {
        return state
      }

      // switch current cell to basic tile (future will need to look at next move map in case enemy, modifier cell,etc)
      // player movement update
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

      if (movesIntoFilm()) {
        cellUpdates.unshift({
          rowId: 10,
          colId: 5,
          type: 'basic-tile'
        })

        inventory[0] = { type: 'film' }
      }

      const collectedChipCell = movesIntoChip()
      let nextChipCount = currentChipCount

      if (collectedChipCell) {
        cellUpdates.unshift({
          rowId: parseInt(currentRow) + yDelta, // set chip to basic tile
          colId: parseInt(currentCol) + xDelta, // set chip to basic tile
          type: 'basic-tile'
        })

        nextChipCount = nextChipCount - 1
      }

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
        currentChipCount: nextChipCount,
        win: isWin,
        inProgress: !isWin,
        canMove: !isWin
      }

      return updatedState

    }
    case START_GAME: {
      return { ...state, inProgress: true }
    }
    case END_GAME: {
      return { ...state, inProgress: false, win: action.win }
    }
    case RESET_GAME: {
      return { ...action.state, inventory: [{}, {}, {}, {}, {}, {}, {}, {}] }
    }
    case UPDATE_GAME_TIME: {
      return { ...state, timeLeft: action.timeLeft, timerId: action.timerId }
    }
    default: {
      throw new Error(`Action [${action.type}] not recognized by GameReducer`)
    }
  }
}
