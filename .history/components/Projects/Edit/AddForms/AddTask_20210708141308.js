import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { Toast } from 'primereact/toast';
import {useRef} from 'react'
import {useContext} from 'react'
import {Context} from '../../../../pages/projects/edit/[pid]'
import {TaskTableContext} from '../Context'

function AddTask({ projectId}) {

   const toast = useRef(null); 
  const contextData = useContext(Context);
  const {tasksData,setTasksData} = useContext(TaskTableContext)  
  console.log(tasksData)
  // --------------------------------------initial Values---------------------
  const initialValues = {
    predecessor_task:null,
    estimated_effort_in_hours: '',
    name: '',
    description: '',
    sucecssor_task: null,
    parent_task: null,
    project_id: projectId,
    story_id: null,
    planned_end_date: null,
    planned_start_date: null,
    owner: '',
    time_recording_allowed: false,
  };

  const checkboxOptionsTimeRecord = [{ key: "Time Recording", value: true }];

     const dropdownOptionsOwner = [
    { key: 'Owner', value: '' },
    { key: 'member1', value: '7b693dd7-0581-4f58-bc23-c557d14e5e53' },
    { key: 'member2', value: 'Milestone' }
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

 

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks`;

  const addTask = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      
      },
    });
  };

  const mutation = useMutation(addTask, {
    onMutate: (variables) => {
      console.log("onmutate", variables);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", variables, data);
    },
    onSettled: (data, error) => {
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Task Added', life: 3000 });
       document.form.reset();
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
     owner: Yup.string().required("Required"),
     estimated_effort_in_hours: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
    planned_start_date: Yup.date(),
    planned_end_date: Yup.date().min(
      Yup.ref("planned_start_date"),
      "end date can't be before start date"
    ),
  });

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
    
    mutation.mutate(data);
    console.log(data)
    tasksData.push(data)
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
    
   

    <Form name="form" className="formGridModal" id="a-form" autoComplete="off">
       <h2 className="h2FormModal">Basic Details</h2> 
                  
                
                  
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
                    label='Est. Effort in hours'
                    name='estimated_effort_in_hours'
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

              

                <div >
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

                 





                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Description"
                    name="description"
                  />
                </div>

                <h2 className="h2Form">Dates</h2>
                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Planned Strt Date"
                    name="planned_start_date"
                  />
                </div>

                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Planned End Date"
                    name="planned_end_date"
                  />
                </div>
               
                <div className="text-right mt-5  col-span-2 mr-10 ">
                  <button type="submit" class="btn">
                    Save
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default AddTask;
