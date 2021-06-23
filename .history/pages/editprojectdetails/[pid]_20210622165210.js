import React from 'react'
import TabsRender from '../../components/Project-overview/Tabs/TabsRender';
import Section1 from '../../components/Project-overview/Section1'
import Section2 from '../../components/Project-overview/Section2'
import Heading from '../../components/Project-overview/Heading'
import { useKeycloak } from '@react-keycloak/ssr';
import axios from 'axios';
import AddTask from '../'
export default function projectOverview({projectsData }) {
    const tabName = ['Teams', 'Budget', 'Risks', 'Deliverables']
    const[taskIsOpen, setTaskIsOpen] = useState(false)
    const[deliverIsopen, setDeliverIsOpen] = useState(false)

    const { keycloak } = useKeycloak()
    
    const editprojectDetails = keycloak.authenticated ? (<>
          

          <Modal 
            isOpen={taskIsOpen}
            onRequestClose={()=> setTaskIsOpen(false)}
            >
               
            <AddTask/>
                </Modal>

            <Modal 
            isOpen={deliverIsopen}
            onRequestClose={()=> setDeliverIsOpen(false)}
            >
             <h2>Deliverable</h2>
            </Modal>

            <div className="pt-2">
            <h2 className="h2heading" >Edit Project</h2>

            <button className="Submitbtn" onClick={()=> setTaskIsOpen(true)}>+</button>
            <button className="Submitbtn" onClick={()=> setDeliverIsOpen(true)}>+</button>
           
            </div>         
        
        <div className="my-5 px-2">
            <TabsRender projectsData={projectsData} />
        </div>

    </>
    ) : (<> <span>You have been logged out click here to login again</span> <br /> < button type="button" onClick={() => keycloak.login()}>
        Login
    </button></>)

    return (
        <>
            {editprojectDetails}
        </>
    )
}

export async function getServerSideProps(context){
    const {pid}= context.query
    
        const response =await axios({
            method :'GET',
            url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*)`,
            headers:{
                apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        })    
        
    if (response.status!=200) throw new Error(response.statusText)
    
    const projectsData=  response.data
   
return{
    props:{
        projectsData ,
     
       
    }
}

}


// border-2 rounded-lg border-gray-600 border-double divide-solid m-px