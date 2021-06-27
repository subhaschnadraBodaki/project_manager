import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'

 import {useState} from 'react'

function AddDeliverables ({projectId}) {

  
  // --------------------------------------initial Values---------------------
  const initialValues = {
     
     name:'',
     owner:'',
     parent_deliverables:'',
      associated_milestone: '',
      project_id:{projectId},
      description: '',
      planned_start_date: null,
      planned_end_date: null,
      predecessor_deliverables: '',
      sucecssor_deliverables: '',
      estimated_effort_in_hours: '',
      task_id: '',
      story_id:'',
      time_recording_allowed: false
      
  }


  const dropdownOptionsMilestone = [
    { key: 'Associated Milestone', value: '' },
    { key: 'Task', value: 'Task' },
    { key: 'Milestone', value: 'Milestone' }
  ]




  const checkboxOptionsTimeRecord =  [
    { key: 'Time Recording', value: true},
    ]
   
 


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
   
      estimated_effort_in_hours: Yup.string().test(
        'Is positive?', 
        ' The Number must be positive', 
        (value) => value >= 0
      ),
      planned_start_date: Yup.date(),
        planned_end_date: Yup.date().min(
            Yup.ref('planned_start_date'),
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
    <h2 className="text-2xl text-center  font-semibold px-20">Add Deliverables</h2>
    </div>
   

    <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12  
     md:gap-y-4 py-6   md:ml-0
    " autoComplete="off">
      <h2 className="h2FormModal">Basic Details</h2>
      
     <div className="md:w-full grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5  mb-6 md:mb-0">
       <h2 className="label">Project-Id :</h2>
       <h2 className="md:col-start-3 md:col-span-1 md:ml-2 text-left  tracking-wide  mb-0 text-gray-500  text-sm lg:text-base  font-medium mb-1">{projectId}</h2>
      </div>

      <div>  
      <FormikControl
        control='input'
        type='text'
        label='Deliverables Name'
        name='name'
      />
      </div>

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
        control='select'
        
        label='Associated Milestone'
        name='associated_milestone'
        options={dropdownOptionsMilestone}
      />
      </div>

     
      


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
        control='text'
        type='number'
        label='Status'
        name='  status'
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
   
    <div className="text-right mt-5  col-span-2 mr-20 ">
     <button type="submit" class="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm" disabled={!formik.isValid}>Add</button>
    </div>
   
    </Form>
    </div>
  
  )
}}
</Formik>

</>

  )
}

export default AddDeliverables;