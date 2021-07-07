import React from "react";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import FormikControl from "../../../FormComponents/FormikControl";
import * as Yup from "yup";
import { Toast } from 'primereact/toast';
import {useRef} from 'react'
import {useContext} from 'react'
import {Context} from '../../../../pages/projects/edit/[pid]'

function AddRisks({ projectId }) {
  const toast = useRef(null); 
   const contextData = useContext(Context);
  // --------------------------------------initial Values---------------------
  const initialValues = {
    project_id : projectId,
    estimated_cost: '',
    currency: null,
    risk_rank: '',
    assigned_to : '',
    risk_value: '',
    show_on_project_status_report: false,
    description: "",
    notes: "",
    owner:'',
    due_date: null
  };

  // -------------------------- Static Select Options----------------------------

const checkboxOptionsStatusReport = [{ key: "Status Report", value: true }];


 const dropdownOptionsCurrency = [ { key: "Currency", value: "" }];
 contextData[4].map((item) => {
    let obj = {};
    obj["key"] = item.code;
    obj["value"] = item.id;
    dropdownOptionsCurrency.push(obj);
  });


  const dropdownState = [{ key: "state", value: "" }];
   contextData[5].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownState.push(obj);
  });

  

 

  const dropdownImpact = [{ key: "Impact", value: '' }];
   contextData[6].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownImpact.push(obj);
  });


 const dropdownProbability = [{ key: "Probability", value: "" }];
   contextData[7].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownProbability.push(obj);
  });

const dropdownStatus = [{ key: "status", value: "" }];
   contextData[8].map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownStatus.push(obj);
  });



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
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Risk Added', life: 3000 });
    },
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    owner: Yup.string().required("Required"),
    assigned_to: Yup.string().required("Required"),
    risk_rank:  Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
     risk_value:  Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
     estimated_cost:  Yup.string().required("Required").test(
      "Is positive?",
      " The Number must be positive",
      (value) => value >= 0
    ),
  });

  // ----------------------------------onSubmit-------------------------
  const onSubmit = (data) => {
    console.log(data);
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
        {(formik) => {
          return (
            <div className="  justify-items-center container w-full mx-auto   ">
             

              <Form name="form" 
                className="formGridModal"
                id="a-form"
                autoComplete="off"
              >
                <h2 className="h2FormModal">Basic Details</h2>

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
                    control="select"
                    label="Currency"
                    name="currency"
                    options={dropdownOptionsCurrency}
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
                    type="date"
                    label="Due Date"
                    name="due_date"
                  />
                </div>

                <div>
                  <FormikControl
                    control="checkbox"
                    label="Status Report"
                    name="show_on_project_status_report"
                    options={checkboxOptionsStatusReport}
                  />
                </div>

                <div className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
                    label="Description"
                    name="description"
                  />
                </div>

                <div  className=" col-span-2 md:ml-5">
                  <FormikControl
                    control="textarea"
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
