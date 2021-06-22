import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='w-full grid grid-cols-5 mb-6 md:mb-0'>
      <label htmlFor={name}  className="label">{label}</label>
      <Field as='select' id={name} name={name} className=" inputField" {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Select