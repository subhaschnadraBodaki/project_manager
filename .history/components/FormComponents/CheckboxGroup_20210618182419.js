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
                <input className="h-3 w-3 "
                  type='checkbox'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  //  checked={field.value.includes(option.value)}
                  checked={field.value === option.value}
                />
                <label className= "mr-4 font-medium mb-0 text-gray-500  text-sm lg:text-base  font-medium ml-1" htmlFor={option.value}>{option.key}</label>
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