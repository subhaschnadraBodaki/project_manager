
import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

function  SelectPR  (props) {
const { label, name, options, ...rest } = props
  return (
 <div className="w-full  px-3 mb-6 md:mb-0">
  <label htmlFor={name}  className="label">{label}</label>
</div>
  )
}

export default SelectPR