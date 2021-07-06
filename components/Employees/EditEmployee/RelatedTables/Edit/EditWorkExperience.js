import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import { Toast } from "primereact/toast";
import {useRef} from 'react'
import FormikControl from "../../../../FormComponents/FormikControl";

const EditWorkExperience = ({ employmentType, designation, editTask }) => {
  const toast = useRef(null);
  // Initial Values
  const initialValues = editTask;
  // console.log(initialValues);

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

  //---------------validation Schema------------------
  const validationSchema = Yup.object({});

  // -----------Database-------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/work_experience?id=eq.${editTask.id}`;

  const editWorkExperience = (data) => {
    return axios.patch(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(editWorkExperience, {
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
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Experience Updated",
        life: 3000,
      });
    },
  });

  const onSubmit = (data, submitProps) => {
    mutation.mutate(data);
    submitProps.setSubmitting(false);
    // submitProps.resetForm()
  };

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
          <div className="justify-items-center container w-full mx-auto">
            <Form id="editWorkExp" className="formGridModal" autoComplete="off">
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

              <div className="col-span-2 ">
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
          </div>
        );
      }}
    </Formik>
    </>
  );
};

export default EditWorkExperience;
