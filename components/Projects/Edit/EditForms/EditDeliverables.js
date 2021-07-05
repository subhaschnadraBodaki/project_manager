import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'

 import {useState} from 'react'

function EditDeliverables ({projectId,editData}) {

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
      actual_effort_in_hours: '',
      // estimated_effort_in_hours: '',
    //   inserted_at: '',
      // modified_by: '',
      task_id: '',
    //   updated_at: '',
    //   created_by:'',
    //   project_id:'',
      story_id:'',
       actual_start_date:null,
       actual_end_date: null,
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
      actual_effort_in_hours: Yup.string().test(
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
    <div className="  justify-items-center container w-full mx-auto   ">
    
   

    <Form className="formGridModal
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
        label='% Complete'
        name='percentage_of_completion'
      />
      </div>

      <div>
      <FormikControl
        control='select'
        
        label='Ass. Milestone'
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
        control='input'
        type= 'number'
        label='Predecessor Deli.'
        name='predecessor_deliverables'
        
      />
      </div>

      <div >
      <FormikControl
      control='input'
      type='number'
      label='Seccessor Deli.'
      name='sucecssor_deliverables'
     
      />
      </div>

       
      <div >
        <FormikControl
        control='input'
        type='number'
        label='Act. Eft in Hours'
        name='actual_effort_in_hours'
       
      />
      </div>

    <div >
             <FormikControl
              control='checkbox'
              label='Time Recording'
              name='time_recording_allowed'
              options={checkboxOptionsTimeRecord}
            />
    </div>

      <div > 
       <FormikControl
        control='input'
        type='date'
        label='Actual Start Date'
        name='actual_start_date'
       
      />
      </div>

      <div > 
       <FormikControl
        control='input'
        type='date'
        label='Actual End Date'
        name='actual_end_date'
        
      />
      </div>

    

   
    {/* <div className="text-right mt-5  col-span-2 mr-20 ">
     <button type="submit" class="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm" disabled={!formik.isValid}>Submit</button>
    </div> */}
   
    </Form>
    </div>
  
  )
}}
</Formik>

</>

  )
}



export default  EditDeliverables;