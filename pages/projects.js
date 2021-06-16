import React from 'react'
import ProjectTable from '../components/List-of-projects/ProjectTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function projects({data}) {
    const { keycloak } = useKeycloak()

    const listOfProjects = keycloak.authenticated ? (<div>
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
    const response =await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL+'/projects?select=*' ,{
        method:'get',
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    if (!response.ok) throw new Error(response.statusText)
    
    const data =await response.json()
    
    return {
        props:{
        data,
        },
        revalidate: 60
    }
}