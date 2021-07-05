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

function EditChangeReq({ projectId,editData}) {

   const toast = useRef(null); 
  // --------------------------------------initial Values---------------------
  const initialValues = editData

  const checkboxOptionsApproval = [{ key: "Approval", value: true }];

  const checkboxOptionsStatusReport = [{ key: "Prj. Status Report", value: true }];


 const dropdownOptionsImpact = [
    { key: "Impact", value: "" },
    { key: "ALL", value: "1" },
    { key: "USD", value: "2" },
  ];


  const   dropdownOptionsState = [
    { key: "state", value: "" },
    { key: "ALL", value: "1" },
    { key: "USD", value: "2" },
  ];

  const   dropdownOptionsCategory = [
    { key: "Category", value: "" },
    { key: "ALL", value: "1" },
    { key: "USD", value: "2" },
  ];

  const   dropdownOptionsReqPriority = [
    { key: "Change Req. Priority", value: "" },
    { key: "ALL", value: "1" },
    { key: "USD", value: "2" },
  ];
  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/change_requests?id=eq.${editData.id}`;

  const response = (data) => {
    return axios.patch(url, data, {
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
      console.log("onSettled", data, error);
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
     assigned_to: Yup.string().required("Required"),
    estimated_cost: Yup.string().test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
   
  });

  // ----------------------------------onSubmit-------------------------
  const onSubmit = data => {
    console.log(data)
    mutation.mutate(data);
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Successfully Updated', life: 3000 });
      
 
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
        label='Title'
        name='title'
      />
      </div>

      <div>  
      <FormikControl
        control='input'
        type='text'
        label='Assign to'
        name='assigned_to'
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
        control="select"
        label="Category"
        name="category"
        options={dropdownOptionsCategory}
         />
        </div>
       
      

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Est. Cost'
        name='estimated_cost'
      />
      </div>


       <div>
        <FormikControl
        control="select"
        label="State"
        name="state"
        options={dropdownOptionsState}
         />
        </div>

          <div>
        <FormikControl
        control="select"
        label="Impact"
        name="impact"
        options={dropdownOptionsImpact}
         />
        </div>

          <div>
        <FormikControl
        control="select"
        label="Req. Priority"
        name="change_request_priority"
        options={dropdownOptionsReqPriority}
         />
        </div>
    

                <div  >
                  <FormikControl
                    control="checkbox"
                    label="Approval"
                    name="approval"
                    options={checkboxOptionsApproval}
                  />
                </div>

                  <div >
                  <FormikControl
                    control="checkbox"
                    label="Prj. Status Report"
                    name="show_on_project_status_report"
                    options={ checkboxOptionsStatusReport}
                  />
                </div>
                    
                    <div className=" col-span-2">
                  <FormikControl
                    control="textarea"
                    label="Business jst."
                    name="business_justification"
                  />
                </div>

                 <div className=" col-span-2">
                  <FormikControl
                    control="textarea"
                    label="Description"
                    name="description"
                  />
                </div>

                <div className=" col-span-2">
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
                    label="Due Date"
                    name="due_date"
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

export default EditChangeReq;
