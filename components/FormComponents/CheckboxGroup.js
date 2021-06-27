import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function CheckboxGroup (props) {
  const { label, name, options, ...rest } = props
  return (
    <div className="grid grid-cols-5 md:grid-cols-5 ">
      {/* <label className="label">{label}</label> */}
       
      <Field name={name}>
        {({ field }) => {
          return options.map(option => {
            return (
              <React.Fragment key={option.key}>
                 <label className= "label col-start-1 col-span-2  " htmlFor={option.key}>{option.key}</label>
                <input className="h-4 w-4 border col-start-3 col-span-3  border-gray-400 mt-1  "
                  type='checkbox'
                  id={option.key}
                  {...field}
                  {...rest}
                  value={option.value}
                  //  checked={field.value.includes(option.value)}
                  checked={field.value === option.value}
                />
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