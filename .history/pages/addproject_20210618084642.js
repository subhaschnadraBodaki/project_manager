import React from 'react'
import ProjectForm from '../components/ProjectForm'
import axios from 'axios'
import { useKeycloak } from '@react-keycloak/ssr'
export default function addproject({data}) {
    const {keycloak}=useKeycloak()

    const addProjectForm =keycloak.authenticated?( <ProjectForm />):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    Login
    </button></>)
    return (
        <>
        {addProjectForm}
        </>
    )
}


