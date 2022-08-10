import React from 'react'

const Container = ({ children }) => {
  return (
    <div className='container pt-10 w-3/5 h-full bg-purple-100'>
      {children}
    </div>
  )
}

export default Container
