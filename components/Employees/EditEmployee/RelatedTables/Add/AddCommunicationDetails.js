import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import FormikControl from "../../../../FormComponents/FormikControl";

const AddCommunicationDetails = ({ employeeId, phoneType }) => {
  const toast = useRef(null);
  const initialValues = {
      employee_id: employeeId,
      homephone: '',
      mobilephone: '',
      alternative_phone: '',
      type: ''
  }



  //    -----------Options----------------

  const dropDownForphoneType = [{ key: "Type", value: "" }];
  phoneType.map((phone) => {
    let obj1 = {};
    obj1["key"] = phone.key;
    obj1["value"] = phone.value;
    dropDownForphoneType.push(obj1);
  });

  // ---------------validation Schema------------------------

  const validationSchema = Yup.object({});

  // -----------Post data-----------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/communication_details`;

  const addCommunicationDetails = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addCommunicationDetails, {
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
          detail: "Communication details Added",
          life: 3000,
        });
      }
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
              <Form
                id="AddCommunicationDetails"
                name="form"
                className="formGridModal"
                autoComplete="off"
              >
                <div>
                <FormikControl
                    control="select"
                    label="Phone Type"
                    name="type"
                    options={dropDownForphoneType}
                  /> 
                </div>

            { formik.values.type === 'Homephone' &&  <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Homephone"
                    name="homephone"
                  />
                </div>}

              { formik.values.type === 'Mobilephone'  &&<div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Mobilephone"
                    name="mobilephone"
                  />
                </div>}

              { formik.values.type === 'Alternative Phone' && <div>
                  <FormikControl
                    control="input"
                    type="number"
                    label="Alternative Phone"
                    name="alternative_phone"
                  />
                </div> }
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

export default AddCommunicationDetails;
