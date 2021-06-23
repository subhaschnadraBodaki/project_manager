import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'
//  import AccountsData from './FetchedData/AccountsData'
// import CurrencyData from './FetchedData/CurrencyData'

function ProjectForm () {
  // --------------------------------------initial Values---------------------
  const initialValues = {
      name: '',
      project_code:'',
      project_manager: '',
      description: '',
      opportunity:'',
      planned_hours: '',
      planned_revenue:'',
      planned_start_date: null,
      planned_end_date: null,
      // billable: [],
      created_by:'',
      last_modified_by:'',
      region:'',
      actual_poc:'',
      extra_data:'',
      project_notes:''
  }
// -----------------------------DynamicDropdown-----------------------

// const Cdata = useQuery('products', CurrencyData)
// console.log(Cdata)

// --------------------------Select Options----------------------------

  const statusOptions = [
    { key: 'Active', value: "true" },
    { key: 'Not Active', value: "false" }
  ]

  const dropdownOptionsAccountId = [
    { key: 'Account ID', value: '' },
    { key: 'Vijay', value: '1' },
    { key: 'Subhash', value: '2' },
    { key: 'Abhishek', value: '3' }
  ]

  const dropdownOptionsCurrency = [
    { key: 'currency', value: '' },
    { key: 'INR', value: 'INR' },
    { key: 'USD', value: 'USD' }
  ]

  const dropdownOptionsbillable = [
    { key: 'Billing Type', value: '' },
    { key: 'Time and Material', value: 'Time_and_Material' },
    { key: 'Fixed Price', value: 'Fixed_Price' }
    
  ]

  const dropdownOptionsProjectType = [
    { key: 'Project Type', value: '' },
    { key: 'Customer Project', value: 'Customer_Project' },
    { key: 'Internal Project', value: 'Internal_Project' }
  ]

  const dropdownOptionsProjectPhase = [
    { key: 'Project Phase', value: '' },
    { key: 'Planning', value: 'Planning' },
    { key: 'Requiremnet', value: 'Requirement' },
    { key: 'Design', value: 'Design' },
    { key: 'Development', value: 'Development' },
    { key: 'UAT', value: 'UAT' },
    { key: 'GoLivw Preparation', value: 'GoLive_Preparation' },
    { key: 'Post GoLive Support', value: 'Post_GoLive_Support' }
  ]

  const dropdownOptionsProjectStatus = [
    { key: 'Project Status', value: '' },
    { key: 'Green', value: 'Green' },
    { key: 'Red', value: 'Red' },
    { key: 'Yellow', value: 'Yellow' }
  ]

  // const checkboxOptionsBillable = [
  //   { key: 'Yes', value: 'true'}
  // ]


  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient()
  const url = "https://cthpociewycattzfdtep.supabase.co/rest/v1/projects?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjg2MDk5MSwiZXhwIjoxOTM4NDM2OTkxfQ.ZmeqDJqHN5Bjtzn6tA8hK5_ZB_L-s16LDdkL4IF5rEg"

  const addproject = (data)=>{
    return axios.post(url,data);
    };

  const mutation = useMutation(addproject,{
    onMutate: variables => {
           console.log('onmutate',variables)
     },
    onError: (error, variables, context) => {
      console.log(`rolling back optimistic update with id ${context.id}`,error,variables)
    },
    onSuccess: (data, variables, context) => {
       console.log('onSuccess',variables,data)
    },
    onSettled: (data, error, variables, context) => {
    console.log('onSettled',data,error)
  },
  })

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      project_code: Yup.string().required('Required'),
      project_manager: Yup.string().required('Required'),
      planned_revenue: Yup.string().max(14,'Must be 14 digits or less'),
     actual_poc: Yup.string().max(3,'Must be 3 digits or less')
  })

  
  const onSubmit = data => {
  console.log(data)
      
       mutation.mutate(data);
    };

    // -------------------------------Form----------------------------
 return (
    <Formik
      initialValues={initialValues}
       validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
    <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
    <div className=" shadow-sm py-6 text-blue-900 ">
    <h2 className="text-2xl text-center  font-semibold px-20">Add Project Details</h2>
    </div>
   
    <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 lg:gap-x-8  md:gap-x-24 ml-8 gap-y-5 px-20 py-6 md:mx-36
     bg-gray-100 " autoComplete="off">
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
        type='number'
        label='Project code'
        name='project_code'
      />
      </div>

      <div > 
       <FormikControl
        control='select'
        label='Project Type'
        name='project_type'
        options={dropdownOptionsProjectType}
      />
      </div>

      <div > 
       <FormikControl
        control='select'
        label='Project Phase'
        name='project_phase'
        options={dropdownOptionsProjectPhase}
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
        options={dropdownOptionsAccountId}
      />
      </div>
      
    
       <div className="ml-3 ">
         <FormikControl
        control='textarea'
        label='Description'
        name='description'
        />
        </div>

        <div className="ml-3">
         <FormikControl
        control='textarea'
        label='Opportunity'
        name='opportunity'
        />
        </div>

        <div > 
       <FormikControl
        control='select'
        label='Project Status'
        name='project_status'
        options={dropdownOptionsProjectStatus}
      />
      </div>
      
        <div className="ml-3 mt-1">
        <FormikControl
        control='radio'
        label='Status'
        name='active'
        options={statusOptions}
      />
      </div>

      <div > 
       <FormikControl
        control='select'
        label='Billing Type'
        name='billing_type'
        options={dropdownOptionsbillable}
      />
      </div>

      {/* <div className='ml-3 mt-1'>
      <FormikControl
      control='checkbox'
      label='Billable'
      name='billable'
      options={checkboxOptionsBillable}
      /> */}
     { /* 
      </div> */}

       <div>
      <FormikControl
        control='select'
        label='Currency'
        name='currency'
        options={dropdownOptionsCurrency}
      />
      </div>

      <div>
      <FormikControl
        control='input'
        type='text'
        label='Region'
        name='region'
      />
      </div>
      
      <div className="ml-3">
         <FormikControl
        control='textarea'
        label='Project Notes'
        name='project_notes'
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

       <div>
      <FormikControl
        control='input'
        type='number'
        label='Actual Poc'
        name='actual_poc'
      />
      </div>

      <h2 className="col-span-2 text-xl text-left mt-3 text-blue-900  font-semibold mb-2">Dates</h2> 
      <div className="ml-3">
             <FormikControl
              control='date'
              label='Planned Start Date'
              name='planned_start_date'
            />
    </div>

    <div className="ml-3">
             <FormikControl
              control='date'
              label='Planned End Date'
              name='planned_end_date'
            />
    </div>

    <h2 className="col-span-2 text-xl text-left mt-3 text-blue-900  font-semibold mb-2">Extra User-Defined Data</h2>

    <div className="ml-3">
         <FormikControl
        control='textarea'
        label='Extra Data'
        name='extra_data'
        />
        </div>

    <h2 className="col-span-2 text-xl text-left mt-3 text-blue-900  font-semibold mb-2">Audit Fields</h2>

    <div>
      <FormikControl
        control='input'
        type='text'
        label='Created by'
        name='created_by'
      />
      </div>

      <div>
      <FormikControl
        control='input'
        type='text'
        label='Last modified by'
        name='last_modified_by'
      />
      </div>
    
    <div className="text-right mt-5  col-span-2 mr-20 ">
     <button type="submit" class="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm" disabled={!formik.isValid}>Submit</button>
    </div>
   
    </Form>
    </div>
   
  )
}}
</Formik>
  )
}

export default ProjectForm;