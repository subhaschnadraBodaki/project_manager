import React from 'react'
import TabsRender from '../../../components/Projects/Edit-projects/Tabs/TabsRender';
// import { useKeycloak } from '@react-keycloak/ssr';
import axios from 'axios';
import Modal from 'react-modal'
import AddTask from '../../../components/Projects/Edit-projects/AddTask'
import AddRisks from '../../../components/Projects/Edit-projects/AddRisks';
import {useState} from 'react'
import EditProject from '../../../components/Projects/Edit-projects/EditProject'
import { Button } from 'primereact/button';
import AddDeliverables from '../../../components/Projects/Edit-projects/AddDeliverables'
import AddIssues from '../../../components/Projects/Edit-projects/AddIssues'

export default function editproject({projectsData,currencydata,accountdata,projectManager }) {
    const tabName = ['Teams', 'Budget', 'Risks', 'Deliverables']

    const[taskIsOpen, setTaskIsOpen] = useState(false)
    const[deliverIsopen, setDeliverIsOpen] = useState(false)
     const[issuesIsopen, setIssuesIsOpen] = useState(false)
     const[risksIsopen, setRisksIsOpen] = useState(false)
    // const { keycloak } = useKeycloak()

const projectCode = projectsData[0].project_code
const projectId = projectsData[0].id
// console.log(projectsData)
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '800px', 
          height: '500px', 
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      const authentication = true
    const editprojectDetails = authentication ? (<>
          

          <Modal 
            isOpen={taskIsOpen}
            onRequestClose={()=> setTaskIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >   
            
            <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setTaskIsOpen(false)} />
                </div>
            </div>

            <AddTask projectId={projectId} />
          </Modal>

          <Modal 
            isOpen={risksIsopen}
            onRequestClose={()=> setRisksIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >
               <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setRisksIsOpen(false)} />
                </div>
            </div>

<AddRisks projectId={projectId}/>
          </Modal>

          <Modal 
            isOpen={issuesIsopen}
            onRequestClose={()=> setIssuesIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >
                
                <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setIssuesIsOpen(false)} />
                </div>
            </div>
             <AddIssues projectId={projectId}/>
             
          </Modal>

          <Modal 
            isOpen={deliverIsopen}
            onRequestClose={()=> setDeliverIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >
               <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setDeliverIsOpen(false)} />
                </div>
            </div>
                  
             <AddDeliverables projectId={projectId}/>
          </Modal>

            
         

               {/* ----------------------------------- */}
               <div className="grid grid-cols-2">
               <div><h2 className="h2Form ml-2">Project-Code : {projectCode}</h2></div>
       <div className="text-right">       
<div className="relative inline-block text-left ">
  <div>
    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true"   >
      +
    </button>
  </div>


  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div className="py-1" role="none">
       <button className="text-gray-700 block w-full text-left px-4 py-2 text-sm" onClick={()=> setTaskIsOpen(true)}> Add Task </button> 
       <button className="text-gray-700 block w-full text-left px-4 py-2 text-sm" onClick={()=> setRisksIsOpen(true)}> Add Risk </button> 
       <button className="text-gray-700 block w-full text-left px-4 py-2 text-sm" onClick={()=> setIssuesIsOpen(true)}> Add Issues </button> 
       <button className="text-gray-700 block w-full text-left px-4 py-2 text-sm" onClick={()=> setDeliverIsOpen(true)}> Deliverable </button> 
    </div>
  </div>
</div>
</div>
</div>  
{/* ------------------------------------ */}
            <div className="pt-2">
            

           
           
            </div>   
            <div>
              <EditProject projectCode={projectCode} projectId= {projectId} currencydata={currencydata} accountdata={accountdata} projectManager={projectManager}/>
            </div>     
        
        <div className="my-5 px-2">
            <TabsRender projectsData={projectsData} />
        </div>
        <form>
        <div className="text-right mt-5  col-span-2 mr-20 ">
     <button type="submit" class="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm" >Submit</button>
    </div>
    </form>

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
            url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*),project_issues(*)`,
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

