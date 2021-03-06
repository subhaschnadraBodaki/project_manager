import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Rating } from "primereact/rating";
import * as Yup from "yup";
import FormikControl from "../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";
import TextError from "../FormComponents/TextError";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const AccountForm = ({ countries, accountType }) => {
  const toast = useRef(null);
  const [rate, setRate] = useState(null);

  // ----------------Initial Values ----------------
  const initialValues = {
    account_name: "",

    city: "",
    state: "",
    postalcode: "",
    address: {
      address_line_1: "",
      address_line_2: "",
    },
    phone: "",
    // phNumbers: ["", ""],
    email: "",
    website: "",

    industry: "",
    annual_revenue: null,
    number_of_employees: null,
    description: "",
    rating: rate,

    active: false,
  };

  //   ----------Options -----------

  const statusOptions = [{ key: "Active", value: true }];

  const dropdownForAccountType = [{key: "Account Type", value:""}];
  accountType.map((acc) => {
    let obj = {};
    obj["key"] = acc.key;
    obj["value"] = acc.value;
    dropdownForAccountType.push(obj);
  });
  
  const dropdownForCountries = [{ key: "Select Country", value: "" }];
  countries.map((country) => {
    let obj = {};
    obj["key"] = country.name;
    obj["value"] = country.code;
    dropdownForCountries.push(obj);
  });

  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    account_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    annual_revenue: Yup.string()
      .max(14, "Must be 14 digits or less")
      .test(
        "Is positive?",
        " Amount must be greater than 0!",
        (value) => value > 0
      ),
  });

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts`;

  const addAccount = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addAccount, {
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
          detail: "Account Added",
          life: 3000,
        });
      }
    },
  });

  //----------------------------------onSubmit-------------------------
  const onSubmit = (data) => {
    console.log(data);

    mutation.mutate(data);
  };

  //   -------------Form----------------------

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
            <div className="min-h-screen  justify-items-center container w-full mx-auto ">
              <div className=" shadow-sm py-6 text-blue-900 ">
                <h2 className="text-2xl text-center  font-semibold px-20">
                  Add Account Details
                </h2>
              </div>

              <Form
                className="formGrid
    "
                autoComplete="off"
              >
                <h2 className="h2Form">Basic Details</h2>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Account name"
                    name="account_name"
                  />
                </div>

                <div>
                  <FormikControl
                    control="select"
                    label="Type"
                    name="type"
                    options={dropdownForAccountType}
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Industry"
                    name="industry"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Annual Revenue"
                    name="annual_revenue"
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Number of Employees"
                    name="number_of_employees"
                  />
                </div>

                <h2 className="h2Form">Communication Details</h2>

                <div>
                  <FormikControl
                    control="select"
                    label="Country"
                    name="country_code"
                    options={dropdownForCountries}
                  />
                </div>

                {/* <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label=" State"
                    name="state"
                  />
                </div> */}

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label=" City"
                    name="city"
                  />
                </div>
                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label=" Postalcode"
                    name="postalcode"
                  />
                </div>

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
                    label="Phone"
                    name="phone"
                  />
                </div>

                {/* <div>
              <FieldArray name='phone_numbers'>
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps
                  const { values } = form
                  const { phone_numbers } = values
            
                  return (
                    <div>
                      {phone_numbers.map((phNumber, index) => (
                        <div key={index}>
                          <div   className='md:w-full grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5  mb-6 md:mb-0'>
      <label  htmlFor="PhoneNo" className="label">PhoneNo</label>
                          <Field name={`phone_numbers[${index}]`} className="inputField" id={`phone_numbers[${index}]`} autoComplete="off" />
                          <ErrorMessage  component={TextError} name={`phone_numbers[${index}]`} />
                          </div>
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                        </div>
                      ))}
                      <button type='button' onClick={() => push('')}>
                        +
                      </button>
                    </div>
                  )
                }}
              </FieldArray>
            </div>
               */}

                {/* <div>
                  <FieldArray name="phNumbers">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { phNumbers } = values;
                      // console.log('fieldArrayProps', fieldArrayProps)
                      // console.log('Form errors', form.errors)
                      return (
                        <div>
                          {phNumbers.map((phNumber, index) => (
                            <div key={index}>
                              <FormikControl
                                name={`phNumbers[${index}]`}
                                type="text"
                                label="phoneNo"
                                control="input"
                              />
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  -
                                </button>
                              )}
                            </div>
                          ))}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      );
                    }}
                  </FieldArray>
                </div> */}

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Email"
                    name="email"
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

                <h2 className="h2Form">Other Details</h2>

                {/* <div>
                <FormikControl
                  label="Rating"
                  name="rating"
                />
              </div> */}

                <div className="md:w-full grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5  mb-6 md:mb-0">
                  <label className="label mx-5">Rating</label>
                  <Rating
                    className="flex"
                    value={rate}
                    name="rating"
                    cancel={false}
                    onChange={(e) => setRate(e.value)}
                  />
                </div>
                {console.log(rate)}
                {console.log(initialValues.rating)}

                <div className=" mb-3">
                  <FormikControl
                    control="checkbox"
                    label="Active"
                    name="active"
                    options={statusOptions}
                  />
                </div>

                <div className=" col-span-2">
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
};

export default AccountForm;
