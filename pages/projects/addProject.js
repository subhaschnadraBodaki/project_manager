import React from 'react'
import ProjectForm from '../../components/FormComponents/ProjectForm'
import { useKeycloak } from '@react-keycloak/ssr'
export default function addProject() {
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
