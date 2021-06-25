import React from 'react'
import ProjectForm from '../../components/ProjectForm'
import axios from 'axios'
// import { useKeycloak } from '@react-keycloak/ssr'
export default function addproject({currencydata,accountdata,projectManager}) {
    // const {keycloak}=useKeycloak()
    const authentication = true

    const addProjectForm =authentication?( <ProjectForm currencydata={currencydata} accountdata={accountdata} projectManager={projectManager}/>):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    Login
    </button></>)
    return (
        <>
        {addProjectForm}
        </>
    )
}

export async function getStaticProps (){
    const response = axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=id,account_name` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
  
    
    const response1= axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/currencies?select=id,code` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })

    const response2= axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=user_id,first_name` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    const data = await axios.all([response,response1,response2])
    const accountdata =data[0].data;
    const currencydata=data[1].data;
    const projectManager=data[2].data;

    return {
        props:{
        accountdata,
        currencydata,
        projectManager,
        },
        revalidate: 60
    }
}

