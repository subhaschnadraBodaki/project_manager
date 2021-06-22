import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import 'react-datepicker/dist/react-datepicker.css'

function DatePicker (props) {
  const { label, name, ...rest } = props
  return (
    <div className="grid grid-cols-5" >
      <label htmlFor={name} className="label">{label}</label>
      <div className="col-span-3">
      <Field name={name}  autocomplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
         
          return (
             
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              
              onChange={val => setFieldValue(name, val)}
              
            />
          
          )
        }}
      </Field>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default DatePicker