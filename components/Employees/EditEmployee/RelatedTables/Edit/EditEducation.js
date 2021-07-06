import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import FormikControl from "../../../../FormComponents/FormikControl";

const EditEducation = ({ employeeId, qualification, qualificationStatus, editEducation }) => {
  const toast = useRef(null);
  const initialValues = editEducation

  //    -----------Options----------------

  const dropdownForqualification = [{ key: "Qualification", value: "" }];
  qualification.map((qual) => {
    let obj1 = {};
    obj1["key"] = qual.key;
    obj1["value"] = qual.value;
    dropdownForqualification.push(obj1);
  });

  const dropdownForqualificationStatus = [{ key: "Qualification Status", value: "" }];
  qualificationStatus.map((qualStatus) => {
    let obj2 = {};
    obj2["key"] = qualStatus.key;
    obj2["value"] = qualStatus.value;
    dropdownForqualificationStatus.push(obj2);
  });

  // ---------------validation Schema------------------------

  const validationSchema = Yup.object({});

  // -----------Post data-----------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/education?id=eq.${editEducation.id}`;

  const EditEducation = (data) => {
    return axios.patch(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(EditEducation, {
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
      if (data) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Details Updated",
          life: 3000,
        });
      }
    },
  });

  const onSubmit = (data, submitProps) => {
    mutation.mutate(data);
    submitProps.setSubmitting(false);
    submitProps.resetForm()
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
              <Form
                id="editEducation"
                name="form"
                className="formGridModal"
                autoComplete="off"
              >
                <div>
                  <FormikControl
                    control="select"
                    label="Qualification"
                    name="qualification"
                    options={dropdownForqualification}
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Institute Name"
                    name="institute_name"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Board University"
                    name="board_university"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Percentage of Marks"
                    name="percentage_of_marks"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Year of Passing"
                    name="year_of_passing"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Grades"
                    name="grades"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Specilization"
                    name="specilization"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    label="Status"
                    name="status"
                    options={dropdownForqualificationStatus}
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
    </>
  );
};

export default EditEducation;
