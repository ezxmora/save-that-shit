import React from 'react'

const CustomInput = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="mx-auto w-4/5">
    {label && <label htmlFor='input-field'>{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className='rounded w-full'
      placeholder={placeholder}
      onChange={onChange}
      autoComplete='off'
    />
  </div>
)

export default CustomInput
