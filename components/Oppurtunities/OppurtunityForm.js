import { Formik, Form, FieldArray, Field, validateYupSchema } from "formik";
import { Rating } from "primereact/rating";
import * as Yup from "yup";
import FormikControl from "../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import {mutate} from 'swr';
const OppurtunityForm = ({ accountdata }) => {
  const [rate, setRate] = useState(null);

  // ----------------Initial Values ----------------
  const initialValues = {
    name:'',
    account_id:'',
   
    amount:'',
    close_date:null,
    forecast_category:'',
    forecast_category_name:'',
    has_open_activity:false,
    has_opportunity_line_item:false,
    has_overdue_task:false,

    is_closed:false,
    is_won:false,
    probability:'',
    stage_name:'',
    // total_opportunity_quantity:'',
    type:'',
    owner_id:''

  }
  //   ----------Options -----------

  let dropdownOptionsAccountId = [{key:"Account",value:""}];
for (const item of accountdata) {
  let obj = {};
  obj['key'] = item.account_name;
  obj['value'] = item.id;
  dropdownOptionsAccountId.push(obj);
}
// const dropdownOptionsDepartment = [
//     { key: 'Department', value: '' },
//     { key: 'Consulting', value: 'Consulting' },
//     { key: 'Finance', value: 'Finance' },
//     { key: 'HR', value: 'HR' },
//     { key: 'Management', value: 'Management' },
//     { key: 'Development', value: 'Development' }
//   ]

//   const dropdownOptionsLeadSource = [
//     { key: 'Lead Source', value: '' },
//     { key: 'Trade Fair', value: 'Trade Fair' },
//     { key: 'Direct Marketing', value: 'Direct Marketing' }
//   ]

//   const dropdownOptionsProjectPhase = [
//     { key: 'Project Phase', value: '' },
//     { key: 'Planning', value: 'Planning' },
//     { key: 'Requiremnet', value: 'Requirement' },
//     { key: 'Design', value: 'Design' },
//     { key: 'Development', value: 'Development' },
//     { key: 'UAT', value: 'UAT' },
//     { key: 'GoLivw Preparation', value: 'GoLive_Preparation' },
//     { key: 'Post GoLive Support', value: 'Post_GoLive_Support' }
//   ]


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
    // const statusOptions = [
    //   { key: 'Active', value: true },
    // ] 
    
//     const dropdownOpportunity = [
//       { key: 'opportunity', value: '' },
//       { key: 'Account1', value: 'Account1' },
//       { key: 'Account2', value: 'Account2' }
  // -------------------------------Validation Schema------------------------

//   const validationSchema = Yup.object({
//     assistant_name: Yup.string().required('Required'),
//     contact_name: Yup.string().required('Required'),
      
//       email: Yup.string().email('Invalid email').required('Required'),
//       // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


//       home_phone: Yup.string()
//   .required("required")
//   .min(10, "to short")
//   .max(10, "to long"),
//   mobile_phone:Yup.string()
//   .required("required")
//   .min(10, "to short")
//   .max(10, "to long"),
//   assistant_phone:Yup.string()
//   .required("required")
//   .min(10, "to short")
//   .max(10, "to long"),
//   phone:Yup.string()
//   .required("required")
//   .min(10, "to short")
//   .max(10, "to long"),
//   birthdate:Yup.date()
//     .max(new Date(Date.now()), "birthdate can't exceed today's date")
//     .required("Required"),
  
//   })

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities`;

  const response = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  

  //----------------------------------onSubmit-------------------------
  const onSubmit = async (data, submitProps) => {
    console.log(data)
    try {
      const res = await mutate(url, response(data));
      console.log(res);
 
    //   toast.current.show({
    //     severity: "success",
    //     summary: "Successful",
    //     detail: "Op Added",
    //     life: 3000,
    //   });
    } catch (error) {
        console.log(error);
    }
 
    console.log(submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  //   -------------Form----------------------

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
     <h2 className="text-2xl text-center  font-semibold px-20">Add Opportunity</h2>
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
 
 export default OppurtunityForm;