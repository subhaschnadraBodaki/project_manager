
import React from "react";
import { Formik, Form, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { Toast } from 'primereact/toast';
import {useRef} from 'react'
import {useState} from 'react'
import formTypeFxn from "./Edit/Tabs/RelatedTables/FormType";

function ProjectForm({ 
 currencydata,
 accountdata, 
 projectManager,
 projectPhase,
 projectType,
 projectBillingType,
 opportunity }) {
    const toast = useRef(null); 
    console.log(opportunity)
    
  // --------------------------------------initial Values---------------------
  const initialValues = {
    name: "",
    project_code: "",
    description: "",
    planned_hours: "",
    planned_revenue: "",
    planned_start_date: null,
    planned_end_date: null,
    billable: false,
    active: false,
    region: "",
    project_notes: "",
    account_id:null
  };
  const[oppValue,setoppValue] = useState(4)
  // -----------------------------Dynamic Select Options-----------------------

  // --------------Account Id--------------
  let dropdownOptionsAccountId = [{ key: "Account", value: "" }];
  accountdata.map((item)=> {
    let obj = {};
    obj["key"] = item.account_name;
    obj["value"] = item.id;
    dropdownOptionsAccountId.push(obj);
  });

  //   ---------------Currency--------------
  let dropdownOptionsCurrency = [{ key: "Currency", value: "" }];
  currencydata.map((item)=> {
    let obj = {};
    obj["key"] = item.code;
    obj["value"] = item.id;
    dropdownOptionsCurrency.push(obj);
  });

  // ---------------Project Manager-----------
  let dropdownProjectManager = [{ key: "Project Manager", value: "" }];
  projectManager.filter(item=> item.role === 'Software Developer').map((Fitem)=> {
    let obj = {};
    obj["key"] = Fitem.first_name;
    obj["value"] = Fitem.user_id;
    dropdownProjectManager.push(obj);
  });


   let dropdownOptionsProjectPhase = [{ key: "Project Phase", value: "" }];
  projectPhase.map((item)=> {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsProjectPhase.push(obj);
  });

   let dropdownOptionsbillable = [{ key: "Billing Type", value: "" }];
  projectBillingType.map((item) =>{
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsbillable.push(obj);
  });

  let dropdownOptionsProjectType = [{ key: "Project Type", value: "" }];
   projectType.map((item) => {
    let obj = {};
    obj["key"] = item.key;
    obj["value"] = item.value;
    dropdownOptionsProjectType.push(obj);
  });

  
  const dropdownOpportunity = [{ key: "opportunity", value: "" }];
  opportunity.filter(item=> item.account_id === 4).map((item)=> {
    let obj = {};
    obj["key"] = item.name;
    obj["value"] = item.name;
    dropdownOpportunity.push(obj);
  }); 
  
  // -------------------------- Static Select Options----------------------------

 
  const checkboxOptionsBillable = [{ key: "Billable", value: true }];

  const statusOptions = [{ key: "Active", value: true }];

 

  const dropdownRegion = [
    { key: "Region", value: "" },
    { key: "Benglore", value: "Benglore" },
    { key: "Noida", value: "Noida" },
  ];

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects`;

  const addproject = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addproject, {
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
    project_code: Yup.string()
      .required("Required")
      .test(
        "Is positive?",
        " The Project Code must be greater than 0!",
        (value) => value > 0
      ),
    project_manager_id: Yup.string().required("Required"),
    planned_revenue: Yup.string()
      .max(14, "Must be 14 digits or less")
      .test(
        "Is positive?",
        " Amount must be greater than 0!",
        (value) => value > 0 
      ),
    planned_hours: Yup.string().test(
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
  const onSubmit = (data) => {
    console.log(data);

    mutation.mutate(data);
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Task Added', life: 3000 });
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
          <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
            <div className=" shadow-sm py-6 text-blue-900 ">
              <h2 className="text-2xl text-center  font-semibold px-20">
                Add Project Details
              </h2>
            </div>

            <Form
              className="formGrid"
               name="form"
              autoComplete="off"
            >
              <h2 className="h2Form">Basic Details</h2>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Project name"
                  name="name"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="number"
                  label="Project code"
                  name="project_code"
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Project Type"
                  name="project_type"
                  options={dropdownOptionsProjectType}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Project Phase"
                  name="project_phase"
                  options={dropdownOptionsProjectPhase}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Project manager"
                  name="project_manager_id"
                  options={dropdownProjectManager}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Account"
                  name="account_id"
                  
                  options={dropdownOptionsAccountId}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Billing Type"
                  name="billing_type"
                  options={dropdownOptionsbillable}
                />
              </div>

              <div className=" mt-3">
                <FormikControl
                  control="checkbox"
                  label="Billable"
                  name="billable"
                  options={checkboxOptionsBillable}
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

              <div className=" mb-3">
                <FormikControl
                  control="checkbox"
                  label="Active"
                  name="active"
                  options={statusOptions}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Opportunity"
                  name="opportunity"
                  options={dropdownOpportunity}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Region"
                  name="region"
                  options={dropdownRegion}
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
                  label="Project Notes"
                  name="project_notes"
                />
              </div>

              <h2 className="h2Form">Effort and Budget</h2>
              <div>
                <FormikControl
                  control="input"
                  type="number"
                  label="Planned hours"
                  name="planned_hours"
                />
              </div>
              <div>
                <FormikControl
                  control="input"
                  type="number"
                  label="Planned revenue"
                  name="planned_revenue"
                  placeholder="Amount"
                />
              </div>

              <h2 className="h2Form">Dates</h2>
              <div className="ml-3">
                <FormikControl
                  control="input"
                  type="date"
                  label="Planned Start Date"
                  name="planned_start_date"
                />
              </div>

              <div className="ml-3">
                <FormikControl
                  control="input"
                  type="date"
                  label="Planned End Date"
                  name="planned_end_date"
                />
              </div>

              <div className="text-right mt-5  col-span-2 mr-20 ">
                <button
                  type="submit"
                  className="btn"
                  disabled={!formik.isValid}
                >
                  Submit
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



export default ProjectForm;

