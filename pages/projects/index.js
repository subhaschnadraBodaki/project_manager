import React from 'react'
import ProjectTable from '../../components/Projects/List-of-projects/ProjectTable'
// import { useKeycloak } from '@react-keycloak/ssr'
import axios from 'axios'

export default function projects({data}) {
    // const { keycloak } = useKeycloak()
    const authentication = true
    // keycloak.authenticated
    const listOfProjects = authentication ? (<div>
        <ProjectTable data={data}/>
    </div>) : (<> <span>You have been logged out click here to login again</span> <br /> < button type="button" onClick={() => keycloak.login()}>
        Login
    </button></>)

    return (
        <React.Fragment>
            {listOfProjects}


        </React.Fragment>
    )
}

export async function getStaticProps (){
    const response =await axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?select=*` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    if (response.status!=200) throw new Error(response.statusText)
    
    const data =await response.data
    
    return {
        props:{
        data,
        },
        revalidate: 60
    }
}