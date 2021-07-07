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

function AddResourceReq({ projectId}) {

   const toast = useRef(null); 
  const contextData = useContext(Context);
    
  // --------------------------------------initial Values---------------------
  const initialValues = {
   
    title: '',
    location:'',
    description: '',
    notes:'',
    number_of_resources:'',
    planned_bill_rate:'',
    project_id: projectId,
    request_priority: null,
    start_date:null,
    end_date: null,
    requested_date: null,
    requested_hours:'',
    requestor_id:'',
    required_experience_level:'',
    resource_role:null,
    full_time: false,
    status:null,
  };

  const checkboxOptionsFullTime = [{ key: "Full Time", value: true }];

     const resourceRole = [{ key: 'Role', value: '' }]
    contextData[18].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    resourceRole.push(obj);
    });
  
    
     const requestStatus = [{ key: 'Status', value: '' }];
    contextData[17].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    requestStatus.push(obj);
  });
     
     
    const BillingCurrency = [{ key: 'Currency', value: '' }];
     contextData[4].map((item) => {
    let obj = {};
    obj["key"] = item.code;
    obj["value"] = item.id;
    BillingCurrency.push(obj);
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

     const reqPriority = [{ key: 'Priority', value: '' }];
      contextData[19].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    reqPriority.push(obj);
  });

  
const dropdownRequester= [
    { key: 'Requester', value: '' },
    { key: 'Requester1', value: '7b693dd7-0581-4f58-bc23-c557d14e5e53' },
    { key: 'Requester2', value: '49beac0e-a53e-4d32-bbfd-f13324279d6b' }
    ];
 

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/resource_requests`;

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
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Resource Requested', life: 3000 });
      
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
     requestor_id: Yup.string().required("Required"),
     requested_hours: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
    planned_bill_rate: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
    number_of_resources: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
    start_date: Yup.date(),
    end_date: Yup.date().min(
      Yup.ref("start_date"),
      "end date can't be before start date"
    ),
  });

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
    console.log(data)
    mutation.mutate(data);
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
                    label='Title'
                    name='title'
                  />
                  </div>

                  <div>  
                  <FormikControl
                    control='select'
                    label='Role'
                    name='resource_role'
                     options={resourceRole}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='input'
                    type='text'
                    label='Req. Experience '
                    name='required_experience_level'
                  />
                  </div>

                    <div className=" ">
                  <FormikControl
                    control="checkbox"
                    label="Full Time"
                    name="full_time"
                    options={checkboxOptionsFullTime}
                  />
                </div>

                  <div>  
                  <FormikControl
                    control='input'
                    type='number'
                    label='No. of Resources'
                    name='number_of_resources'
                  />
                  </div>

                  <div>  
                  <FormikControl
                    control='input'
                    type='number'
                    label='Requested Hours'
                    name='requested_hours'
                  />
                  </div>
                 

                 

                  <div>
                  <FormikControl
                    control='select'
                    label='Req. Priority'
                    name='request_priority'
                    options={reqPriority}
                  />
                  </div>

                   <div>
                  <FormikControl
                    control='select'
                    label='Status'
                    name='status'
                    options={requestStatus}
                  />
                  </div>
                

                

                  <div>
                  <FormikControl
                    control="select"
                    label="Billing Currency"
                    name="billing_currency"
                    options={BillingCurrency}
                  />
                </div>

                 <div>  
                  <FormikControl
                    control='input'
                    type='number'
                    label='Planned Bill rate'
                    name='planned_bill_rate'
                  />
                  </div>

            
                    <div>  
                  <FormikControl
                    control='input'
                    type='text'
                    label='Location'
                    name='location'
                  />
                  </div>
                
                    <div>  
                  <FormikControl
                    control='select'
                    label='Requester'
                    name='requestor_id'
                    options={dropdownRequester}
                  />
                  </div>
                 

                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Description"
                    name="description"
                  />
                </div>

                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Notes"
                    name="notes"
                  />
                </div>

                <h2 className="h2Form">Dates</h2>
                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Start Date"
                    name="start_date"
                  />
                </div>

                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="End Date"
                    name="end_date"
                  />
                </div>

                  <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Requested Date"
                    name="requested_date"
                  />
                </div>
               
               
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default AddResourceReq;
