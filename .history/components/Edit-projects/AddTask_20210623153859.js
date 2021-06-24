import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'

 import {useState} from 'react'

function AddTask () {

  
  // --------------------------------------initial Values---------------------
  const initialValues = {
     estimated_effort_in_hours:'',
      name:'',
      associated_milestone:'',
      description: '',
      sucecssor_task:'',
      parent_task:'',
      created_by:'',
      project_id:'',
      story_id:'',
      planned_end_date:null,
      planned_start_date: null,
      owner:'',
      time_recording_allowed: false,
  }

// -------------------------- Static Select Options----------------------------




  // const dropdownOptionsProjectType = [
  //   { key: 'Project Type', value: '' },
  //   { key: 'Customer Project', value: 'Customer_Project' },
  //   { key: 'Internal Project', value: 'Internal_Project' }
  // ]

 


  const checkboxOptionsTimeRecord =  [
    { key: 'Time Recording', value: true},
    ]
   
  
  

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient()
  const url = "https://cthpociewycattzfdtep.supabase.co/rest/v1/tasks?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjg2MDk5MSwiZXhwIjoxOTM4NDM2OTkxfQ.ZmeqDJqHN5Bjtzn6tA8hK5_ZB_L-s16LDdkL4IF5rEg"

  const addproject = (data)=>{
    return axios.post(url,data);
    };

  const mutation = useMutation(addproject,{
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

//   const validationSchema = Yup.object({
//       name: Yup.string().required('Required'),
//       project_code: Yup.string().required('Required').test(
//         'Is positive?', 
//         ' The Project Code must be greater than 0!', 
//         (value) => value > 0
//       ),
//       project_manager_id: Yup.string().required('Required'),
//       planned_revenue: Yup.string().max(14,'Must be 14 digits or less').test(
//         'Is positive?', 
//         ' Amount must be greater than 0!', 
//         (value) => value > 0
//       ),
//       planned_hours: Yup.string().test(
//         'Is positive?', 
//         ' The Number must be positive', 
//         (value) => value >= 0
//       ),
//       planned_start_date: Yup.date(),
//         planned_end_date: Yup.date().min(
//             Yup.ref('planned_start_date'),
//             "end date can't be before start date"
//           )
//   })

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
    //    validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
    <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
    <div className=" shadow-sm py-6 text-blue-900 ">
    <h2 className="text-2xl text-center  font-semibold px-20">Add Task</h2>
    </div>
   

    <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12  
     md:gap-y-4 py-6   md:ml-0" autoComplete="off">
      <h2 className="h2Form">Basic Details</h2>

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Project Id'
        name='project_id'
      />
      </div>
       
      <div>
      <FormikControl
        control='input'
        type='text'
        label='Task Name'
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
        label='Estimated Effort in hours'
        name='estimated_effort_in_hours'
      />
      </div>
       
      

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Story ID'
        name='story_id'
      />
      </div>

      <div>
      <FormikControl
        control='input'
        type='text'
        label='Created By'
        name='created_by'
      />
      </div>

    

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Associated Milestone'
        name='associated_milestone'
      />
      </div>

      {/* <div > 
       <FormikControl
        control='select'
        label='Project Type'
        name='project_type'
        options={dropdownOptionsProjectType}
      />
      </div> */}

      

     

   
    
       

      

      <div className=' mt-3'>
      <FormikControl
      control='checkbox'
      label='Time Recording'
      name='time_recording_allowed'
      options={checkboxOptionsTimeRecord} 
      />
      </div>

      
     

     

     
      
      <div className=" col-span-2">
         <FormikControl
        control='textarea'
        label='Description'
        name='description'
        />
        </div>
        
        <div>
      <FormikControl
        control='input'
        type='number'
        label='Parent Task'
        name='parent_task'
      />
      </div>

        <div>
      <FormikControl
        control='input'
        type='number'
        label='Sucecssor Task'
        name='sucecssor_task'
      />
      </div>
    
     
      

     
      

      <h2 className="h2Form">Dates</h2> 
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

   
    <div className="text-right mt-5  col-span-2 mr-20 ">
     <button type="submit" class="btn" disabled={!formik.isValid}>Submit</button>
    </div>
   
    </Form>
    </div>
  
  )
}}
</Formik>

</>

  )
}

export default AddTask;