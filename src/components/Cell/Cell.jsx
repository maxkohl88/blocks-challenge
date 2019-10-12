import React from 'react'

import './Cell.css'

export const Cell = ({ type }) => {
  const compClassName = [
    "Cell",
    type
  ].join(' ')

  return (
    <div className={compClassName}></div>
  )
}