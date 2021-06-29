import axios from 'axios';
import AccountsTable from '../../components/Accounts/ListOfAccounts/AccountsTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function accounts({accountsData}) {
    return (
        <div>
            <AccountsTable accountsData={accountsData}/>
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
