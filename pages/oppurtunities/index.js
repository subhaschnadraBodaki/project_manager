import axios from 'axios';
import OppurtunityTable from '../../components/Oppurtunities/ListOfOppurtunity/OppurtunityTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function Oppurtunity({oppurtunitiessData}) {
    return (
        <div>
            <OppurtunityTable oppurtunitiessData={oppurtunitiessData}/>
        </div>
    )
}


export async function getStaticProps() {
    const response = await axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/opportunities?select=*` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
    })

    if (response.status!=200) throw new Error(response.statusText)
    
    const oppurtunitiesData =  response.data

    return {
        props:{
            oppurtunitiesData,  
        },
        revalidate: 60
    }

}