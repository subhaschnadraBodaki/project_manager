import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "../../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function EditOppurtunity({ accountdata, oppurtunitydata, oppurtunityId }) {
//   const toast = useRef(null);
  // --------------------------------------initial Values---------------------
  const initialValues =  oppurtunitydata[0];
  // -----------------------------Dynamic Select Options-----------------------

  // --------------Account Id--------------
  let dropdownOptionsAccountId = [{ key: "Account", value: "" }];
  for (const item of accountdata) {
    let obj = {};
    obj["key"] = item.account_name;
    obj["value"] = item.id;
    dropdownOptionsAccountId.push(obj);
  }

  // -------------------------- Static Select Options----------------------------

  const checkboxOptionsclosed =  [
    { key: 'Is Closed', value: true},
    ]
    const checkboxOptionsown =  [
        { key: 'Is won', value: true},
        ]
    const checkboxOptionsactivity =  [
            { key: 'Has Open Activity', value: true},
            ]
    const checkboxOptionsitem =  [
                { key: 'Has Opportunity Line Item', value: true},
                ]
    const checkboxOptionsoverdue =  [
                    { key: 'Has Overdue Task', value: true},
                    ]

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities?id=eq.${oppurtunityId}`;

  const editoppurtunity = (data) => {
    return axios.patch(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(editoppurtunity, {
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
    //   if (data) {
    //     toast.current.show({
    //       severity: "success",
    //       summary: "Successful",
    //       detail: "Contact Updated",
    //       life: 3000,
    //     });
    //   }
    },
  });

  // -------------------------------Validation Schema------------------------


  // ----------------------------------onSubmit-------------------------
  const onSubmit = (data) => {
    console.log(data);

    mutation.mutate(data);
  };

  // -------------------------------Form----------------------------
  return (
    <>
     <Formik
       initialValues={initialValues}
        // validationSchema={validationSchema}
       onSubmit={onSubmit}
     >
       {formik => {
         return (
     <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
     <div className=" shadow-sm py-6 text-blue-900 ">
     <h2 className="text-2xl text-center  font-semibold px-20">Edit Opportunity</h2>
     </div>
    
 
     <Form className="formGrid
     " autoComplete="off">
       <h2 className="h2Form">Basic Details</h2>
     {/* <div className="ml-3">
              <FormikControl
               control='input'
               type='number'
               label='Id'
               name='id'
             />
     </div> */}
    
       <div>
       <FormikControl
         control='select'
         label='Account Id'
         name='account_id'
         options={dropdownOptionsAccountId}
       />
       </div>
     
       
 
       <div>  
       <FormikControl
         control='input'
         type='text'
         label='Name'
         name='name'
       />
       </div>
       <div>  
       <FormikControl
         control='input'
         type='number'
         label='Amount'
         name='amount'
       />
       </div>
       <div>  
       <FormikControl
         control='input'
         type='text'
         label='Owner'
         name='owner_id'
       />
       </div>
       <div > 
        <FormikControl
         control='date'
         label='Close Date'
         name='close_date'
        
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Forecast Category'
         name='forecast_category'
       />
       </div>
 
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Forecast Category Name'
         name='forecast_category_name'
       />
       </div>
 
       <div>
       <FormikControl
         control='checkbox'
         label='Has Open Activity'
         name='has_open_activity'
         options={checkboxOptionsactivity}
       />
       </div>
 
       <div>
       <FormikControl
         control='checkbox'
         label='Has Opportunity Line Item'
         name='has_opportunity_line_item'
         options={checkboxOptionsitem}
         
       />
       </div>
 
       <div>
       <FormikControl
         control='checkbox'
         label='Has Overdue Task'
         name='has_overdue_task'
         options={checkboxOptionsoverdue}
       />
       </div>
       <div>
       <FormikControl
         control='checkbox'
         label='Is Closed'
         name='is_closed'
         options={checkboxOptionsclosed}
       />
       </div>
       
       <div>
       <FormikControl
         control='checkbox'
         label='Is Won'
         name='is_won'
         options={checkboxOptionsown}
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='number'
         label='Probability'
         name='probability'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Stage Name'
         name='stage_name'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='number'
         label='Total Opportunity'
         name='total_opportunity_quantity'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Type'
         name='type'
       />
       </div>
       
    
     <div className="text-right mt-5  col-span-2 mr-20 ">
      <button type="submit" class="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm" disabled={!formik.isValid}>Submit</button>
     </div>
    
     </Form>
     </div>
   
   )
 }}
 </Formik>
 
 </>
 
   )
 }
 
 export default EditOppurtunity;
