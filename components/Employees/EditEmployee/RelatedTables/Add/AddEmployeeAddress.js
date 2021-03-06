
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import {useRef} from 'react'
import FormikControl from '../../../../FormComponents/FormikControl'
import { mutate } from "swr";

const AddEmployeeAddress = ({ employeeId, addressType, countries }) => {
  const toast = useRef(null);
  const initialValues = {
    employee_id: employeeId,
    address: '',
    city: '',
    postal_code: '',

  };

  //    -----------Options----------------

  const dropdownForAddressType = [{ key: "Address Type", value: "" }];
  addressType.map((address) => {
    let obj1 = {};
    obj1["key"] = address.key;
    obj1["value"] = address.value;
    dropdownForAddressType.push(obj1);
  });

  const dropdownForCountries = [{ key: "Select Country", value: "" }];
  countries.map((country) => {
    let obj2 = {};
    obj2["key"] = country.name;
    obj2["value"] = country.code;
    dropdownForCountries.push(obj2);
  });


  // ---------------validation Schema------------------------

  const validationSchema = Yup.object({});

  // -----------Post data-----------------

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employee_address`;

  const addEmployeeAddress = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const onSubmit = async (data, submitProps) => {
    
    try {
      const res = await mutate(url, addEmployeeAddress(data));
      console.log(res);

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Address Added",
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
            id="AddEmployeeAddress"
            name="form"
            className="formGridModal"
            autoComplete="off"
          >
            
            <div>
              <FormikControl
                control="select"
                label="Addr Type"
                name="address_type"
                options={dropdownForAddressType}
              />
            </div>

            <div>
              <FormikControl
                control="input"
                type="text"
                label="Address"
                name="address"
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
  )
};

export default AddEmployeeAddress;
