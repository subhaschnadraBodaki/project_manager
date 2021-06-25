import React from 'react'
import TabsRender from '../../components/Project-overview/Tabs/TabsRender';
import Section1 from '../../components/Project-overview/Section1'
import Section2 from '../../components/Project-overview/Section2'
import Heading from '../../components/Project-overview/Heading'
import { useKeycloak } from '@react-keycloak/ssr';
import axios from 'axios';

export default function projectOverview({projectsData }) {
    const tabName = ['Teams', 'Budget', 'Risks', 'Deliverables']

    const { keycloak } = useKeycloak()
    
    const projectDetails = keycloak.authenticated ? (<>
        <div className="mx-10 px-5">

            <Heading />
        </div>
        <div className="mx-1 px-2 ">
        <div >
            <Section1 projectsData={projectsData}  />
        </div>
        <div >
            <Section2 projectsData={projectsData} />
        </div>
        </div>
        
        <div className="my-5 px-2">
            <TabsRender projectsData={projectsData} />
        </div>

    </>
    ) : (<> <span>You have been logged out click here to login again</span> <br /> < button type="button" onClick={() => keycloak.login()}>
        Login
    </button></>)

    return (
        <>
            {projectDetails}
        </>
    )
}

export async function getServerSideProps(context){
    const {pid}= context.query
    
        const response =await axios({
            method :'GET',
            url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*),project_risks(*),project_issues(*),project_deliverables(*),project_change_request(*)`,
            headers:{
                apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        })    
        
    if (response.status!=200) throw new Error(response.statusText)
    
    const projectsData=  response.data
   
return{
    props:{
        projectsData ,
     
       
    }
}

}


// border-2 rounded-lg border-gray-600 border-double divide-solid m-px

// https://cthpociewycattzfdtep.supabase.co/rest/v1/projects?id=eq.2&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*),project_risks(*),project_issues(*),project_deliverables(*),project_change_request(*)