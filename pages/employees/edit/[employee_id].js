import EditEmployee from "../../../components/Employees/EditEmployee/EditEmployee";
import axios from 'axios';

const editEmployee = ({
  education,
  employmentStatus,
  jobTitles,
  countries,
  employees,
  employeeData,
}) => {
    

  return (
    <div>
      <EditEmployee
        education={education}
        employmentStatus={employmentStatus}
        jobTitles={jobTitles}
        countries={countries}
        employees={employees}
        employeeData={employeeData}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { employee_id } = context.query;

  const employee = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?employee_id=eq.${employee_id}`,
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

  const data = await axios.all([
    employee,
    educationdata,
    employmentStatusData,
    jobTitlesData,
    countriesData,
    employeesData,
  ]);

  const employeeData = data[0].data;
  const education = data[1].data;
  const employmentStatus = data[2].data;
  const jobTitles = data[3].data;
  const countries = data[4].data;
  const employees = data[5].data;


  return {
    props: {
      employeeData,
      education,
      employmentStatus,
      jobTitles,
      countries,
      employees,
    },
  };
}

export default editEmployee;
