import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
  useEffect
} from 'react'

import {
  UPDATE_PLAYER_LOCATION,
  START_GAME,
  END_GAME,
  RESET_GAME,
  UPDATE_GAME_TIME
} from '../../actions/GameActions'

import { initialGameState } from './config'

import { GameReducer } from '../../reducers/GameReducer/GameReducer'

const initialGameContext = {
  inProgress: false,
  win: false,
  rows: []
}

const GameContext = createContext(initialGameContext)

let timerId = undefined

export const GameProvider = ({ children }) => {
  const [ gameState, dispatch ] = useReducer(GameReducer, initialGameState)

  // clock control
  useEffect(() => {
    if (gameState.inProgress) {
      timerId = setTimeout(() => {
        dispatch({
          type: UPDATE_GAME_TIME,
          timeLeft: gameState.timeLeft - 1
        })
      }, 1000)
    } else {
      clearTimeout(timerId)
    }
  }, [gameState.inProgress, gameState.timeLeft])

  const startGame = useCallback(() => {
    dispatch({
      type: RESET_GAME,
      state: initialGameState
    })

    dispatch({
      type: START_GAME
    })
  }, [])

  const endGame = ({ win }) => {
    dispatch({
      type: END_GAME,
      win
    })
  }

  const updatePlayerLocation = (xDelta, yDelta) => {
    dispatch({
      type: UPDATE_PLAYER_LOCATION,
      xDelta,
      yDelta
    })
  }

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
