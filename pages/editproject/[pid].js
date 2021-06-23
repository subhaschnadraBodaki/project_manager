import React from 'react'

export default function editproject() {
    return (
        <div>
            <h1>Edit Project</h1>
        </div>
    )
}
// export async function getServerSideProps(context){
//     const {pid}= context.query
    
//         const response =await axios({
//             method :'GET',
//             url:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*,project_stories(*),project_tasks(*),project_milestones(*),project_status_report(*),project_team_member(*),project_resource_requests(*)`,
//             headers:{
//                 apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//             }
//         })    
        
//     if (response.status!=200) throw new Error(response.statusText)
    
//     const projectsData=  response.data
   
// return{
//     props:{
//         projectsData ,
     
       
//     }
// }

// }
