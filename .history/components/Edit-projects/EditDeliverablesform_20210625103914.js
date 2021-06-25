import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'

 import {useState} from 'react'

function EditDeliverables () {

  
  // --------------------------------------initial Values---------------------
  const initialValues = {
     assignees:'',
     name:'',
     owner:'',
     parent_deliverables:'',
     percentage_of_completion:'',
      associated_milestone: '',
      description: '',
    //   planned_start_date: null,
    //   planned_end_date: null,
      predecessor_deliverables: '',
      sucecssor_deliverables: '',
      // actual_effort_in_hours: '',
      estimated_effort_in_hours: '',
    //   inserted_at: '',
      // modified_by: '',
      task_id: '',
    //   updated_at: '',
    //   created_by:'',
    //   project_id:'',
      story_id:'',
      // actual_start_date:null,
      // actual_end_date: null,
      time_recording_allowed: false
      
  }
// -----------------------------Dynamic Select Options-----------------------

// --------------Account Id--------------
// let dropdownOptionsAccountId = [{key:"Account",value:""}];
// for (const item of accountdata) {
//   let obj = {};
//   obj['key'] = item.account_name;
//   obj['value'] = item.id;
//   dropdownOptionsAccountId.push(obj);
// }

//   ---------------Currency--------------
// let dropdownOptionsCurrency =[{key:"Currency",value:""}];
// for (const item of currencydata) {
//   let obj = {};
//   obj['key'] = item.code;
//   obj['value'] = item.id;
//   dropdownOptionsCurrency.push(obj);
// }

// ---------------Project Manager-----------
// let dropdownProjectManager =[{key:"Project Manager",value:""}];
// for (const item of projectManager) {
//   let obj = {};
//   obj['key'] = item.first_name;
//   obj['value'] = item.user_id;
//   dropdownProjectManager.push(obj);
// }

// -------------------------- Static Select Options----------------------------


//   const dropdownOptionsbillable = [
//     { key: 'Billing Type', value: '' },
//     { key: 'Time and Material', value: 'Time_and_Material' },
//     { key: 'Fixed Price', value: 'Fixed_Price' }
    
//   ]

  const dropdownOptionsMilestone = [
    { key: 'Associated Milestone', value: '' },
    { key: 'Task', value: 'Task' },
    { key: 'Milestone', value: 'Milestone' }
  ]

//   const dropdownOptionsProjectPhase = [
//     { key: 'Project Phase', value: '' },
//     { key: 'Planning', value: 'Planning' },
//     { key: 'Requiremnet', value: 'Requirement' },
//     { key: 'Design', value: 'Design' },
//     { key: 'Development', value: 'Development' },
//     { key: 'UAT', value: 'UAT' },
//     { key: 'GoLivw Preparation', value: 'GoLive_Preparation' },
//     { key: 'Post GoLive Support', value: 'Post_GoLive_Support' }
//   ]


  const checkboxOptionsTimeRecord =  [
    { key: 'Time Recording', value: true},
    ]
   
    // const statusOptions = [
    //   { key: 'Active', value: true },
    // ] 
    
//     const dropdownOpportunity = [
//       { key: 'opportunity', value: '' },
//       { key: 'Account1', value: 'Account1' },
//       { key: 'Account2', value: 'Account2' }
//     ]

//     const dropdownRegion = [
//       { key: 'Region', value: '' },
//       { key: 'Benglore', value: 'Benglore' },
//       { key: 'Noida', value: 'Noida' }
    // ]

  // -----------------------------Post Data--------------------------------

  // const queryClient = useQueryClient()
  // const url = "https://cthpociewycattzfdtep.supabase.co/rest/v1/deliverables?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjg2MDk5MSwiZXhwIjoxOTM4NDM2OTkxfQ.ZmeqDJqHN5Bjtzn6tA8hK5_ZB_L-s16LDdkL4IF5rEg"

  // const addproject = (data)=>{
  //   return axios.post(url,data);
  //   };

  // const mutation = useMutation(addproject,{
  //   onMutate: variables => {
  //          console.log('onmutate',variables)
  //    },
  //   onError: (error) => {
  //     console.log(error)
  //   },
  //   onSuccess: (data, variables, context) => {
  //      console.log('onSuccess',variables,data)
  //   },
  //   onSettled: (data, error) => {
  //   console.log('onSettled',data,error)
  // },
  // })

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      // project_code: Yup.string().required('Required').test(
      //   'Is positive?', 
      //   ' The Project Code must be greater than 0!', 
      //   (value) => value > 0
      // ),
      // project_manager_id: Yup.string().required('Required'),
      // planned_revenue: Yup.string().max(14,'Must be 14 digits or less').test(
      //   'Is positive?', 
      //   ' Amount must be greater than 0!', 
      //   (value) => value > 0
      // ),
      estimated_effort_in_hours: Yup.string().test(
        'Is positive?', 
        ' The Number must be positive', 
        (value) => value >= 0
      ),
    //   planned_start_date: Yup.date(),
    //     planned_end_date: Yup.date().min(
    //         Yup.ref('planned_start_date'),
    //         "end date can't be before start date"
    //       )
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
    <h2 className="text-2xl text-center  font-semibold px-20">Edit Deliverables</h2>
    </div>
   

    <Form className="formGrid
    " autoComplete="off">
      <h2 className="h2Form">Basic Details</h2>
    <div className="ml-3">
             <FormikControl
              control='input'
              type='number'
              label='Story Id'
              name='story_id'
            />
    </div>
    {/* <div>
      <FormikControl
        control='input'
        type='number'
        label='Project Id'
        name='project_id'
        
      /> */}
      {/* </div> */}
      <div>
      <FormikControl
        control='input'
        type='number'
        label='Task Id'
        name='task_id'
      />
      </div>
    
      <div>  
      <FormikControl
        control='input'
        type='text'
        label='Assignees'
        name='assignees'
      />
      </div>

      <div>  
      <FormikControl
        control='input'
        type='text'
        label='Deliverables Name'
        name='name'
      />
      </div>
       
      <div>
      <FormikControl
        control='input'
        type='text'
        label='Owner'
        name='owner'
      />
      </div>

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Parent Deliverables'
        name='parent_deliverables'
      />
      </div>

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Percentage of Completion'
        name='percentage_of_completion'
      />
      </div>

      <div>
      <FormikControl
        control='select'
        
        label='Associated Milestone'
        name='associated_milestone'
        options={dropdownOptionsMilestone}
      />
      </div>

      {/* <div>
      <FormikControl
        control='textarea'
        type='text'
        label='Description'
        name='description'
      />
      </div> */}

      <div > 
       <FormikControl
        control='date'
        label='Planned Start Date'
        name='planned_start_date'
       
      />
      </div>

      <div > 
       <FormikControl
        control='date'
        label='Planned End Date'
        name='planned_end_date'
        
      />
      </div>

       
      {/* {/* <div>
      <FormikControl
        control='select'
        label='Project manager'
        name='project_manager_id'
        options={dropdownProjectManager}
      />
      </div> */}

      {/* <div > 
       <FormikControl
        control='select'
        label='Account'
        name='account_id'
        options={dropdownOptionsAccountId}
      />
      </div>
       */}
    
        */

      <div > 
       <FormikControl
        control='input'
        type= 'number'
        label='Predecessor Deliverables'
        name='predecessor_deliverables'
        
      />
      </div>

      <div >
      <FormikControl
      control='input'
      type='number'
      label='Seccessor Deliverables'
      name='sucecssor_deliverables'
     
      />
      </div>

       {/* <div>
      <FormikControl
        control='select'
        label='Currency'
        name='currency_code'
        options={dropdownOptionsCurrency}
      />
      </div> */}

      {/* <div >
        <FormikControl
        control='input'
        type='number'
        label='Actual Effort in Hours'
        name='actual_effort_in_hours'
       
      />
      </div> */}

      <div>
         <FormikControl
        control='input'
        type='number'
        label='Estimated Effort in Hours'
        name='estimated_effort_in_hours'
        
        />
        </div>

      {/* <div>
      <FormikControl
        control='input'
        type='number'
        label='Updated at'
        name='updated_at'
        
      />
      </div>
       */}
      {/* <div >
         <FormikControl
        control='input'
        type= 'text'
        label='Modified by'
        name='modified_by'
        />
        </div> */}
        
        {/* <div>
      <FormikControl
        control='text'
        type='number'
        label='Status'
        name='  status'
      />
      </div> */}

      
      {/* <div className=" col-span-2">
         <FormikControl
        control='textarea'
        label='Updated at'
        name='updated_at'
        />
        </div>
       */}

     
     {/* <div>
      <FormikControl
        control='input'
        type='text'
        label='Created by'
        name='created_by'
      /> */}
      {/* </div> */}
      
      

     
     

    {/* <div >
             <FormikControl
              control='date'
              label='Actual Start Date'
              name='actual_start_date'
            />
    </div> */}
    {/* <div >
             <FormikControl
              control='date'
              label='Actual End Date'
              name='actual_end_date'
            />
    </div> */}
    <div >
             <FormikControl
              control='checkbox'
              label='Time Recording'
              name='time_recording_allowed'
              options={checkboxOptionsTimeRecord}
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

</>

  )
}

export default  EditDeliverables;