import axios from 'axios';
import EmployeesTable from '../../components/Employees/ListOfEmployees/EmployeesTable'
import { useKeycloak } from '@react-keycloak/ssr'

export default function employees({employeesData}) {
    return (
        <div>
            <EmployeesTable employeesData={employeesData}/>
        </div>
    )
}


export async function getStaticProps() {
    const response = await axios({
        method:'get',
        url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=*` ,
        headers:{
            "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
    })

    if (response.status!=200) throw new Error(response.statusText)
    
    const employeesData =  response.data

    return {
        props:{
            employeesData,  
        },
        revalidate: 60
    }

}