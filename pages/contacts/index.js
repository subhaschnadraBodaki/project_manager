import React from 'react'
import Contacts from '../../components/Contacts/Contacts'
// import { useKeycloak } from '@react-keycloak/ssr'
export default function contacts() {
    // const {keycloak}=useKeycloak()
    // const authentication = true
    // const contact =keycloak.authenticated?(  <Contacts/>):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    // Login
    // </button></>)
    return (
        <div>
        <Contacts/>
        </div>
    )
}
