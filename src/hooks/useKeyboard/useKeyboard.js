import React from 'react'

export const useKeyboard = ({ handleKeyChange }) => {
  React.useEffect(() => {
    const onKeyChange = ({ code }) => {
      let yDelta = 0
      let xDelta = 0

      switch (code) {
        case 'KeyW': {
          yDelta = -1
          break
        }
        case 'KeyS': {
          yDelta = 1
          break
        }
        case 'KeyA': {
          xDelta = -1
          break
        }
        case 'KeyD': {
          xDelta = 1
          break
        }
        default: {
          console.log('Key has no effect')
          break
        }
      }

      handleKeyChange(xDelta, yDelta)
    }

    window.addEventListener('keypress', onKeyChange)

    return () => {
      window.removeEventListener('keypress', onKeyChange)
    }
  }, [])
}