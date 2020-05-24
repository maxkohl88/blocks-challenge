import React, {
  createContext,
  useReducer,
  useCallback,
  useContext
} from 'react'

import {
  UPDATE_PLAYER_LOCATION,
  START_GAME,
  END_GAME
} from '../../actions/GameActions'

import { initialGameState } from '../../components/GameView/config'

import { GameReducer } from '../../reducers/GameReducer/GameReducer'

const initialGameContext = {
  inProgress: false,
  win: false,
  rows: []
}

const GameContext = createContext(initialGameContext)

export const GameProvider = ({ children }) => {
  const [ gameState, dispatch ] = useReducer(GameReducer, initialGameState)

  const startGame = useCallback(() => {
    dispatch({
      type: START_GAME
    })
  }, [dispatch])

  const endGame = useCallback(({ win }) => {
    dispatch({
      type: END_GAME,
      win
    })
  })

  const updatePlayerLocation = useCallback((xDelta, yDelta) => {
    dispatch({
      type: UPDATE_PLAYER_LOCATION,
      xDelta,
      yDelta
    })
  })

  const value = {
    ...gameState,
    startGame,
    endGame,
    updatePlayerLocation
  }

  console.log(value)

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const GameConsumer = ({ children }) => {
  return (
    <GameContext.Consumer>
      {context => children(context)}
    </GameContext.Consumer>
  )
}

export const useGame = () => useContext(GameContext)
