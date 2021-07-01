import React,{useState} from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import FormikControl from '../../../../FormComponents/FormikControl'


const AddWorkExperience = ({employeeId, employmentType, designation}) => {
  console.log(employeeId);
  // Initial Values
  const initialValues = {
    employee_id: null,
    organization: "",
    no_of_years: null,
    start_date: null,
    end_date: null,
    employment_type: "",
    description: "",
    website: "",
    designation: "",
  };

  // -----------------Options-----------------

  const dropdownForEmploymentType = [{ key: "Employment Type", value: "" }];
  employmentType.map((empType) => {
    let obj1 = {};
    obj1["key"] = empType.key;
    obj1["value"] = empType.value;
    dropdownForEmploymentType.push(obj1);
  });

  const dropdownForDesignation = [{ key: "Designation", value: "" }];
  designation.map((desc) => {
    let obj2 = {};
    obj2["key"] = desc.key;
    obj2["value"] = desc.key;
    dropdownForDesignation.push(obj2);
  });

  //   validation Schema
  const validationSchema = Yup.object({});

  // -----------Database-------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/work_experience`;

  const addWorkExperience = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addWorkExperience, {
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

  const onSubmit = (data, submitProps) => {
    mutation.mutate(data);
    submitProps.setSubmitting(false);
    // submitProps.resetForm()
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        <div className="min-h-screen  justify-items-center container w-full mx-auto">
          <div className=" shadow-sm py-6 text-blue-900 ">
            <h2 className="text-2xl text-center  font-semibold px-20">
              Add WorkExperience Details
            </h2>
          </div>
          <Form className="formGrid" autoComplete="off">
            <h2 className="h2Form">Basic Details</h2>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Employee Id"
                name="employee_id"
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Organization"
                name="organization"
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="number"
                label="No of Years"
                name="no_of_years"
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="date"
                label="Start Date"
                name="start_date"
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="date"
                label="End Date"
                name="end_date"
              />
            </div>

            <div>
              <FormikControl
                control="select"
                label="Employment Type"
                name="employment_type"
                options={dropdownForEmploymentType}
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Website"
                name="website"
              />
            </div>

            <div>
              <FormikControl
                control="select"
                label="Designation"
                name="first_name"
                options={dropdownForDesignation}
              />
            </div>

            <div>
              <FormikControl
                control="textarea"
                type="text"
                label="Description"
                name="description"
              />
            </div>

            <div className="text-right mt-5  col-span-2 mr-20 ">
              <button
                type="submit"
                className="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>;
      }}
    </Formik>
  );
};

export default AddWorkExperience;
