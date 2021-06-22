import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function CheckboxGroup (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className="mt-8  ">
      {/* <label className="label">{label}</label> */}
      <Field name={name}>
        {({ field }) => {
          return options.map(option => {
            return (
              <React.Fragment key={option.key}>
                <input className="h-4 w-4 border border-gray-300  "
                  type='checkbox'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  //  checked={field.value.includes(option.value)}
                  checked={field.value === option.value}
                />
                <label className= "mr-4 font-medium mb-0 text-gray-500  text-lg lg:text-lg  font-medium ml-2" htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
      </div>
  )
}

export default CheckboxGroup;