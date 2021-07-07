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

function AddPrjStatusReport({ projectId}) {

   const toast = useRef(null); 
  const contextData = useContext(Context);
    
  // --------------------------------------initial Values---------------------
  const initialValues = {
    project_id: projectId,
    billing_status:null,
    budget_status:null,
    billing_status_notes:'',
    budget_status_notes:'',

   
  };

  

   const  dropdownStatus = [{ key: 'Status', value: '' }];
    contextData[20].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownStatus.push(obj);
  });
     
     
   
 

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/project_status_reports`;

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
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Status Report Added', life: 3000 });
       
    },
  });

  // -------------------------------Validation Schema------------------------

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Required"),
//     //  owner: Yup.string().required("Required"),
//      estimated_effort_in_hours: Yup.string().required("Required").test(
//       "Is positive?",
//       " The Number must be positive",
//       (value) => value >= 0
//     ),
//     planned_start_date: Yup.date(),
//     planned_end_date: Yup.date().min(
//       Yup.ref("planned_start_date"),
//       "end date can't be before start date"
//     ),
//   });

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
    //   validationSchema={validationSchema}
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

                   <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Reporting Date"
                    name="reporting_date"
                  />
                  </div>
                  
                  <div>  
                  <FormikControl
                    control='select'
                    label='Billing Status'
                    name='billing_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Budget Status'
                    name='budget_status'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Billing Status Notes"
                    name="billing_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Budget Status Notes"
                    name="budget_status_notes"
                  />
                </div>

                 <div>  
                  <FormikControl
                    control='select'
                    label='Cost Status'
                    name='cost_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Custom Status 1'
                    name='custom_status1'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Cost Status Notes"
                    name="cost_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Custom Status 1 Notes"
                    name="custom_status1_notes"
                  />
                </div>

                
                 <div>  
                  <FormikControl
                    control='select'
                    label='Custom Status 2'
                    name='custom_status2'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Custom Status 3'
                    name='custom_status3'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Custom Status 2 Notes"
                    name="custom_status2_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Custom Status 3 Notes"
                    name="custom_status3_notes"
                  />
                </div>

                <div>  
                  <FormikControl
                    control='select'
                    label='Custom Status 4'
                    name='custom_status4'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Custom Status 5'
                    name='custom_status5'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Custom Status 4 Notes"
                    name="custom_status4_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Custom Status 5 Notes"
                    name="custom_status5_notes"
                  />
                </div>

                 <div>  
                  <FormikControl
                    control='select'
                    label='Deliverable Status'
                    name='deliverables_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Effort Status'
                    name='effort_status'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="deli. Status Notes"
                    name="deliverables_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Effort Status Notes"
                    name="effort_status_notes"
                  />
                </div>

                 <div>  
                  <FormikControl
                    control='select'
                    label='Issues Status'
                    name='issues_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Milestone Status'
                    name='milestone_status'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Issues Status Notes"
                    name="issues_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Milestone Status Notes"
                    name="milestone_status_notes"
                  />
                </div>

                  <div>  
                  <FormikControl
                    control='select'
                    label='Prj. Overall Status'
                    name='project_overall_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Quality Status'
                    name='quality_status'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Prj. Overall  Notes"
                    name="project_overall_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Quality Status Notes"
                    name="quality_status_notes"
                  />
                </div>

                <div>  
                  <FormikControl
                    control='select'
                    label='Resource Status'
                    name='resource_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Risk Status'
                    name='risks_status'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Resource Status Notes"
                    name="resource_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Risk Status Notes"
                    name="risks_status_notes"
                  />
                </div>

                <div>  
                  <FormikControl
                    control='select'
                    label='Schedule Status'
                    name='schedule_status'
                     options={dropdownStatus}
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Scope Management'
                    name='scope_management_status'
                     options={dropdownStatus}
                  />
                  </div>

                
                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Schedule Status Notes"
                    name="schedule_status_notes"
                  />
                </div>

                 <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Scope Management Notes"
                    name="scope_management_status_notes"
                  />
                </div>

                 <div>
                  <FormikControl
                    control='input'
                    type='text'
                    label='% Complete'
                    name='percentage_of_completion'
                  />
                  </div>

                   <div>  
                  <FormikControl
                    control='select'
                    label='Customer Satisfaction'
                    name='customer_statisfaction_status'
                     options={dropdownStatus}
                  />
                  </div>

                <h2 className="h2Form">Dates</h2>
                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Period End Date"
                    name="period_start_date"
                  />
                </div>

                <div >
                  <FormikControl
                    control="input"
                    type='date'
                    label="Period End Date"
                    name="period_end_date"
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

export default AddPrjStatusReport;
