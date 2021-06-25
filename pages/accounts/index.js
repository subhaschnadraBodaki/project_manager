import React from 'react'

import Accounts from '../../components/Accounts/Accounts'
import { useKeycloak } from '@react-keycloak/ssr'
export default function accounts() {
    const {keycloak}=useKeycloak()

    const account =keycloak.authenticated?( <Accounts/>):(<> <span>You have been logged out click here to login again</span> <br/> < button type="button" onClick={() => keycloak.login()}>
    Login
    </button></>)
    return (
        <div>
            {account}
        </div>
    )
}
