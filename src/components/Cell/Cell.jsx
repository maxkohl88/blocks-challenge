import React from 'react'

import './Cell.css'

export const Cell = ({ type }) => {
  const compClassName = [
    "Cell",
    type
  ].join(' ')

  React.useEffect(() => {
    console.log(`type changed - ${type}`)
  }, [type])

  return (
    <div className={compClassName}></div>
  )
}