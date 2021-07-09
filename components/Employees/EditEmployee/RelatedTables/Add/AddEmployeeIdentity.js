import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import FormikControl from "../../../../FormComponents/FormikControl";
import { mutate } from "swr";

const AddEmployeeIdentity = ({ employeeId, identityType, countries }) => {
  const toast = useRef(null);
  const initialValues = {
    employee_id: employeeId,
    identity_no: "",
    name: "",
    description: "",
    validity: null,
    issuing_authority: "",
    active: false,
  };

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

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employee_identity`;

  const addIdentity = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };


  const onSubmit = async (data, submitProps) => {
    try {
      const res = await mutate(url, addIdentity(data));
      console.log(res);

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Identity Added",
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
                id="AddEmployeeIdentity"
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

export default AddEmployeeIdentity;
