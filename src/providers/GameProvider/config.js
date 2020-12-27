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

const withWalls = ({ wallIds }) => (rows) => {
  for (let rowId of Object.keys(rows)) {
    const row = rows[rowId]

    for (let cellId of Object.keys(row.cells)) {
      const coordinateId = `${rowId}-${cellId}`

      if (wallIds.includes(coordinateId)) {
        rows[rowId].cells[cellId] = {
          ...rows[rowId].cells[cellId],
          type: 'wall'
        }
      }
    }
  }

  return rows
}

const withFilm = ({ cellId }) => (rows) => {
  const [ rowIndex, cellIndex ] = cellId.split('-')

  rows[rowIndex].cells[cellIndex] = {
    ...rows[rowIndex].cells[cellIndex],
    type: 'film'
  }


  return rows
}

const withChips = ({ chipIds }) => (rows) => {
  for (let rowId of Object.keys(rows)) {
    const row = rows[rowId]

    for (let cellId of Object.keys(row.cells)) {
      const coordinateId = `${rowId}-${cellId}`

      if (chipIds.includes(coordinateId)) {
        rows[rowId].cells[cellId] = {
          ...rows[rowId].cells[cellId],
          type: 'chip'
        }
      }
    }
  }

  return rows
}

export const initialPlayerCellId = '8-8'
export const initialExitCellId = '12-12'
export const initialWallIds = [
  '7-4',
  '7-5',
  '7-6',
  '7-7',
  '7-8',
  '7-9',
  '8-4',
  '8-9',
  '9-4',
  '9-9',
  '10-4',
  '10-9',
  '11-4',
  '11-9',
  '11-10',
  '11-11',
  '11-12',
  '11-13',
  '12-4',
  '12-13',
  '13-4',
  '13-5',
  '13-6',
  '13-7',
  '13-8',
  '13-9',
  '13-10',
  '13-11',
  '13-12',
  '13-13'
]

const initialChipIds = [
  '11-8',
  '12-6'
]

const initialFilmCellId = '10-5'

const gameConfig = {
  numRows: 15,
  cellsPerRow: 15
}

const pipeline = [
  withPlayer({ cellId: initialPlayerCellId }),
  withExit({ cellId: initialExitCellId }),
  withWalls({ wallIds: initialWallIds }),
  withFilm({ cellId: initialFilmCellId }),
  withChips({ chipIds: initialChipIds })
]

const generateRows = (baseRows) => pipeline.reduce((acc, transform) => {
  return transform(acc)
}, baseRows)

// Level One
export const initialGameState = {
  rows: generateRows(generateGame(gameConfig)),
  currentPlayerCell: initialPlayerCellId,
  config: gameConfig,
  initialChipCount: initialChipIds.length,
  currentChipCount: initialChipIds.length,
  level: 1,
  inProgress: false,
  win: false,
  canMove: true,
  timeLeft: 180,
  inventory: [{}, {}, {}, {}, {}, {}, {}, {}]
}
