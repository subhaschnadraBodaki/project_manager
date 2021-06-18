import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <div className="grid w-full" >
      <label htmlFor={name}  className="label">{label}</label>
      <Field as='textarea' className="appearance-none block grid md:h-full  text-gray-700 border border-gray-300  ring-1 ring-black ring-opacity-5  rounded-sm py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-800" id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea