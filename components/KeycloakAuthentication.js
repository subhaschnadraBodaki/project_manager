import React from 'react'
import { useKeycloak } from '@react-keycloak/ssr'
export default function KeycloakAuthentication({children}) {
    const {keycloak}=useKeycloak()
    
    
    const authentication= keycloak.authenticated?( <div>{children}</div> ):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    Login
    </button></>)

    return (
        <div>

            {authentication}
        </div>
    )
}
