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

function EditMilestones({ projectId,editData}) {

   const toast = useRef(null); 
   console.log(editData)
  // --------------------------------------initial Values---------------------
  const initialValues =  editData;
//    {
//     actual_effort_in_hours: editData.actual_effort_in_hours,
//     actual_due_date: null,
//     approved_for_billing: false,
//     name: '',
//     milestone_billing_amount:'',
//     billing_date: null,
//     description: '',
//     project_id: projectId,
//     planned_due_date: null,
//     owner: '',
//     billed: false,
//     currency_code: '',
//     notes:'',
//     // approver: '',
//     percentage_of_completion: '',
//     approved: false,
//     requires_customer_signoff: false,
//   };

   const checkboxOptionsTimeRecord = [{ key: "Customer Signoff", value: true }];

  const checkboxOptionsApprovedForBilling = [{ key: "Approved for Billing", value: true }];

  const checkboxOptionsBilled = [{ key: "Billed", value: true }];

  const checkboxOptionsApproved = [{ key: "Approved", value: true }];

  // -----------------------------Post Data--------------------------------

 const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/milestones?id=eq.${editData.id}`

  const response = (data)=>{
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
      console.log("onSettled", data, error);
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
     owner: Yup.string().required("Required"),
   
  });

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
    console.log(data)
    mutation.mutate(data);
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Milestone Added', life: 3000 });
      
 
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
    
   

    <Form  className="formGridModal" id="a-form" autoComplete="off">

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
        label='Actual Eft. in hours'
        name='actual_effort_in_hours'
      />
      </div>
       
      

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Billing Amount'
        name='milestone_billing_amount'
      />
      </div>
    
{/* 
      <div>
      <FormikControl
        control='input'
        type='number'
        label='Associated Milestone'
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
                    control="textarea"
                    label="Description"
                    name="description"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Currency"
                    name="currency_code"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="% Complete"
                    name="percentage_of_completion"
                  />
                </div>

                <div >
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
                    label="Approved for Billing"
                    name="approved_for_billing"
                    options={checkboxOptionsApprovedForBilling}
                  />
                </div>
              

                    <div >
                  <FormikControl
                    control="checkbox"
                    label="Billed"
                    name="billed"
                    options={checkboxOptionsBilled}
                  />
                </div>


                  <div >
                  <FormikControl
                    control="checkbox"
                    label="Approved"
                    name="approved"
                    options={checkboxOptionsApproved}
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
                    label="Actual Due Date"
                    name="actual_due_date"
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
export default EditMilestones;
