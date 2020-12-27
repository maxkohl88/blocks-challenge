import React from 'react'

import './StatusDisplay.css'

export const StatusDisplay = ({ label, status }) => {

  return (
    <div className='StatusDisplay'>
      <div className="StatusDisplay__Label">
        {label}
      </div>
      <div className="StatusDisplay__Status">
        {status}
      </div>
    </div>
  )
}
