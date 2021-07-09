import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../FormComponents/FormikControl'
import { useMutation, useQueryClient } from 'react-query';
 import axios from 'axios';
 import {useQuery} from 'react-query'
 import {useState} from 'react'
 import {useContext} from 'react'
 import {useRef} from 'react'
import {Context} from '../../../../pages/projects/edit/[pid]'
import { Toast } from 'primereact/toast';
import {TaskTableContext} from '../Context'
function EditTask ({projectId,editData}) {


  // --------------------------------------initial Values---------------------
   const toast = useRef(null);
 const contextData = useContext(Context);
 const {tasksData,setTasksData} =useContext(TaskTableContext)
  const initialValues = editData;


// -------------------------- Static Select Options----------------------------




    const dropdownOptionsOwner = [
    { key: 'Owner', value: '' },
    { key: 'Member1', value: '7b693dd7-0581-4f58-bc23-c557d14e5e53' },
    { key: 'Member2', value: '1111' }
  ]
    
     const dropdownOptionsStatus = [{ key: 'Status', value: '' }];
    contextData[0].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsStatus.push(obj);
  });
     
     
    const dropdownOptionsPredecessor = [{ key: 'Predecessor Task', value: '' }];
     contextData[1].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownOptionsPredecessor.push(obj);
  });
  

   const dropdownOptionsSucecssor = [{ key: 'Sucecssor Task', value: '' }];
   contextData[1].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownOptionsSucecssor.push(obj);
  });

   const dropdownOptionsParent = [{ key: 'Parent Task', value: '' }];
   contextData[1].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownOptionsParent.push(obj);
  });

     const dropdownOptionsStoryName = [{ key: 'Story Name', value: '' }];
      contextData[2].map((item) => {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownOptionsStoryName.push(obj);
  });

   const dropdownOptionsMilestone = [{ key: 'Associated Milestone', value: '' }];
    contextData[3].map((item) => {
       let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.id;
    dropdownOptionsMilestone.push(obj);
  });
 


  const checkboxOptionsTimeRecord =  [
    { key: 'Time Recording', value: true},
    ]
   
  
  

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks?id=eq.${editData.id}`

  const editTaskData = (data)=>{
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
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
      
  },
  })

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
     owner: Yup.string().required("Required"),
     actual_effort_in_hours: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
      percentage_of_completion: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
    actual_start_date: Yup.date(),
    actual_end_date: Yup.date().min(
      Yup.ref("actual_start_date"),
      "end date can't be before start date"
    ),
  });
  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
  console.log(data)
      
       mutation.mutate(data);
       
     const   index = tasksData.findIndex(val => val.id === editData.id);
       tasksData.splice(index,1,data)
       
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
                    control='select'
                    label='Owner'
                    name='owner'
                     options={dropdownOptionsOwner}
                  />
                  </div>

                  <div>  
                  <FormikControl
                    control='input'
                    type='number'
                    label='Actual Eft. in hours'
                    name='actual_effort_in_hours'
                  />
                  </div>
                  
                  

                  <div>
                  <FormikControl
                    control='select'
                    label='Story Name'
                    name='story_id'
                    options={dropdownOptionsStoryName}
                  />
                  </div>
                

                

                  <div>
                  <FormikControl
                    control="select"
                    label="Predecessor Task"
                    name="predecessor_task"
                    options={dropdownOptionsPredecessor}
                  />
                </div>

                  <div>
                  <FormikControl
                    control="select"
                    label="Sucecssor Task"
                    name="sucecssor_task"
                     options={dropdownOptionsSucecssor}
                  />
                </div>

                <div>
                  <FormikControl
                    control="select"
                    label="Parent Task"
                    name="parent_task"
                     options={dropdownOptionsParent}
                  />
                </div>

              

                <div className=" ">
                  <FormikControl
                    control="checkbox"
                    label="Time Recording"
                    name="time_recording_allowed"
                    options={checkboxOptionsTimeRecord}
                  />
                </div>
                 
                   <div>
                  <FormikControl
                    control='select'
                    label='Status'
                    name='status'
                    options={dropdownOptionsStatus}
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

                  <div>
                <FormikControl
                  control='input'
                  type='number'
                  label='%Complete'
                  name='percentage_of_completion'
                />
                </div>

                <div className=" col-span-2">
                  <FormikControl
                    control="textarea"
                    label="Description"
                    name="description"
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