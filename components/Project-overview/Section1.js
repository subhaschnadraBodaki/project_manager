import React from 'react'


export default function Section1({data}) {
    
  const columns = ['Project Id', 'Name' , 'Status','Project Manager', 'State','Customer Name']
  const values =[data[0].project_code,data[0].name ,data[0].project_status ,data[0].project_manager,'something','Venerate']  

    return (
      
      <div className ="grid grid-cols-6 gap-4 my-5">
            
            {columns.map(c => {
                return <div>{c}</div>
            })}

            {values.map( v => {
                return <div>{v}</div>
            })}
            
            {/* <div>Project Id</div>
            <div>Name</div>
            <div>Status</div>
            <div>Project Manager</div>
            <div>State</div>
            <div>Customer Name</div> */}
            {/* <div>{data[0].project_code}</div>
            <div>{data[0].name}</div>
            <div>{data[0].project_status}</div>
            <div>{data[0].project_manager}</div>
            <div>something</div>
            <div>Venerate</div> */}
            
        </div>
    )
}





// import { useQuery } from 'react-query'
// import { useRouter } from 'next/router'
  // const router = useRouter()
    // const {pid} =  router.query
    
    
    // const ProjectDetailsData =async() => {
        
    //     const response =await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*`,{
    //         method:'get',
            
    //         headers:{
    //             "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    //             "Content-Type": "application/json"
    //         },
           
            
    //     })
    //      if (!response.ok) throw new Error(response.statusText)
    //     return await response.json()
    // }

    // const {status , data , error}=useQuery('projectDetails',ProjectDetailsData)

    // if(status==='loading'){
    //     return(
    //         <p>loading</p>
    //     )
    // }

    // if(status==='error'){
    //     return <p>error :{error.message}</p>
    // }
    
// console.log(data)
    