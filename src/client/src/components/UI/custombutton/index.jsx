import React from 'react'

const CustomButton = ({ value, name, disabled, onClick }) => (
  <div className="text-center font-bold text-white text-1xl mt-5">
    <button name={name} className='disabled:opacity-25 bg-purple-400 py-2 px-4 rounded-full' disabled={disabled} onClick={onClick}>
      {value}
    </button>
  </div>
)

export default CustomButton
