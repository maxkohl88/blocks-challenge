import React, { useState, useEffect } from 'react'

import { useGame } from '../../providers/GameProvider/GameProvider'

import './Timer.css'

export const Timer = ({ initialSeconds }) => {
  const [ seconds, updateSeconds ] = useState(initialSeconds)
  const { inProgress } = useGame()

  useEffect(() => {
    if (inProgress) {
      setTimeout(() => {
        updateSeconds(seconds - 1)
      }, 1000)
    }
  }, [seconds, inProgress])

  return (
    <div className='timer'>
      {seconds}
    </div>
  )
}
