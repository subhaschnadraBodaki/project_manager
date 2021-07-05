
import React from 'react'
import TabsRender from '../../../components/Projects/Edit/Tabs/TabsRender';
import { server } from "../../../config";
// import { useKeycloak } from '@react-keycloak/ssr';

import axios from 'axios';
import Modal from 'react-modal'
import {useState} from 'react'
import EditProject from '../../../components/Projects/Edit/EditProject'
import { Button } from 'primereact/button';


export default function editproject({
  projectsData,
  currencydata,
  accountdata,
  projectManager,
  projectPhase,
  projectType,
  projectBillingType
}) {
  const tabName = ["Teams", "Budget", "Risks", "Deliverables"];

  // const { keycloak } = useKeycloak()

  const projectCode = projectsData[0].project_code;
  const projectId = projectsData[0].id;

  const authentication = true;
  const editprojectDetails = authentication ? (
    <>
      <div>
        <h2 className="h2Form ml-2">Project-Id : {projectId}</h2>
      </div>

      <div>
        <EditProject
          projectsData={projectsData}
          currencydata={currencydata}
          accountdata={accountdata}
          projectManager={projectManager}
          projectPhase={projectPhase}
          projectType={projectType}
          projectBillingType={projectBillingType}
        />
      </div>

      <div className="my-5 px-2">
        <TabsRender projectsData={projectsData} />
      </div>
    </>
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

  return <>{editprojectDetails}</>;
}

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const response3 = axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*),project_risks(*),project_issues(*),project_deliverables(*),project_change_request(*)`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  });

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


    const response4 = axios({
    method: "get",
    url: `${server}/api/enums/project_phase_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response5 = axios({
    method: "get",
    url: `${server}/api/enums/project_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response6 = axios({
    method: "get",
    url: `${server}/api/enums/billing_type_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await axios.all([response, response1, response2, response3,response4,response5,response6]);
  const accountdata = data[0].data;
  const currencydata = data[1].data;
  const projectManager = data[2].data;
  const projectsData = data[3].data;
  const projectPhase = data[4].data;
  const projectType = data[5].data;
  const projectBillingType = data[6].data;

  return {
    props: {
      projectsData,
      accountdata,
      currencydata,
      projectManager,
      projectPhase,
      projectType,
      projectBillingType
    },
  };
}
