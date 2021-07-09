
import React from 'react'
import TabsRender from '../../../components/Projects/Edit/Tabs/TabsRender';
import { server } from "../../../config";
// import { useKeycloak } from '@react-keycloak/ssr';

import axios from 'axios';
import Modal from 'react-modal'
import {useState} from 'react'
import EditProject from '../../../components/Projects/Edit/EditProject'
import { Button } from 'primereact/button';
import {createContext} from 'react'
  
const Context = createContext(); 
export default function editproject({
  projectsData,
  currencydata,
  accountdata,
  projectManager,
  projectPhase,
  projectType,
  projectBillingType,
  taskStatus,
  taskName,
  storyName,
  AssMilestones,
  riskState,
 riskImpact,
 riskProbability,
 riskStatus,
 ChngReqCategory,
 ChngReqPriorty,
 ChngReqImpact,
 ChngReqState,
issueImpact,
issuePriorty,
deli_Status,
deli_Name,
resourceReqStatus,
resourceRole,
resourcePriority,
projectStatus,
opportunity 
}) {
  const tabName = ["Teams", "Budget", "Risks", "Deliverables"];
  
   const contextData = [taskStatus,taskName,storyName,AssMilestones,currencydata,riskState,riskImpact,riskProbability,riskStatus, ChngReqCategory,ChngReqPriorty,
  ChngReqImpact,ChngReqState, issueImpact,issuePriorty,deli_Status,deli_Name,resourceReqStatus,resourceRole,resourcePriority,projectStatus  ];
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
          opportunity={opportunity}
        />
      </div>

      <div className="my-5 px-2">

        <Context.Provider value={contextData}>
        <TabsRender projectsData={projectsData} />
        </Context.Provider>
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

  const response7 = axios({
    method: "get",
    url: `${server}/api/enums/task_status_t `,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response8 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks?project_id=eq.${pid}&select=id,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

    const response9 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/stories?project_id=eq.${pid}&select=id,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

     const response10 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/milestones?project_id=eq.${pid}&select=id,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

   const response11 = axios({
    method: "get",
    url: `${server}/api/enums/risk_state_t `,
    headers: {
      "Content-Type": "application/json",
    },
  });

   const response12 = axios({
    method: "get",
    url: `${server}/api/enums/risk_impact_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });

    const response13 = axios({
    method: "get",
    url: `${server}/api/enums/risk_probability_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });

   const response14 = axios({
    method: "get",
    url: `${server}/api/enums/risk_status_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });
   

     const response15 = axios({
    method: "get",
    url: `${server}/api/enums/change_request_category_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });

   const response16 = axios({
    method: "get",
    url: `${server}/api/enums/change_request_priorities_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });

const response17 = axios({
    method: "get",
    url: `${server}/api/enums/change_request_impact_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });
  

  const response18 = axios({
    method: "get",
    url: `${server}/api/enums/change_request_state_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });
 

   const response19 = axios({
    method: "get",
    url: `${server}/api/enums/issue_impact_t  `,
    headers: {
      "Content-Type": "application/json",
    },
  });

   const response20 = axios({
    method: "get",
    url: `${server}/api/enums/issue_priorities_t `,
    headers: {
      "Content-Type": "application/json",
    },
  });
 

    const response21 = axios({
    method: "get",
    url: `${server}/api/enums/deliverables_status_t `,
    headers: {
      "Content-Type": "application/json",
    },
  });

     const response22 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/deliverables?project_id=eq.${pid}&select=id,name`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

    const response23 = axios({
    method: "get",
    url: `${server}/api/enums/resource_request_status_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
   const response24 = axios({
    method: "get",
    url: `${server}/api/enums/resource_roles_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

 const response25 = axios({
    method: "get",
    url: `${server}/api/enums/request_priorities_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });
 

   const response26 = axios({
    method: "get",
    url: `${server}/api/enums/project_status_t`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response27 = axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities?select=name,account_id`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });

  

  const data = await axios.all([response, response1, response2, response3,response4,response5,response6,response7,response8,response9,response10,response11,response12,response13,response14,response15,response16,response17,response18,response19,response20,response21,response22,response23,response24,response25,response26,response27]);
  const accountdata = data[0].data;
  const currencydata = data[1].data;
  const projectManager = data[2].data;
  const projectsData = data[3].data;
  const projectPhase = data[4].data;
  const projectType = data[5].data;
  const projectBillingType = data[6].data;
  const taskStatus = data[7].data;
  const taskName = data[8].data;
  const storyName = data[9].data;
  const AssMilestones = data[10].data;
  const riskState = data[11].data;
  const riskImpact = data[12].data;
  const riskProbability = data[13].data;
  const riskStatus = data[14].data;
  const ChngReqCategory = data[15].data;
  const ChngReqPriorty = data[16].data;
  const ChngReqImpact = data[17].data;
  const ChngReqState = data[18].data;
  const issueImpact = data[19].data;
  const issuePriorty = data[20].data;
  const deli_Status = data[21].data;
  const deli_Name = data[22].data;
  const resourceReqStatus = data[23].data;
  const resourceRole = data[24].data;
  const resourcePriority = data[25].data;
  const projectStatus = data[26].data;
  const opportunity = data[27].data;
 
  return {
    props: {
      projectsData,
      accountdata,
      currencydata,
      projectManager,
      projectPhase,
      projectType,
      projectBillingType,
      taskStatus,
      taskName,
      storyName,
      AssMilestones,
      riskState,
      riskImpact,
      riskProbability,
      riskStatus,
      ChngReqCategory,
      ChngReqPriorty,
      ChngReqImpact,
      ChngReqState,
      issueImpact,
      issuePriorty,
      deli_Status,
      deli_Name,
      resourceReqStatus,
      resourceRole,
      resourcePriority,
      projectStatus,
      opportunity

    },
  };
}

export {Context};

