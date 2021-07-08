import React from "react";
import { server } from "../../config";
import ProjectForm from "../../components/Projects/ProjectForm";
import axios from "axios";
// import { useKeycloak } from '@react-keycloak/ssr'
export default function addproject({
  currencydata,
  accountdata,
  projectManager,
  projectPhase,
  projectBillingType,
  projectType,
  opportunity
}) {
  // const {keycloak}=useKeycloak()
  const authentication = true;

  const addProjectForm = authentication ? (
    <ProjectForm
      currencydata={currencydata}
      accountdata={accountdata}
      projectManager={projectManager}
      projectPhase={projectPhase}
      projectType={projectType}
      projectBillingType={projectBillingType}
      opportunity={opportunity}
    />
  ) : (
    <>
      {" "}
      <span>
        You have been logged out click here to login again
      </span> <br />{" "}
      <button type="button" onClick={() => keycloak.login()}>
        Login
      </button>
    </>
  );
  return <>{addProjectForm}</>;
}

export async function getStaticProps() {
  const response = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=id,account_name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const response1 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/currencies?select=id,code`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const response2 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=user_id,first_name,role`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

    const response3 = axios({
    method: "get",
    url: `${server}/api/enums/project_phase_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response4 = axios({
    method: "get",
    url: `${server}/api/enums/project_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response5 = axios({
    method: "get",
    url: `${server}/api/enums/billing_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response6 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities?select=name,account_id`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([response, response1, response2, response3,response4,response5,response6]);
  const accountdata = data[0].data;
  const currencydata = data[1].data;
  const projectManager = data[2].data;
  const projectPhase = data[3].data;
  const projectType = data[4].data;
  const projectBillingType = data[5].data;
  const opportunity = data[6].data;
  return {
    props: {
      accountdata,
      currencydata,
      projectManager,
      projectPhase,
      projectType,
      projectBillingType,
      opportunity

    },
    revalidate: 60,
  };
}
