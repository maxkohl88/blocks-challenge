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

const withPlayer = ({ cellId }) => (rows) => {
  const [ rowIndex, cellIndex ] = cellId.split('-')

  rows[rowIndex].cells[cellIndex] = {
    ...rows[rowIndex].cells[cellIndex],
    type: 'player'
  }


  return rows
}

const withExit = ({ cellId }) => (rows) => {
  const [ rowIndex, cellIndex ] = cellId.split('-')

  rows[rowIndex].cells[cellIndex] = {
    ...rows[rowIndex].cells[cellIndex],
    type: 'exit'
  }


  return rows
}

export const initialPlayerCellId = '8-8'
export const initialExitCellId = '12-12'
const gameConfig = {
  numRows: 15,
  cellsPerRow: 15
}

const pipeline = [
  withPlayer({ cellId: initialPlayerCellId }),
  withExit({ cellId: initialExitCellId })
]

const generateRows = (baseRows) => pipeline.reduce((acc, transform) => {
  return transform(acc)
}, baseRows)

export const initialGameState = {
  rows: generateRows(generateGame(gameConfig)),
  currentPlayerCell: initialPlayerCellId,
  config: gameConfig,
  inProgress: false,
  win: false
}
