import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

function AddTask({ projectId, tasksData }, props) {
  // --------------------------------------initial Values---------------------
  const initialValues = {
    estimated_effort_in_hours: null,
    name: '',
    // associated_milestone:'',
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
      console.log("onSettled", data, error);
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),

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

 
    };

    // -------------------------------Form----------------------------
 return (
   <>
    <Formik
      initialValues={initialValues}
    //    validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
    <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
    <div className=" shadow-sm py-6 text-blue-900 ">
    <h2 className="text-2xl text-center  font-semibold px-20">Add Task</h2>
    </div>
   

    <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12  
     md:gap-y-4 py-6   md:ml-0" autoComplete="off">
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
        label='Estimated Effort in hours'
        name='estimated_effort_in_hours'
      />
      </div>
       
      

      <div>
      <FormikControl
        control='input'
        type='number'
        label='Story ID'
        name='story_id'
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

                <div className=" mt-3">
                  <FormikControl
                    control="checkbox"
                    label="Time Recording"
                    name="time_recording_allowed"
                    options={checkboxOptionsTimeRecord}
                  />
                </div>

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
                    label="Parent Task"
                    name="parent_task"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Sucecssor Task"
                    name="sucecssor_task"
                  />
                </div>

                <h2 className="h2Form">Dates</h2>
                <div className="ml-3">
                  <FormikControl
                    control="date"
                    label="Planned Start Date"
                    name="planned_start_date"
                  />
                </div>

                <div className="ml-3">
                  <FormikControl
                    control="date"
                    label="Planned End Date"
                    name="planned_end_date"
                  />
                </div>

                <div className="text-right mt-5  col-span-2 mr-20 ">
                  <button type="submit" class="btn">
                    Add
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
