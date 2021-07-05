import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import FormikControl from '../../../../FormComponents/FormikControl'

const EditEmployeeIdentity = ({ employeeId,identityType, countries, editIdentity }) => {
  const initialValues = editIdentity

  //    -----------Options----------------

  const dropdownForType = [{ key: "Identity Type", value: "" }];
  identityType.map((t) => {
    let obj1 = {};
    obj1["key"] = t.key;
    obj1["value"] = t.value;
    dropdownForType.push(obj1);
  });

  const dropdownForCountries = [{ key: "Select Country", value: "" }];
  countries.map((country) => {
    let obj4 = {};
    obj4["key"] = country.name;
    obj4["value"] = country.code;
    dropdownForCountries.push(obj4);
  });

  const activeOption = [{ key: "Active", value: true }];

  // ---------------validation Schema------------------------

  const validationSchema = Yup.object({});

  // -----------Post data-----------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employee_identity?id=eq.${editIdentity.id}`;

  const editIdentityOfEmployee = (data) => {
    return axios.patch(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(editIdentityOfEmployee, {
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
      return (
        <div className="justify-items-center container w-full mx-auto">
          <Form
            id="editIdentity"
            name="form"
            className="formGridModal"
            autoComplete="off"
          >
            
            <div>
              <FormikControl
                control="select"
                label="Addr Type"
                name="type"
                options={dropdownForType}
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Identity No"
                name="identity_no"
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Name"
                name="name"
              />
            </div>


            <div>
              <FormikControl
                control="input"
                type="date"
                label="Validity"
                name="validity"
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Issuing Authority"
                name="issuing_authority"
              />
            </div>

            <div>
              <FormikControl
                control="select"
                label="Issuing Country"
                name="issuing_country"
                options={dropdownForCountries}
              />
            </div>

            <div className=" mb-3">
                <FormikControl
                  control="checkbox"
                  label="Active"
                  name="active"
                  options={activeOption}
                />
              </div>

              <div className="col-span-2">
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
  )
};

export default EditEmployeeIdentity;
