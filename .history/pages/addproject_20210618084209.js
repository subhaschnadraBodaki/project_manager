import React from 'react'
import ProjectForm from '../components/ProjectForm'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/ssr'
export default function addproject({data}) {
    const {keycloak}=useKeycloak()

    const addProjectForm =keycloak.authenticated?( <ProjectForm currency={data}/>):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    Login
    </button></>)
    return (
        <>
        {addProjectForm}
        </>
    )
}

export async function getStaticProps (){
    const response =await axios({
        method:'get',
        url:   " https://cthpociewycattzfdtep.supabase.co/rest/v1/currencies?select=code" ,
        headers:{
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjg2MDk5MSwiZXhwIjoxOTM4NDM2OTkxfQ.ZmeqDJqHN5Bjtzn6tA8hK5_ZB_L-s16LDdkL4IF5rEg",
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
