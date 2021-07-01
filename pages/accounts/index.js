<<<<<<< HEAD
import React from 'react'

import Accounts from '../../components/Accounts/Accounts'
// import { useKeycloak } from '@react-keycloak/ssr'
export default function accounts() {
    
    return (
        <div>
        <Accounts/>
=======
import axios from 'axios';
import AccountsTable from '../../components/Accounts/ListOfAccounts/AccountsTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function accounts({accountsData}) {
    return (
        <div>
            <AccountsTable accountsData={accountsData}/>
>>>>>>> 1171a90035ef814333b47163da73247195e1fa84
        </div>
    )
}


export async function getStaticProps() {
    const response = await axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=*` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
    })

    if (response.status!=200) throw new Error(response.statusText)
    
    const accountsData =  response.data

    return {
        props:{
            accountsData,  
        },
        revalidate: 60
    }

}
