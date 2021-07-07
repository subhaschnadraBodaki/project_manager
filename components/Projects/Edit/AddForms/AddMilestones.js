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

function AddMilestones({ projectId}) {

   const toast = useRef(null); 
    const contextData = useContext(Context);
  // --------------------------------------initial Values---------------------
  const initialValues = {
    estimated_effort_in_hours: '',
    name: '',
    milestone_planned_cost:'',
    billing_date: null,
    description: '',
    project_id: projectId,
    planned_due_date: null,
    owner: '',
    currency_code: '',
    notes:'',
    approver: '',
    requires_customer_signoff: false,
    approved_for_billing: false,
  };

  const checkboxOptionsTimeRecord = [{ key: "Customer Signoff", value: true }];

  const checkboxOptionsApprovedForBilling = [{ key: "Appr. for Billing", value: true }];

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

 const dropdownOptionsCurrency = [ { key: "Currency", value: "" }];
 contextData[4].map((item) => {
    let obj = {};
    obj["key"] = item.code;
    obj["value"] = item.id;
    dropdownOptionsCurrency.push(obj);
  });
  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/milestones`;

  const response = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      
      },
    });
  };

  const mutation = useMutation(response, {
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
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Milestone Added', life: 3000 });
       document.form.reset();
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
     owner: Yup.string().required("Required"),
     approver: Yup.string().required("Required"),
     milestone_planned_cost: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
    estimated_effort_in_hours: Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
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
        label='Milestone Name'
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
        type='text'
        label='Approver'
        name='approver'
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
        control='input'
        type='number'
        label='Planned Cost'
        name='milestone_planned_cost'
      />
      </div>


       <div>
                <FormikControl
                  control="select"
                  label="Currency"
                  name="currency_code"
                  options={dropdownOptionsCurrency}
                />
              </div>
    

                <div  >
                  <FormikControl
                    control="checkbox"
                    label="Requires Customer Signoff"
                    name="requires_customer_signoff"
                    options={checkboxOptionsTimeRecord}
                  />
                </div>

                  <div >
                  <FormikControl
                    control="checkbox"
                    label="Apprvd for Billing"
                    name="approved_for_billing"
                    options={checkboxOptionsApprovedForBilling}
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
                <div className="ml-3">
                  <FormikControl
                    control="input"
                    type='date'
                    label="Billing Date"
                    name="billing_date"
                  />
                </div>

                <div className="ml-3">
                  <FormikControl
                    control="input"
                    type='date'
                    label="Planned Due Date"
                    name="planned_due_date"
                  />
                </div>
               
                {/* <div className="text-right mt-5  col-span-2 mr-10 ">
                  <button type="submit" class="btn">
                    Save and Continue
                  </button>
                </div> */}
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default AddMilestones;
