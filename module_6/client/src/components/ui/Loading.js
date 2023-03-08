import React from 'react'

const Loading = ({text = 'Loading...'}) => {
  return (
    <div className="col-span-12">{text}</div>
  )
}

export default Loading