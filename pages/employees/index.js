import React from 'react'
import Employees from '../../components/Employees/Employees'
// import { useKeycloak } from '@react-keycloak/ssr'
export default function employees() {
    // const {keycloak}=useKeycloak()
    const authentication = true
    const employee =authentication?(  <Employees></Employees>):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    Login
    </button></>)
    
    return (
        <div>
          {employee}
        </div>
    )
}

