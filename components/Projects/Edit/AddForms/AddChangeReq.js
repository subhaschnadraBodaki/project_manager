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

function AddChangeReq({ projectId}) {

   const toast = useRef(null); 
      const contextData = useContext(Context);
  // --------------------------------------initial Values---------------------
  const initialValues = {
    project_id: projectId,
    description: '',
    business_justification:'',
    assigned_to:'',
    approval: false,
    due_date:null,
    estimated_cost:'',
    notes:'',
    title:'',
    show_on_project_status_report:false
  };

  const checkboxOptionsApproval = [{ key: "Approval", value: true }];

  const checkboxOptionsStatusReport = [{ key: "Prj. Status Report", value: true }];




  const   dropdownOptionsCategory = [{ key: "Category", value: "" }];
  contextData[9].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsCategory.push(obj);
  });

  const   dropdownOptionsReqPriority = [{ key: "Change Req. Priority", value: "" }];
  contextData[10].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsReqPriority.push(obj);
  });


   const dropdownOptionsImpact = [{ key: "Impact", value: "" }];
  contextData[11].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsImpact.push(obj);
  });


  const   dropdownOptionsState = [{ key: "state", value: "" }];
  contextData[12].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsState.push(obj);
  });
  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/change_requests`;

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
      
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Successfully Added', life: 3000 });
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
        control='input'
        type='text'
        label='Assign to'
        name='assigned_to'
      />
      </div>

      
       <div className="ml-3">
        <FormikControl
        control="input"
        type='date'
        label="Due Date"
        name="due_date"
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
                    
                    <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Business jst."
                    name="business_justification"
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

export default AddChangeReq;
