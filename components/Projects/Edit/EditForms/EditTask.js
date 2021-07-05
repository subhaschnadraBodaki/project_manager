import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'
 import {useState} from 'react'

function EditTask ({projectId,editData}) {


  // --------------------------------------initial Values---------------------
  // console.log(editData.id)
  console.log('editData')

  const initialValues = editData;
  //  {
  //    actual_effort_in_hours:null,
  //     name: editData.name,
  //     // associated_milestone:null,
  //     description: editData.description,
  //     sucecssor_task:editData.sucecssor_task,
  //     parent_task:editData.parent_task,
  //     project_id:projectId,
  //     story_id:editData.story_id,
  //     actual_start_date: null,
  //     actual_end_date: null,
  //     percentage_of_completion:null,
  //     owner:editData.owner,
  //     time_recording_allowed: false,
  // }

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
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks?id=eq.${editData.id}`

  const editTaskData = (data)=>{
    // return axios.post(url,data);
    return axios.patch(url ,data,
   {
      headers: {
          "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
      }
    }
  )
  };

  const mutation = useMutation(editTaskData,{
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
        // document.form.reset();

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
    <div className="  justify-items-center container w-full mx-auto   ">
   
   

    <Form   className="formGridModal"  id="a-form" autoComplete="off">
      <h2 className="h2Form">Basic Details</h2>

    
       
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
        label='Actual Eft. in Hrs'
        name='actual_effort_in_hours'
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
    

      {/* <div>
      <FormikControl
        control='input'
        type='number'
        label='Ass. Milestone'
        name='associated_milestone'
      />
      </div> */}

      {/* <div > 
       <FormikControl
        control='select'
        label='Project Type'
        name='project_type'
        options={dropdownOptionsProjectType}
      />
      </div> */}


     

      
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
      <div>
      <FormikControl
        control='input'
        type='number'
        label='%Complete'
        name='percentage_of_completion'
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
     <button type="submit" class="btn" disabled={!formik.isValid}>Add</button>
    </div> 
   
    </Form>
    </div>
  
  )
}}
</Formik>

</>

  )
}

export default EditTask;