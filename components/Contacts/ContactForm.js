import { Formik, Form, FieldArray, Field, validateYupSchema } from "formik";
import { Rating } from "primereact/rating";
import * as Yup from "yup";
import FormikControl from "../FormComponents/FormikControl";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

const ContactForm = ({ accountdata }) => {
  const [rate, setRate] = useState(null);

  // ----------------Initial Values ----------------
  const initialValues = {
    assistant_name:'',
    assistant_phone:'',
    birthdate:null,
    contact_name:'',
    department:'',
    // description:'',
    email: '',
    fax: '',
    home_phone: '',
    // id: '',
    account_id:'',
    lead_source: '',
    mailing_address: '',
    active:false,
    
      mailing_city: '',
      mailing_country: '',
     
      mailing_postalcode: '',
      mailing_state: '',
      mailing_street:'',
      mobile_phone:'',
      phone:'',
      assistant_phone:'',
      title: '',
      website:''
      
  }
  //   ----------Options -----------

  let dropdownOptionsAccountId = [{key:"Account",value:""}];
for (const item of accountdata) {
  let obj = {};
  obj['key'] = item.account_name;
  obj['value'] = item.id;
  dropdownOptionsAccountId.push(obj);
}
const dropdownOptionsDepartment = [
    { key: 'Department', value: '' },
    { key: 'Consulting', value: 'Consulting' },
    { key: 'Finance', value: 'Finance' },
    { key: 'HR', value: 'HR' },
    { key: 'Management', value: 'Management' },
    { key: 'Development', value: 'Development' }
  ]

  const dropdownOptionsLeadSource = [
    { key: 'Lead Source', value: '' },
    { key: 'Trade Fair', value: 'Trade Fair' },
    { key: 'Direct Marketing', value: 'Direct Marketing' }
  ]

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


  const checkboxOptionsActive =  [
    { key: 'Active', value: true},
    ]
   
    // const statusOptions = [
    //   { key: 'Active', value: true },
    // ] 
    
//     const dropdownOpportunity = [
//       { key: 'opportunity', value: '' },
//       { key: 'Account1', value: 'Account1' },
//       { key: 'Account2', value: 'Account2' }
  // -------------------------------Validation Schema------------------------

  const validationSchema = Yup.object({
    assistant_name: Yup.string().required('Required'),
    contact_name: Yup.string().required('Required'),
      
      email: Yup.string().email('Invalid email').required('Required'),
      // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


      home_phone: Yup.string()
  .required("required")
  .min(10, "to short")
  .max(10, "to long"),
  mobile_phone:Yup.string()
  .required("required")
  .min(10, "to short")
  .max(10, "to long"),
  assistant_phone:Yup.string()
  .required("required")
  .min(10, "to short")
  .max(10, "to long"),
  phone:Yup.string()
  .required("required")
  .min(10, "to short")
  .max(10, "to long"),
  birthdate:Yup.date()
    .max(new Date(Date.now()), "birthdate can't exceed today's date")
    .required("Required"),
  
  })

  // -----------------------------Post Data--------------------------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/contacts`;

  const addContact = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(addContact, {
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

  //----------------------------------onSubmit-------------------------
  const onSubmit = (data) => {
    console.log(data);

    mutation.mutate(data);
  };

  //   -------------Form----------------------

  return (
    <>
     <Formik
       initialValues={initialValues}
        validationSchema={validationSchema}
       onSubmit={onSubmit}
     >
       {formik => {
         return (
     <div className="min-h-screen  justify-items-center container w-full mx-auto   ">
     <div className=" shadow-sm py-6 text-blue-900 ">
     <h2 className="text-2xl text-center  font-semibold px-20">Contact</h2>
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
         label='Assistant Name'
         name='assistant_name'
       />
       </div>
       <div > 
        <FormikControl
         control='date'
         label='Birthdate'
         name='birthdate'
        
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Assistant Phone'
         name='assistant_phone'
       />
       </div>
 
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Fax'
         name='fax'
       />
       </div>
 
       <div>
       <FormikControl
         control='input'
         type='number'
         label='Home Phone'
         name='home_phone'
       />
       </div>
 
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing Address'
         name='mailing_address'
         
       />
       </div>
 
       <div>
       <FormikControl
         control='select'
         label='Lead source'
         name='lead_source'
         options={dropdownOptionsLeadSource}
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing City'
         name='mailing_city'
       />
       </div>
       
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing Country'
         name='mailing_country'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing Postalcode'
         name='mailing_postalcode'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing State'
         name='mailing_state'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing Street'
         name='mailing_street'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Mailing Street'
         name='mailing_street'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='number'
         label='Mobile Phone'
         name='mobile_phone'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='number'
         label='Phone'
         name='phone'
       />
       </div>
       <div>
       <FormikControl
         control='input'
         type='text'
         label='Title'
         name='title'
       />
       </div>
 
       
       
 
      
 
        
       {/* {/* <div>
       <FormikControl
         control='select'
         label='Project manager'
         name='project_manager_id'
         options={dropdownProjectManager}
       />
       </div> */}
 
       {/* <div > 
        <FormikControl
         control='select'
         label='Account'
         name='account_id'
         options={dropdownOptionsAccountId}
       />
       </div>
        */}
     
       
 
       <div > 
        <FormikControl
         control='input'
         type= 'text'
         label='Contact Name'
         name='contact_name'
         
       />
       </div>
 
       
 
        <div>
       <FormikControl
         control='select'
         label='Department'
         name='department'
         options={dropdownOptionsDepartment}
       />
       </div>
 
       {/* <div >
         <FormikControl
         control='input'
         type='number'
         label='Actual Effort in Hours'
         name='actual_effort_in_hours'
        
       />
       </div> */}
 
       <div>
          <FormikControl
         control='input'
         type='text'
         label='Website'
         name='website'
         
         />
         </div>
 
      
     
       <div >
          <FormikControl
         control='input'
         type= 'text'
         label='Email'
         name='email'
         />
         </div>
         <div>  
       <FormikControl
         control='checkbox'
     
         label='Active'
         name='active'
         options={checkboxOptionsActive}
       />
       </div>
         
         {/* <div>
       <FormikControl
         control='text'
         type='number'
         label='Status'
         name='  status'
       />
       </div> */}
 
       
       {/* <div className=" col-span-2">
          <FormikControl
         control='textarea'
         label='Updated at'
         name='updated_at'
         />
         </div>
        */}
 
      
      {/* <div>
       <FormikControl
         control='input'
         type='text'
         label='Created by'
         name='created_by'
       /> */}
       {/* </div> */}
       
       
 
      
      
 
     {/* <div >
              <FormikControl
               control='date'
               label='Actual Start Date'
               name='actual_start_date'
             />
     </div> */}
     {/* <div >
              <FormikControl
               control='date'
               label='Actual End Date'
               name='actual_end_date'
             />
     </div> */}
     {/* <div >
              <FormikControl
               control='checkbox'
               label='Time Recording'
               name='time_recording_allowed'
               options={checkboxOptionsTimeRecord}
             />
     </div> */}
 
    
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
 
 export default ContactForm;