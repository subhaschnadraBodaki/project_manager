import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'

 import {useState} from 'react'

function EditProject ({projectsData,currencydata,accountdata,projectManager}) {
  
  const projectCode = projectsData[0].project_code
  const projectId = projectsData[0].id
  // --------------------------------------initial Values---------------------
  const initialValues = {
      name: projectsData[0].name,
      project_code: projectCode,
      description: projectsData[0].description,
      planned_hours: projectsData[0].planned_hours,
      planned_revenue:projectsData[0].planned_revenue,
      actual_start_date: null,
      actual_end_date: null,
      billable: false,
      active: false,
      project_notes:projectsData[0].project_notes
  }
// -----------------------------Dynamic Select Options-----------------------

// --------------Account Id--------------
let dropdownOptionsAccountId = [{key:"Account",value:""}];
for (const item of accountdata) {
  let obj = {};
  obj['key'] = item.account_name;
  obj['value'] = item.id;
  dropdownOptionsAccountId.push(obj);
}

//   ---------------Currency--------------
let dropdownOptionsCurrency =[{key:"Currency",value:""}];
for (const item of currencydata) {
  let obj = {};
  obj['key'] = item.code;
  obj['value'] = item.id;
  dropdownOptionsCurrency.push(obj);
}

// ---------------Project Manager-----------
let dropdownProjectManager =[{key:"Project Manager",value:""}];
for (const item of projectManager) {
  let obj = {};
  obj['key'] = item.first_name;
  obj['value'] = item.user_id;
  dropdownProjectManager.push(obj);
}

// -------------------------- Static Select Options----------------------------


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


  const checkboxOptionsBillable =  [
    { key: 'Billable', value: true},
    ]
   
    const statusOptions = [
      { key: 'Active', value: true },
    ] 
    
    const dropdownOpportunity = [
      { key: 'opportunity', value: '' },
      { key: 'Account1', value: 'Account1' },
      { key: 'Account2', value: 'Account2' }
    ]

    const dropdownRegion = [
      { key: 'Region', value: '' },
      { key: 'Benglore', value: 'Benglore' },
      { key: 'Noida', value: 'Noida' }
    ]

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${projectId}`

  const editproject = (data)=>{
    // return axios.post(url,data);
    return axios.post(url ,data,
   {
      headers: {
          "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          // "Prefer": "resolution=merge-duplicates"
          "Prefer": "return=representation"
      }
    }
  )
  };

  const mutation = useMutation(editproject,{
    onMutate: variables => {
           console.log('onmutate',variables)
     },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data, variables, context) => {
       console.log('onSuccess',variables,data)
    },
    onSettled: (data, error) => {
    console.log('onSettled',data,error)
  },
  })

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      planned_revenue: Yup.string().max(14,'Must be 14 digits or less').test(
        'Is positive?', 
        ' Amount must be greater than 0!', 
        (value) => value > 0
      ),
      planned_hours: Yup.string().test(
        'Is positive?', 
        ' The Number must be positive', 
        (value) => value >= 0
      ),
      actual_start_date: Yup.date(),
        actual_end_date: Yup.date().min(
            Yup.ref('actual_start_date'),
            "end date can't be before start date"
          )
  })

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
  console.log(data)
      
       mutation.mutate(data);
    };

    // -------------------------------Form----------------------------
 return (
   <>
    <Formik
      initialValues={initialValues}
       validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
    <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
    <div className=" shadow-sm py-6 text-blue-900 ">
    <h2 className="text-2xl text-center  font-semibold px-20">Edit Project Details</h2>
    </div>
   

    <Form className="formGrid
    " autoComplete="off">
      <h2 className="h2Form">Basic Details</h2>
      <div>
        
      <FormikControl
        control='input'
        type='text'
        label='Project name'
        name='name'
      />
      </div>
     

      <div className="md:w-full grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5  mb-6 md:mb-0">
       <h2 className="label">Project-Code :</h2>
       <h2 className="md:col-start-3 md:col-span-1 md:ml-2 text-left  tracking-wide  mb-0 text-gray-500  text-sm lg:text-base  font-medium mb-1">{projectCode}</h2>
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
        control='select'
        label='Project manager'
        name='project_manager_id'
        options={dropdownProjectManager}
      />
      </div> 

       <div > 
       <FormikControl
        control='select'
        label='Account'
        name='account_id'
        options={dropdownOptionsAccountId}
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

      <div className=' mt-3'>
      <FormikControl
      control='checkbox'
      label='Billable'
      name='billable'
      options={checkboxOptionsBillable} 
      />
      </div>

        <div>
      <FormikControl
        control='select'
        label='Currency'
        name='currency_code'
        options={dropdownOptionsCurrency}
      />
      </div> 

      <div className=" mb-3">
        <FormikControl
        control='checkbox'
        label='Active'
        name='active'
        options={statusOptions}
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
       
      <div>
         <FormikControl
        control='select'
        label='Opportunity'
        name='opportunity'
        options={dropdownOpportunity}
        />
        </div>

      <div>
      <FormikControl
        control='select'
        label='Region'
        name='region'
        options={dropdownRegion}
      />
      </div>
      
      <div className=" col-span-2">
         <FormikControl
        control='textarea'
        label='Description'
        name='description'
      
        />
        </div>
      
      <div className=" col-span-2">
         <FormikControl
        control='textarea'
        label='Project Notes'
        name='project_notes'
        />
        </div>
      

     <h2 className="h2Form">Effort and Budget</h2> 
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
        placeholder='Amount'
      />
      </div>

      <h2 className="h2Form">Dates</h2> 
      <div className="ml-3">
             <FormikControl
              control='date'
              label='Actual Start Date'
              name='actual_start_date'
            />
    </div>

    <div className="ml-3">
             <FormikControl
              control='date'
              label='Actual End Date'
              name='actual_end_date'
            />
    </div>
    <div className="text-right mt-5  col-span-2 mr-20 ">
      <button type="submit" class="btn" >Save</button>
      </div> 
   
    </Form>
    </div>
  
  )
}}
</Formik>

</>

  )
}

export default EditProject;