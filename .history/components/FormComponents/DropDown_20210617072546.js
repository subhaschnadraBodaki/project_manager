import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className='w-full  px-3 mb-6 md:mb-0'>
      <label htmlFor={name}  className="label">{label}</label>
      <Field as='select' id={name} name={name} className=" text-gray-700 border border-gray-300   ring-1 ring-black ring-opacity-5 w-full rounded-sm py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-800" {...rest}>
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