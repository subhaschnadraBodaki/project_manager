


import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'


function Input (props) {
  const { label, name, ...rest } = props
 
  return (
    <div   className='w-full  px-3 mb-6 md:mb-0'>
      <label  htmlFor={name} className="block   tracking-wide text-gray-700   text-sm lg:text-base  font-medium mb-1">{label}</label>
      <Field className="appearance-none block  md:mb-0  text-gray-700 border border-gray-300   shadow-xs w-full rounded-sm py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-800" id={name} name={name} {...rest} autocomplete="off" />
      <ErrorMessage  component={TextError} name={name} />
    </div>
  )
}

export default Input