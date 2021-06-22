


import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'


function Input (props) {
  const { label, name, placeholder, ...rest } = props
 
  return (
    <div   className='md:w-full grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5  mb-6 md:mb-0'>
      <label  htmlFor={name} className="label">{label}</label>
      <Field className="inputField" id={name} name={name} placeholder={placeholder} {...rest} autocomplete="off" />
      <ErrorMessage  component={TextError} name={name} />
    </div>
  )
}

export default Input