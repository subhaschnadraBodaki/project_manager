import axios from 'axios';
import ContactsTable from '../../components/Contacts/ListOfContacts/ContactsTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function contacts({contactsData}) {
    return (
        <div>
            <ContactsTable contactsData={contactsData}/>
        </div>
    )
}


export async function getStaticProps() {
    const response = await axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/contacts?select=*` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
    })

    if (response.status!=200) throw new Error(response.statusText)
    
    const contactsData =  response.data

    return {
        props:{
            contactsData,  
        },
        revalidate: 60
    }

}