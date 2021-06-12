import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <div >
      <label htmlFor={name}  className="block   tracking-wide text-gray-700   text-sm lg:text-base  font-medium mb-1">{label}</label>
      <Field as='textarea' className="appearance-none block    text-gray-700 border border-gray-300   shadow-xs  rounded-sm py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-800" id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea