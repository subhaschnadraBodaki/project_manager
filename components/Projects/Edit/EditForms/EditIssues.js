import React from 'react'
import { Formik, Form } from 'formik'
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import FormikControl from '../../../FormComponents/FormikControl'
import * as Yup from 'yup'
import {useContext} from 'react'
import {Context} from '../../../../pages/projects/edit/[pid]'
import { Toast } from 'primereact/toast';
import {useRef} from 'react'

function EditIssues ({projectId,editData}) {
  const toast = useRef(null);
  const contextData = useContext(Context);
  // --------------------------------------initial Values---------------------
  const initialValues = editData;

// -------------------------- Static Select Options----------------------------


const  dropdownCurrency =[{key:'Currency', value:''}];
contextData[4].map((item) => {
    let obj = {};
    obj["key"] = item.code;
    obj["value"] = item.id;
    dropdownCurrency.push(obj);
  });

const dropdownState = [{key:'state', value:''}];
 contextData[5].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownState.push(obj);
  });


const dropdownIssuePriority = [{ key: 'Priority', value: '' }];
 contextData[14].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownIssuePriority.push(obj);
  });

const dropdownImpact = [{ key: 'Impact', value: '' }];
 contextData[13].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownImpact.push(obj);
  });

const checkboxOptionsStatus =  [
  { key: 'Status Report', value: true},
  ]
   
    // -----------------------------Post Data--------------------------------
 const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/issues?id=eq.${editData.id}`

  const response = (data)=>{
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
 

  const mutation = useMutation(response,{
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
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Issue Added', life: 3000 });
  },
  })

  // -------------------------------Validation Schema------------------------

    const validationSchema = Yup.object({
    issue_number: Yup.string().required('Required'),
    assigned_to: Yup.string().required('Required'),
     actual_cost: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
      
  })

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
  console.log(data)
      
       mutation.mutate(data);
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
    
   

    <Form  id="a-form" name="form" className="formGridModal" autoComplete="off">
      <h2 className="h2Form">Basic Details</h2>

    
       
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
        options={dropdownIssuePriority}
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
        control='input'
        type='text'
        label='Assigned To'
        name='assigned_to'
      />
      </div>

    <div>
      <FormikControl
        control='checkbox'
        name='show_on_project_status_report'
        options={checkboxOptionsStatus}
      />
      </div> 

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Actual Cost'
        name='actual_cost'
      />
      </div>

      <div>
      <FormikControl
        control='select'
        label='Currency'
        name='currency'
        options={dropdownCurrency}
      />
      </div>

     

         <div>
      <FormikControl
        control='input'
        type='date'
        label='Due Date'
        name='due_date'
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
        label='Notes'
        name='notes'
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

export default EditIssues;