import React from 'react'
import TabsRender from '../../components/Project-overview/Tabs/TabsRender';
import Section1 from '../../components/Project-overview/Section1'
import Section2 from '../../components/Project-overview/Section2'
import Heading from '../../components/Project-overview/Heading'
import { useKeycloak } from '@react-keycloak/ssr';
import axios from 'axios';
import Modal from 'react-modal'
import AddTask from '../../components/Edit-projects/AddTask'
import {useState} from 'react'
import EditProject from '../../components/Edit-projects/EditProject'
export default function editProjectDetails({projectsData }) {
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

            <button className="btn" onClick={()=> setTaskIsOpen(true)}>+</button>
            <button className="btn" onClick={()=> setDeliverIsOpen(true)}>+</button>
           
            </div>   
            <div>
              <EditProject />
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
    
        const response3 = axios({
            method :'GET',
            url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*)`,
            headers:{
                apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
        })    
        
   
    
    

  
    const response = axios({
            method:'get',
            url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=id,account_name` ,
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        })
      
        
        const response1= axios({
            method:'get',
            url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/currencies?select=id,code` ,
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        })
    
        const response2= axios({
            method:'get',
            url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=user_id,first_name` ,
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        })
        const data = await axios.all([response,response1,response2,response3])
        const accountdata =data[0].data;
        const currencydata=data[1].data;
        const projectManager=data[2].data;
        const projectsData=  data[3].data
   
return{
    props:{
        projectsData ,
        accountdata,
        currencydata,
        projectManager,

     
       
    }
}

}

// export async function getServerSideProps (){
//     const response = axios({
//         method:'get',
//         url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/accounts?select=id,account_name` ,
//         headers:{
//             "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//             "Content-Type": "application/json"
//         }
        
//     })
  
    
//     const response1= axios({
//         method:'get',
//         url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/currencies?select=id,code` ,
//         headers:{
//             "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//             "Content-Type": "application/json"
//         }
        
//     })

//     const response2= axios({
//         method:'get',
//         url:    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employees?select=user_id,first_name` ,
//         headers:{
//             "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//             "Content-Type": "application/json"
//         }
        
//     })
//     const data = await axios.all([response,response1,response2])
//     const accountdata =data[0].data;
//     const currencydata=data[1].data;
//     const projectManager=data[2].data;

//     return {
//         props:{
//         accountdata,
//         currencydata,
//         projectManager,
//         },
       
//     }

// }


// border-2 rounded-lg border-gray-600 border-double divide-solid m-px