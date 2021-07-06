import { server } from "../../../config";
import axios from "axios";
import TabsRender from "../../../components/Employees/EditEmployee/Tabs/TabRender";
import EditEmployee from "../../../components/Employees/EditEmployee/EditEmployee";

const editEmployee = ({
  qualification,
  employmentStatus,
  jobTitles,
  countries,
  employees,
  employeeData,
  employmentType,
  designation,
  identityType,
  employeeDataForEdit,
  nationality,
  gender,
  jobRoles,
  maritalStatus,
  skillCategories,
  skillLevel,
  addressType,
  phoneType,
  qualificationStatus,
}) => {
  return (
    <>
      <EditEmployee
        qualification={qualification}
        employmentStatus={employmentStatus}
        jobTitles={jobTitles}
        countries={countries}
        employees={employees}
        employeeDataForEdit={employeeDataForEdit}
        nationality={nationality}
        gender={gender}
        jobRoles={jobRoles}
        maritalStatus={maritalStatus}
      />

      <div className="my-5 px-2">
        <TabsRender
          employeeData={employeeData}
          employmentType={employmentType}
          designation={designation}
          identityType={identityType}
          countries={countries}
          skillCategories={skillCategories}
          skillLevel={skillLevel}
          addressType={addressType}
          phoneType={phoneType}
          qualification={qualification}
          qualificationStatus={qualificationStatus}
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
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?employee_id=eq.${employee_id}&select=*,work_experience(*),employee_identity(*),employee_skills(*),employee_address(*),communication_details(*),education(*)`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const qualificationData = axios({
    method: "get",
    url: `${server}/api/enums/qualification_t`,
    headers: {
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

  const nationalityData = axios({
    method: "get",
    url: `${server}/api/enums/nationality_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const genderData = axios({
    method: "get",
    url: `${server}/api/enums/gender_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jobRolesData = axios({
    method: "get",
    url: `${server}/api/enums/job_roles_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const maritalStatusData = axios({
    method: "get",
    url: `${server}/api/enums/marital_status_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const skillCategoriesData = axios({
    method: "get",
    url: `${server}/api/enums/skill_categories_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const skillLevelData = axios({
    method: "get",
    url: `${server}/api/enums/skill_level_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const addressTypeData = axios({
    method: "get",
    url: `${server}/api/enums/address_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const phoneTypeData = axios({
    method: "get",
    url: `${server}/api/enums/phone_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const qualificationStatusData = axios({
    method: "get",
    url: `${server}/api/enums/qualification_status_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([
    employee,
    qualificationData,
    employmentStatusData,
    jobTitlesData,
    countriesData,
    employeesData,
    employmentTypeData,
    designationData,
    identityData,
    employeeForEdit,
    nationalityData,
    genderData,
    jobRolesData,
    maritalStatusData,
    skillCategoriesData,
    skillLevelData,
    addressTypeData,
    phoneTypeData,
    qualificationStatusData
  ]);

  const employeeData = data[0].data;
  const qualification = data[1].data;
  const employmentStatus = data[2].data;
  const jobTitles = data[3].data;
  const countries = data[4].data;
  const employees = data[5].data;
  const employmentType = data[6].data;
  const designation = data[7].data;
  const identityType = data[8].data;
  const employeeDataForEdit = data[9].data;
  const nationality = data[10].data;
  const gender = data[11].data;
  const jobRoles = data[12].data;
  const maritalStatus = data[13].data;
  const skillCategories = data[14].data;
  const skillLevel = data[15].data;
  const addressType = data[16].data;
  const phoneType= data[17].data;
  const qualificationStatus = data[18].data

  return {
    props: {
      employeeData,
      qualification,
      employmentStatus,
      jobTitles,
      countries,
      employees,
      employmentType,
      designation,
      identityType,
      employeeDataForEdit,
      nationality,
      gender,
      jobRoles,
      maritalStatus,
      skillCategories,
      skillLevel,
      addressType,
      phoneType,
      qualificationStatus
    },
  };
}

export default editEmployee;
