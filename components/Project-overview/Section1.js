import React from 'react'


export default function Section1({ projectsData }) {


  console.log(projectsData[0])
  if (projectsData[0]==null || projectsData[0] === undefined) {

    return <div>No data Found</div>
  }
  else {
    const columns = ['Project Code', 'Name', 'Status', 'Project Manager', 'State', 'Customer Name']

    const { project_code, name, project_status, project_manager } = projectsData[0]

    const values = [project_code, name, project_status, project_manager, 'something', 'Venerate']

    return (

      <div className="grid grid-cols-6 gap-4 my-5">

        {columns.map((c, index) => {

          if (c === null) {
            return <div> - </div>
          }
          else {

            return <div key={index} className="text-sm text-gray-600 font-medium flex justify-center" >{c}</div>
          }
        })}

        {values.map((v, index) => {
          if (v === null) {
            return <div> - </div>
          }
          else {

            return <div key={index} className="text-base  flex justify-center" >{v}</div>
          }

        })}


      </div>
    )
  }
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
