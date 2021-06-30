import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

const EditEmployee = ({
  education,
  employmentStatus,
  jobTitles,
  countries,
  employees,
  employeeData
}) => {

    const employeeId = employeeData[0].employee_id;
  // -------------------------Initaial Values----------------------------
  const initialValues = employeeData[0]

  // ---------------Options----------------------------

  const dropDownForEducation = [{ key: "Education", value: "" }];
  education.map((educ) => {
    let obj1 = {};
    obj1["key"] = educ.name;
    obj1["value"] = educ.code;
    dropDownForEducation.push(obj1);
  });

  const dropDownForEmploymentStatus = [{ key: "Employment Status", value: "" }];
  employmentStatus.map((employment) => {
    let obj2 = {};
    obj2["key"] = employment.name;
    obj2["value"] = employment.code;
    dropDownForEmploymentStatus.push(obj2);
  });

  const dropDownForJobTitles = [{ key: "Job Titles", value: "" }];
  jobTitles.map((jobTitle) => {
    let obj3 = {};
    obj3["key"] = jobTitle.name;
    obj3["value"] = jobTitle.code;
    dropDownForJobTitles.push(obj3);
  });

  const dropdownForCountries = [{ key: "Select Country", value: "" }];
  countries.map((country) => {
    let obj4 = {};
    obj4["key"] = country.name;
    obj4["value"] = country.code;
    dropdownForCountries.push(obj4);
  });

  const dropDownForEmployees = [{ key: "Employees", value: "" }];
  employees.map((employee) => {
    let obj5 = {};
    obj5["key"] = employee.first_name;
    obj5["value"] = employee.employee_id;
    dropDownForEmployees.push(obj5);
  });

  const dropdownForNationality = [
    { key: "Nationality", value: "" },
    { key: "Indian", value: "Indian" },
    { key: "British", value: "British" },
    { key: "American", value: "American" },
  ];

  const dropdownForGender = [
    { key: "Gender", value: "" },
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Unspecified", value: "Unspecified" },
  ];

  const dropdownForMartialStatus = [
    { key: "Martial Status", value: "" },
    { key: "Single", value: "Single" },
    { key: "Married", value: "Married" },
    { key: "Divorced", value: "Divorced" },
    { key: "Widowed", value: "Widowed" },
    { key: "Other", value: "Other" },
  ];

  const dropdownForJobRoles = [
    { key: "Job Role", value: "" },
    { key: "Business Analyst", value: "Business Analyst" },
    { key: "CTO", value: "CTO" },
    { key: "Product Manager", value: "Product Manager" },
    { key: "Project Manager", value: "Project Manager" },
    { key: "Software Developer", value: "Software Developer" },
    { key: "Software Engineer", value: "Software Engineer" },
    { key: "Software Architect", value: "Software Architect" },
  ];

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    nationality: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    marital_status: Yup.string().required("Required"),
    education_level: Yup.string().required("Required"),
    employment_status: Yup.string().required("Required"),
    job_title: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    mobile_phone: Yup.string().required("Required"),
    work_email: Yup.string().email("Invalid Email Format").required("Required"),
  });

  //-----------------Add Data To database-----------------------
  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?employee_id=eq.${employeeId}`;

  const addEmployee = (data) => {
    return axios.patch(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addEmployee, {
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
          <div className="min-h-screen  justify-items-center container w-full mx-auto">
            <div className=" shadow-sm py-6 text-blue-900 ">
              <h2 className="text-2xl text-center  font-semibold px-20">
                Add Employee Details
              </h2>
            </div>

            <Form className="formGrid" autoComplete="off">
              <h2 className="h2Form">Basic Details</h2>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="First Name"
                  name="first_name"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Middle Name"
                  name="middle_name"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Last Name"
                  name="last_name"
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Nationality"
                  name="nationality"
                  options={dropdownForNationality}
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="date"
                  label="Birthday"
                  name="birthday"
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Gender"
                  name="gender"
                  options={dropdownForGender}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Marital Status"
                  name="marital_status"
                  options={dropdownForMartialStatus}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Education"
                  name="education_level"
                  options={dropDownForEducation}
                />
              </div>

              <h2 className="h2Form">Job Details</h2>

              <div>
                <FormikControl
                  control="select"
                  label="Job Title"
                  name="job_title"
                  options={dropDownForJobTitles}
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Employment Status"
                  name="employment_status"
                  options={dropDownForEmploymentStatus}
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="date"
                  label="Joined Date"
                  name="joined_date"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="date"
                  label="Confirmation Date"
                  name="confirmation_date"
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Manager"
                  name="manager"
                  options={dropDownForEmployees}
                />
              </div>

              <h2 className="h2Form">Communication Details</h2>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Address Line 1"
                  name="address.address_line_1"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Address Line 2"
                  name="address.address_line_2"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="City"
                  name="city"
                />
              </div>

              <div>
                <FormikControl
                  control="select"
                  label="Country"
                  name="country"
                  options={dropdownForCountries}
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Postal Code"
                  name="postal_code"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Phone"
                  name="mobile_phone"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Email"
                  name="work_email"
                />
              </div>

              <h2 className="h2Form">Other Details</h2>

              <div>
                <FormikControl
                  control="input"
                  type="text"
                  label="Driving License No"
                  name="driving_license"
                />
              </div>

              <div>
                <FormikControl
                  control="input"
                  type="date"
                  label="Driv License Exp Date"
                  name="driving_license_exp_date"
                />
              </div>

              <div className="col-span-2">
                <FormikControl
                  control="textarea"
                  type="text"
                  label="Notes"
                  name="notes"
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
  );
};

export default EditEmployee;