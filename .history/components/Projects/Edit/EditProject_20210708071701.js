import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'
import { Toast } from 'primereact/toast';
 import {useState} from 'react'
import {useRef} from 'react'

function EditProject ({projectsData,currencydata,accountdata,projectManager,projectPhase,projectType,projectBillingType}) {
  const toast = useRef(null); 
  const projectCode = projectsData[0].project_code
  const projectId = projectsData[0].id
  console.log(projectsData[0])
  // --------------------------------------initial Values---------------------
  const initialValues =  {
account_id: projectsData[0].account_id,
active: projectsData[0].active,
actual_end_date: projectsData[0].actual_end_date,
actual_poc: projectsData[0].actual_poc,
actual_start_date: projectsData[0].actual_start_date,
billable: projectsData[0].billable,
billed_amount: projectsData[0].billed_amount,
billing_type:projectsData[0].billing_type,
currency_code: projectsData[0].currency_code,
description:projectsData[0].description,
name: projectsData[0].name,
opportunity: projectsData[0].opportunity,
percentage_of_completion:projectsData[0].percentage_of_completion,
planned_hours:projectsData[0].planned_hours,
planned_revenue:projectsData[0].planned_revenue,
project_code:projectsData[0].project_code, 
project_manager_id:projectsData[0].project_manager_id,
project_notes:projectsData[0].project_notes,
project_phase:projectsData[0].project_phase,
project_type:projectsData[0].project_type, 
region:projectsData[0].region, 
state:projectsData[0].state 

  }
 
// -----------------------------Dynamic Select Options-----------------------


  // --------------Account Id--------------
  let dropdownOptionsAccountId = [{ key: "Account", value: "" }];
  accountdata.map((item)=> {
    let obj = {};
    obj["key"] = item.account_name;
    obj["value"] = item.id;
    dropdownOptionsAccountId.push(obj);
  });

  //   ---------------Currency--------------
  let dropdownOptionsCurrency = [{ key: "Currency", value: "" }];
  currencydata.map((item)=> {
    let obj = {};
    obj["key"] = item.code;
    obj["value"] = item.id;
    dropdownOptionsCurrency.push(obj);
  });

  // ---------------Project Manager-----------
  let dropdownProjectManager = [{ key: "Project Manager", value: "" }];
  projectManager.filter(item=> item.role === 'Project Manager').map((Fitem)=> {
    let obj = {};
    obj["key"] = Fitem.first_name;
    obj["value"] = Fitem.user_id;
    dropdownProjectManager.push(obj);
  });


   let dropdownOptionsProjectPhase = [{ key: "Project Phase", value: "" }];
  projectPhase.map((item)=> {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsProjectPhase.push(obj);
  });

   let dropdownOptionsbillable = [{ key: "Billing Type", value: "" }];
  projectBillingType.map((item) =>{
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsbillable.push(obj);
  });

  let dropdownOptionsProjectType = [{ key: "Project Type", value: "" }];
   projectType.map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsProjectType.push(obj);
  });


// -------------------------- Static Select Options----------------------------


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
    return axios.patch(url ,data,
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
      project_manager_id: Yup.string().required('Required'),
      project_phase: Yup.string().required('Required'),
      account_id: Yup.string().required('Required'),
      billing_type: Yup.string().required('Required'),
      billable: Yup.string().required('Required'),
      currency_code: Yup.string().required('Required'),
      active: Yup.string().required('Required'),
      project_type: Yup.string().required('Required'),
      opportunity: Yup.string().required('Required'),
      region: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      planned_hours: Yup.string().required('Required'),
      planned_revenue: Yup.string().required('Required'),
      actual_start_date: Yup.string().required('Required'),
      actual_end_date: Yup.string().required('Required'),
      planned_revenue: Yup.string().max(14,'Must be 14 digits or less').test(
        'Is positive?', 
        ' Amount must be greater than 0!', 
        (value) => value > 0
      ),
      percentage_of_completion: Yup.string().max(14,'Must be 14 digits or less').test(
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
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Details Updated', life: 3000 });
    };

    // -------------------------------Form----------------------------
 return (
   <>
   <Toast ref={toast} />
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

      <div>
      <FormikControl
        control='input'
        type='number'
        label='% Complete'
        name='percentage_of_completion'
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
              control='input'
              type='date'
              label='Actual Start Date'
              name='actual_start_date'
            />
    </div>

    <div className="ml-3">
             <FormikControl
              control='input'
              type='date'
              label='Actual End Date'
              name='actual_end_date'
            />
    </div>
    <div className="text-right mt-5  col-span-2 mr-20 ">
      <button type="submit" className="btn" >Save</button>
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