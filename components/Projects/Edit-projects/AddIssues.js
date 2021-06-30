import React from 'react'
import { Formik, Form } from 'formik'
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import FormikControl from '../../FormComponents/FormikControl'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast';
import {useRef} from 'react'

function AddIssues ({projectId}) {
  const toast = useRef(null); 
  // --------------------------------------initial Values---------------------
  const initialValues = {
     issue_number:null,
      estimated_cost:'',
      project_id: projectId,
      assigned_to:'',
      description:'',
      notes:'',
      currency:null,
      show_on_project_status_report:false
  }

// -------------------------- Static Select Options----------------------------

const dropdownState = [
  
  {key:'state', value:''},
  {key:'Open', value:'Open'},
  { key:  'Work in Progress', value: 'Work in Progress' },
  { key: 'Closed Complete', value: 'Closed Complete' },
  { key: 'Closed InComplete', value: 'Closed InComplete' },
  { key: 'Closed Skipped', value: 'Closed Skipped' },
]
const dropdownIsuuePriority = [
  { key: 'Low', value: 'Low' },
  { key: 'Medium', value: 'Medium' },
  { key: 'Urgent', value: 'Urgent' },
  { key: 'Immediate', value: 'Immediate' },
]

const dropdownImpact = [
  { key: '1', value: '1' },
  { key: '2', value: '2' },
  { key: '3', value: '3' },
  { key: '4', value: '4' },
  { key: '5', value: '5' },
]

const checkboxOptionsStatus =  [
  { key: 'Status Report', value: true},
  ]
   
    // -----------------------------Post Data--------------------------------

    const queryClient = useQueryClient()
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/issues`
  
    const addIssues = (data)=>{
      return axios.post(url,data,{
        headers: {
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
           
        }
      });
      };
  
    const mutation = useMutation(addIssues,{
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
    issue_number: Yup.string().required('Required'),
    assigned_to: Yup.string().required('Required'),
    // notes: Yup.string().required('Required'),
    // state: Yup.string().required('Required'),
      
  })

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
  console.log(data)
      
       mutation.mutate(data);
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Issue Added', life: 3000 });
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
    <div className=" justify-items-center container w-full mx-auto   ">
    
   

    <Form name="form" id="a-form" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12  
     md:gap-y-4 py-6   md:ml-0" autoComplete="off">
      <h2 className="h2FormModal">Basic Details</h2>

     
       
      <div>
      <FormikControl
        control='input'
        type='number'
        label='Issue Number'
        name='issue_number'
      />
      </div>

      <div>  
      <FormikControl
        control='select'
        label='State'
        name='state'
        options={dropdownState}
      />
      </div>
      
      
      <div>  
      <FormikControl
        control='select'
        label='Issue Proiority'
        name='issue_priority'
        options={dropdownIsuuePriority}
      />
      </div>
      
       
      

      <div>
      <FormikControl
        control='select'
        label='Impact'
        name='impact'
        options={dropdownImpact}
      />
      </div>
    <div>
      <FormikControl
        control='checkbox'
        name=' show_on_project_status_report'
        options={checkboxOptionsStatus}
      />
      </div> 

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Estimated Cost'
        name='estimated_cost'
      />
      </div>
      <div>
      <FormikControl
        control='input'
        type='number'
        label='Currency'
        name='currency'
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
        type='text'
        label='Notes'
        name='notes'
      />
      </div>
        <div>
      <FormikControl
        control='input'
        type='text'
        label='Assigned To'
        name='assigned_to'
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

export default AddIssues;