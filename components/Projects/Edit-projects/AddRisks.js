import React from "react";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import FormikControl from "../../FormComponents/FormikControl";
import * as Yup from "yup";
import { Toast } from 'primereact/toast';
import {useRef} from 'react'

function AddRisks({ projectId }) {
  const toast = useRef(null); 
  // --------------------------------------initial Values---------------------
  const initialValues = {
    project_id : projectId,
    estimated_cost: null,
    currency: null,
    risk_rank: null,
    assigned_to : '',
    risk_value: null,
    show_on_project_status_report: false,
    description: "",
    notes: "",
  };

  // -------------------------- Static Select Options----------------------------

  const dropdownState = [
    { key: "state", value: "" },
    { key: "Open", value: "Open" },
    { key: "Work in Progress", value: "Work in Progress" },
    { key: "Closed Complete", value: "Closed Complete" },
    { key: "Closed InComplete", value: "Closed InComplete" },
    { key: "Closed Skipped", value: "Closed Skipped" },
  ];

  const dropdownStatus = [
    { key: "state", value: "" },
    { key: "Pending", value: "Pending" },
    { key: "Achieved", value: "Achieved" },
    { key: "Not Achieved", value: "Not Achieved" },
    { key: "Avoid", value: "Aviod" },
    { key: "Mitigate", value: "Mitigate" },
    { key: "Tranasfer", value: "Tranasfer" },
    { key: "Accept", value: "Accept" },
  ];

  const dropdownProbability = [
    { key: "Probability", value: "" },
    { key: "Low", value: "Low" },
    { key: "Moderate", value: "Moderate" },
    { key: "High", value: "High" },
    { key: "Absolute", value: "Absolute" },
  ];

  const dropdownImpact = [
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: 5, value: 5 },
  ];

  const checkboxOptionsStatus = [
    { key: "Status Report", value: true }
  ];

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/risks`;

  const addRisk = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addRisk, {
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
    state: Yup.string().required("Required"),
  });

  // ----------------------------------onSubmit-------------------------
  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Risk Added', life: 3000 });
    
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
        {(formik) => {
          return (
            <div className="  justify-items-center container w-full mx-auto   ">
             

              <Form name="form" id="a-form"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12  
                  md:gap-y-4 py-6   md:ml-0"
                autoComplete="off"
              >
                <h2 className="h2FormModal">Basic Details</h2>

             

                <div>
                  <FormikControl
                    control="select"
                    label="state"
                    name="state"
                    options={dropdownState}
                  />
                </div>

                <div>
                  <FormikControl
                    control="select"
                    label="status"
                    name="status"
                    options={dropdownStatus}
                  />
                </div>

                <div>
                  <FormikControl
                    control="select"
                    label="Probability"
                    name="probability"
                    options={dropdownProbability}
                  />
                </div>

                <div>
                  <FormikControl
                    control="select"
                    label="Impact"
                    name="impact"
                    options={dropdownImpact}
                  />
                </div>
                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Estimated Cost"
                    name="estimated_cost"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Currency"
                    name="currency"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Risk rank "
                    name="risk_rank"
                  />
                </div>


                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Risk Value"
                    name="risk_value"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Assigned To"
                    name="assigned_to"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="bool"
                    label="Status Report"
                    name="show_on_project_status_report"
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
                    type="text"
                    label="Notes"
                    name="notes"
                  />
                </div>

                {/* <div className="text-right mt-5  col-span-2 mr-10 ">
                  <button type="submit" class="btn" disabled={!formik.isValid}>
                    Save And Continue
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

export default AddRisks;
