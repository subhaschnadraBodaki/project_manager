import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function ProjectForm () {
  const initialValues = {
      name: '',
      project_code:'',
      project_manager: '',
      description: '',
      billable: [],
      planned_start_date: null,
      planned_hours: '',
      planned_revenue:'',
      planned_end_date: null,
      actual_start_date: null,
      actual_end_date: null,
  }
  const options = [
    { key: 'Active', value: 'true' },
    { key: 'Not Active', value: 'false' }
  ]

  const checkboxOptions = [
    { key: 'Yes', value: 'true' },
   
  ]
  
  const dropdownOptions = [
    { key: 'Account ID', value: '' },
    { key: 'Vijay', value: 'Id1' },
    { key: 'Subhash', value: 'Id2' },
    { key: 'Abhishek', value: 'Id3' }
  ]
  const dropdownOptionsCurrency = [
    { key: 'currency', value: '' },
    { key: 'INR', value: 'INR' },
    { key: 'USD', value: 'USD' }
  ]
  

//   const validationSchema = Yup.object({
//       name: Yup.string().required('Required'),
//       project_code: Yup.string().required('Required'),
    
//     description: Yup.string().required('Required'),
//     billable: Yup.string().required('Required'),
//   })

  const onSubmit = values => {
    console.log('Form data', values)
    console.log('Saved data', JSON.parse(JSON.stringify(values)))
  }

  return (
    <Formik
      initialValues={initialValues}
    //   validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
    <div className="min-h-screen container w-full mx-auto   bg-gray-100 ">
    <div className="bg-white shadow-sm py-6 text-blue-900 ">
    <h2 className="text-2xl text-center  font-semibold px-20">Add Project Details</h2>
    </div>
    <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 lg:gap-x-48  md:gap-x-24 ml-24 gap-y-2 px-20 py-6">
      <h2 className="col-span-2 text-xl text-left text-blue-900  font-semibold mb-2">Basic Details</h2>
      <div>
      <FormikControl
        control='input'
        type='text'
        label='Project name'
        name='name'
      />
      </div>

      <div>
      <FormikControl
        control='input'
        type='text'
        label='Project code'
        name='project_code'
      />
      </div>

       
      <div>
      <FormikControl
        control='input'
        type='text'
        label='Project manager'
        name='project_manager'
      />
      </div>

      <div > 
       <FormikControl
        control='select'
        label='Account ID'
        name='account_id'
        options={dropdownOptions}
      />
      </div>
      
     
         <div className="ml-3">
        <FormikControl
        control='radio'
        label='Status'
        name='active'
        options={options}
      />
      </div>
         
         <div className="ml-3">
         <FormikControl
              control='checkbox'
              label='Billable'
              name='billable'
              options={checkboxOptions}
            />
            </div>
         
            <div className="ml-3">
         <FormikControl
        control='textarea'
        label='Description'
        name='description'
        />
        </div>

        <div>
      <FormikControl
        control='select'
        label='Currency'
        name='currency'
        options={dropdownOptionsCurrency}
      />
      </div>

     <h2 className="col-span-2 text-xl mt-3  text-left text-blue-900  font-semibold mb-2">Effort and Budget</h2> 
     <div>
      <FormikControl
        control='input'
        type='number'
        label='Planned hours'
        name='planned_hours'
      />
      </div>
      <div>
      <FormikControl
        control='input'
        type='number'
        label='Planned revenue'
        name='planned_revenue'
      />
      </div>

      <h2 className="col-span-2 text-xl text-left mt-3 text-blue-900  font-semibold mb-2">Dates</h2> 
      <div className="ml-3">
             <FormikControl
              control='date'
              label='Planned Start date'
              name='planned_start_date'
            />
    </div>

    <div className="ml-3">
             <FormikControl
              control='date'
              label='Planned End date'
              name='planned_end_date'
            />
    </div>

    <div className="ml-3 mt-2">
             <FormikControl
              control='date'
              label='Actual Start Date'
              name='actual_start_date'
            />
    </div>

    <div className="ml-3 mt-2">
             <FormikControl
              control='date'
              label='Actual End Date'
              name='actual_end_date'
            />
    </div>
    
    <div className="text-right mt-5  col-span-2 mr-20 ">
     <button type="submit" class="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm">Submit</button>
    </div>
   
    </Form>
    </div>
  )
}}
</Formik>
  )
}

export default ProjectForm;