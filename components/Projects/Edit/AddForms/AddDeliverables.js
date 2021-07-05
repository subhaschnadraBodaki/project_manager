import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
 import {useQuery} from 'react-query'
 import {useState} from 'react'
 import { Toast } from 'primereact/toast';
import {useRef} from 'react'

function AddDeliverables ({projectId}) {

  const toast = useRef(null); 
  // --------------------------------------initial Values---------------------
  const initialValues = {
     
     name:'',
     owner:'',
     parent_deliverables:null,
      
      project_id: projectId,
      description: '',
      planned_start_date: null,
      planned_end_date: null,
      predecessor_deliverables: null,
      sucecssor_deliverables : null,
      estimated_effort_in_hours:null,
      task_id: null,
      story_id:null,
      time_recording_allowed: false
      
  }



  const checkboxOptionsTimeRecord =  [
    { key: 'Time Recording', value: true},
    ]
   


  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/deliverables`

  const addDeliverables = (data)=>{
    return axios.post(url,data,{
      headers: {
          "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
         
      }
    });
    };

  const mutation = useMutation(addDeliverables,{
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
      owner: Yup.string().required('Required'),
   
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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deliverable Added', life: 3000 });
         document.form.reset();
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
    <div className="  justify-items-center container w-full mx-auto   ">
    
   

    <Form name="form" id="a-form" className="formGridModal" autoComplete="off">
      <h2 className="h2Form">Basic Details</h2>

      
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
      label='Successor Deli.'
      name='sucecssor_deliverables'
      />
      </div>

      

      <div>
         <FormikControl
        control='input'
        type='number'
        label='Est. Effort in Hours'
        name='estimated_effort_in_hours'
        
        />
        </div>

        
  
     
    <div > 
       <FormikControl
        control='input'
        type='date'
        label='Planned Start Date'
        name='planned_start_date'
       
      />
      </div>

      <div > 
       <FormikControl
        control='input'
        type='date'
        label='Planned End Date'
        name='planned_end_date'
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
   
    {/* <div className="text-right mt-5  col-span-2 mr-10 ">
    <button type="submit" class="btn" >Save and Continue</button>
    </div> */}
   
    </Form>
    </div>
  
  )
}}
</Formik>

</>

  )
}

export default AddDeliverables;