import React from 'react'
import ProjectForm from '../components/ProjectForm'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/ssr'
export default function addproject({currencydata,accountdata}) {
    const {keycloak}=useKeycloak()

    const addProjectForm =keycloak.authenticated?( <ProjectForm currencydata={currencydata} accountdata={accountdata}/>):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
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
        url:   " https://cthpociewycattzfdtep.supabase.co/rest/v1/accounts?select=id,account_name" ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
  
    
    const response1= axios({
        method:'get',
        url:   " https://cthpociewycattzfdtep.supabase.co/rest/v1/currencies?select=code" ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        
    })
    const data = await axios.all([response,response1])
    const accountdata =data[0].data;
    const currencydata=data[1].data;


    return {
        props:{
        accountdata,
        currencydata,
        },
        revalidate: 60
    }
}

