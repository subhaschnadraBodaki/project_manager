import { server } from "../../config";
import EmployeeForm from "../../components/Employees/EmployeeForm";
import axios from "axios";

const add = ({
  education,
  employmentStatus,
  jobTitles,
  countries,
  employees,
  nationality
}) => {
  return (
    
    <EmployeeForm
      education={education}
      employmentStatus={employmentStatus}
      jobTitles={jobTitles}
      countries={countries}
      employees={employees}
      nationality={nationality}
    />
  );
};

export async function getStaticProps() {
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

  const nationalityData = axios({
    method: "get",
    url: `${server}/api/enums/nationality_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([
    educationdata,
    employmentStatusData,
    jobTitlesData,
    countriesData,
    employeesData,
    nationalityData,
  ]);

  const education = data[0].data;
  const employmentStatus = data[1].data;
  const jobTitles = data[2].data;
  const countries = data[3].data;
  const employees = data[4].data;
  const nationality = data[5].data;



  return {
    props: {
      education,
      employmentStatus,
      jobTitles,
      countries,
      employees,
      nationality
    },
    revalidate: 60,
  };
}

export default add;
