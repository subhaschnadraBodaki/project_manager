// import React from 'react';
// import {useForm} from 'react-hook-form';

// function Input(props) {
// //     const Inputdata ={
  
// //     }

// //    handler()
// //   props.onInputData(Inputdata)
//     const {register,formState: { errors }} = useForm();
//     return (
//         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
//        {props.label}
//       </label>
//       <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type={props.type} {...register("{name}",{required:true})} placeholder={props.placeholder} 
//     //   onChange="handler"
//       />
     
//      </div>
//     );
// }

// export default Input;


import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input (props) {
  const { label, name, ...rest } = props
  return (
    <div   className='  w-full md:w-1/2 px-3 mb-6 md:mb-0'>
      <label  htmlFor={name} className="block   tracking-wide text-gray-700   text-sm lg:text-base  font-medium mb-1">{label}</label>
      <Field className="appearance-none block    text-gray-700 border border-gray-300   shadow-xs w-full rounded-sm py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-800" id={name} name={name} {...rest} autocomplete="off" />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input