import React from 'react'
import TabsRender from '../../components/Project-overview/Tabs/TabsRender';
import Section1 from '../../components/Project-overview/Section1'
import Section2 from '../../components/Project-overview/Section2'
import Heading from '../../components/Project-overview/Heading'
import { useKeycloak } from '@react-keycloak/ssr';
import axios from 'axios';

export default function projectOverview({section1}) {
    const tabName = ['Teams', 'Budget', 'Risks', 'Deliverables']

    const { keycloak } = useKeycloak()

    const projectDetails = keycloak.authenticated ? (<>
        <div className="mx-10 px-5">

            <Heading />
        </div>
        <div className="mx-1 px-2 border-2 border-gray-600 border-solid">
            <Section1 data={section1} />
        </div>
        <div className="border-2 border-gray-600 border-solid my-5 mx-1 px-2">
            <Section2 data={section1} />
        </div>
        <div className="my-5 px-2">
            <TabsRender />
        </div>

    </>
    ) : (<> <span>You have been logged out click here to login again</span> <br /> < button type="button" onClick={() => keycloak.login()}>
        Login
    </button></>)
    return (
        <>
            {projectDetails}
        </>
    )
}

export async function getServerSideProps(context){
    const {pid}= context.query
    // console.log(context)
    
        const response =await axios({
            method :'GET',
            url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*`,
            headers:{
                apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        })    
            
    
    
    
     if (response.status!=200) throw new Error(response.statusText)
    
    const section1= await response.data

return{
    props:{
        section1:section1
    }
}

}