import React from 'react'
import ProjectTable from '../../components/List-of-projects/ProjectTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function projectLists(props) {
    const { keycloak } = useKeycloak()

    const listOfProjects = keycloak.authenticated ? (<div>
        <ProjectTable />
    </div>) : (<> <span>You have been logged out click here to login again</span> <br /> < button type="button" onClick={() => keycloak.login()}>
        Login
    </button></>)

    return (
        <React.Fragment>
            {listOfProjects}


        </React.Fragment>
    )
}

