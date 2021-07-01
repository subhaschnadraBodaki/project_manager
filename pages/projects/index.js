import React from 'react'
import ProjectTable from '../../components/Projects/List-of-projects/ProjectTable'
// import { useKeycloak } from '@react-keycloak/ssr'
import axios from 'axios'
// import { RenderOnAuthenticated } from '../../components/utils/supabase/renderOnAuthenticated'
// import KeycloakAuthentication from '../../components/KeycloakAuthentication'
export default function projects({data ,employeeData}) {
    // const { keycloak } = useKeycloak()
    // const authentication = true
    // keycloak.authenticated
    // const listOfProjects = authentication ? (<div>
    //     <ProjectTable data={data} employeeData={employeeData} />
    // </div>) : (<> <span>You have been logged out click here to login again</span> <br /> < button type="button" onClick={() => keycloak.login()}>
    //     Login
    // </button></>)

    return (
        // <KeycloakAuthentication>
        
        <React.Fragment>
            {/* {listOfProjects} */}
            <ProjectTable data={data} employeeData={employeeData} />


        </React.Fragment>
        /* </KeycloakAuthentication> */
        
    )
}

export async function getStaticProps (){
    const projData = axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?select=*` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    const empData = axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=first_name,middle_name,last_name,user_id` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })


    const response =await axios.all([projData,empData])
    
    if (response[0].status!=200) throw new Error(response[0].statusText)
    const data =response[0].data

    if (response[1].status!=200) throw new Error(response[1].statusText)
    const employeeData = response[1].data

    
    // console.log(a )
    return {
        props:{
        data,
        employeeData
        },
        revalidate: 60
    }
}