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
import {useContext} from 'react'
import {Context} from '../../../../pages/projects/edit/[pid]'

function EditDeliverables ({projectId,editData}) {


 const toast = useRef(null); 
   const contextData = useContext(Context);
  // --------------------------------------initial Values---------------------
  const initialValues = editData
// -----------------------------Dynamic Select Options-----------------------

 const dropdownTaskName =[{key:'Task Name', value:''}];
contextData[1].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownTaskName.push(obj);
  });

const dropdownStoryName =[{key:'Story Name', value:''}];
contextData[2].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownStoryName.push(obj);
  });

  const dropdownAssMilestones =[{key:'Associated Milestone', value:''}];
contextData[3].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
   dropdownAssMilestones.push(obj);
  });

      const dropdownDeliStatus =[{key:'Status', value:''}];
contextData[15].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownDeliStatus.push(obj);
  });


  const parentDeli =[{key:'Parent Deliverables', value:''}];
contextData[16].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    parentDeli.push(obj);
  });

    const predecessorDeli =[{key:'Predecessor Deliverables', value:''}];
contextData[16].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    predecessorDeli.push(obj);
  });

    const sucessorDeli =[{key:'Successor Deliverables', value:''}];
contextData[16].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    sucessorDeli.push(obj);
  });

 

  const checkboxOptionsTimeRecord =  [
    { key: 'Time Recording', value: true},
    ]
   

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/deliverables?id=eq.${editData.id}`

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
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Updated', life: 3000 });
  },
  })

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      owner: Yup.string().required('Required'),
   
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
        label='Deli. Name'
        name='name'
      />
      </div>

       

    <div >
             <FormikControl
              control='select'
              label='Story Name'
              name='story_id'
              options={dropdownStoryName}
            />
    </div>
   
      <div>
      <FormikControl
        control='select'
        label='Task Name'
        name='task_id'
        options={dropdownTaskName}
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
        control='select'
        label='Parent Deli.'
        name='parent_deliverables'
        options={parentDeli}
      />
      </div>

      <div > 
       <FormikControl
        control='select'
        label='Predecessor Deli.'
        name='predecessor_deliverables'
        options={predecessorDeli}
        
      />
      </div>

      <div >
      <FormikControl
      control='select'
      label='Successor Deli.'
      name='sucecssor_deliverables'
      options={sucessorDeli}
      />
      </div>

      

      <div>
         <FormikControl
        control='input'
        type='number'
        label='Act. Eft. in Hours'
        name='actual_effort_in_hours'
        
        />
        </div>
       
        <div >
      <FormikControl
      control='select'
      label='Status'
      name='status'
      options={dropdownDeliStatus}
      />
      </div>

       <div >
      <FormikControl
      control='select'
      label='Ass. Milestone'
      name='associated_milestone'
      options={dropdownAssMilestones}
      />
      </div>

    
    <div > 
       <FormikControl
        control='input'
        type='date'
        label='Actual Strt. Date'
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

        <div >
             <FormikControl
              control='checkbox'
              label='Time Recording'
              name='time_recording_allowed'
              options={checkboxOptionsTimeRecord}
            />
    </div>
   
    <div className="text-right mt-5  col-span-2 mr-10 ">
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




export default  EditDeliverables;