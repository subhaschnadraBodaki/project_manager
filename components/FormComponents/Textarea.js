import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <div className="grid grid-cols-6  md:grid-cols-6 w-full" >
      <label htmlFor={name}  className="labelText">{label}</label>
      <Field as='textarea' className="inputFieldText" id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea