import { server } from "../../../config";
import axios from "axios";
import TabsRender from "../../../components/Employees/EditEmployee/Tabs/TabRender";
import EditEmployee from "../../../components/Employees/EditEmployee/EditEmployee";
import AddWorkExperience from "../../../components/Employees/EditEmployee/RelatedTables/Add/AddWorkExperience";

const editEmployee = ({
  education,
  employmentStatus,
  jobTitles,
  countries,
  employees,
  employeeData,
  employmentType,
  designation,
  identityType,
  employeeDataForEdit
}) => {
  
  return (
    <>
      <EditEmployee
        education={education}
        employmentStatus={employmentStatus}
        jobTitles={jobTitles}
        countries={countries}
        employees={employees}
        employeeDataForEdit={employeeDataForEdit}
      />

      <div className="my-5 px-2">
        <TabsRender
          employeeData={employeeData}
          employmentType={employmentType}
          designation={designation}
          identityType={identityType}
          countries={countries}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { employee_id } = context.query;

  const employeeForEdit = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?employee_id=eq.${employee_id}&select=*`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const employee = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?employee_id=eq.${employee_id}&select=*,work_experience(*)`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const educationdata = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/education?select=code,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const employmentStatusData = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employment_status?select=code,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const jobTitlesData = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/job_titles?select=code,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const countriesData = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/countries?select=code,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const employeesData = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=employee_id,first_name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const employmentTypeData = axios({
    method: "get",
    url: `${server}/api/enums/employment_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const designationData = axios({
    method: "get",
    url: `${server}/api/enums/resource_roles_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const identityData = axios({
    method: "get",
    url: `${server}/api/enums/identity_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([
    employee,
    educationdata,
    employmentStatusData,
    jobTitlesData,
    countriesData,
    employeesData,
    employmentTypeData,
    designationData,
    identityData,
    employeeForEdit
  ]);


  const employeeData = data[0].data;
  const education = data[1].data;
  const employmentStatus = data[2].data;
  const jobTitles = data[3].data;
  const countries = data[4].data;
  const employees = data[5].data;
  const employmentType = data[6].data;
  const designation = data[7].data;
  const identityType = data[8].data;
  const employeeDataForEdit = data[9].data

  return {
    props: {
      employeeData,
      education,
      employmentStatus,
      jobTitles,
      countries,
      employees,
      employmentType,
      designation,
      identityType,
      employeeDataForEdit
    },
  };
}

export default editEmployee;
