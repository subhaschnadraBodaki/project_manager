import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import FormikControl from "../../../../FormComponents/FormikControl";
import { mutate } from "swr";

const AddEducation = ({ employeeId, qualification, qualificationStatus }) => {
  const toast = useRef(null);
  const initialValues = {
    employee_id: employeeId,
    institute_name: "",
    board_university: "",
    percentage_of_marks: null,
    year_of_passing: null,
    grades: "",
    specilization: "",
    description: "",
  };

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

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/education`;

  const addEducation = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const onSubmit = async (data, submitProps) => {
    // mutation.mutate(data);
    try {
      const res = await mutate(url, addEducation(data));
      console.log(res);

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Education details Added",
        life: 3000,
      });
    } catch (error) {
        console.log(error);
    }

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
                id="AddEducation"
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
                    label="Perc. of Marks"
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
                    control="select"
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

                {/* <div className="text-right mt-5  col-span-2 mr-20 ">
            <button
              type="submit"
              className="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </div> */}
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEducation;
