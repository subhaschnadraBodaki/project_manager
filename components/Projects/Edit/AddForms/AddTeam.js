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


function AddTeam({ projectId}) {

   const toast = useRef(null); 
  
  // --------------------------------------initial Values---------------------
  const initialValues = {
    notes: '',
    project_id: projectId,
    planned_end_date: null,
    planned_start_date: null,
    team_member: '',
    full_time: false,
    active: false,
    allocation_percentage:''
  };

  const checkboxFullTime = [{ key: "Full Time", value: true }];

  const checkboxActive = [{ key: "Active", value: true }];

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/project_team_members`;

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
      console.log("onSettled", data, error);
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Team Added', life: 3000 });
       document.form.reset();
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
     team_member: Yup.string().required("Required"),
     allocation_percentage: Yup.string().required("Required").test(
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
                  label='Team Member'
                  name='team_member'
                />
                </div>

                <div className=" ">
                  <FormikControl
                    control="checkbox"
                    label="Active"
                    name="active"
                    options={checkboxActive}
                  />
                </div>

                <div>  
                <FormikControl
                  control='input'
                  type='number'
                  label='Allocation %'
                  name='allocation_percentage'
                />
                </div>
                
                
                 <div className=" ">
                  <FormikControl
                    control="checkbox"
                    label="Full Time"
                    name="full_time"
                    options={checkboxFullTime}
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
                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Planned Start Date"
                    name="planned_start_date"
                  />
                </div>

                <div className="ml-3">
                  <FormikControl
                    control="input"
                    type='date'
                    label="Planned End Date"
                    name="planned_end_date"
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

export default AddTeam;
