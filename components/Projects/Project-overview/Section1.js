import React from 'react'
import StatusTemplate from '../../StatusTemplate'

export default function Section1({ projectsData }) {



  if (projectsData[0] == null || projectsData[0] === undefined) {

    return <div>No data Found</div>
  }
  
  else {
    
    const columns = ['Project Code', 'Name', 'PRJ Health', 'Project Manager', 'State', 'Customer Name']

    const { project_code, name, project_status, project_manager } = projectsData[0]

    const values = [project_code, name, <StatusTemplate status={project_status} />, project_manager, 'something', 'Venerate']

    return (
      <div >
      
        <div>
          <h3 className="text-lg">Basic Details</h3>
        </div>
        <div className="grid grid-cols-4 grid-rows-3 grid-flow-col gap-y-0.5 gap-x-1  p-5 ">

          {columns.map((c, index) => {
            if (index < columns.length / 2) {
              return <div key={index} className=" col-start-1  text-base  font-serif my-1.5 ">{c}</div>
            }
            else {
              return <div key={index} className=" col-start-3 text-base font-serif my-1.5  ">{c}</div>
            }
          })}
          {values.map((v, index) => {
            if (v === null || v === undefined) {
              return (
                <div key={index}>-</div>
              )
            }
            else {
              return (
                <div key={index} className="text-base text-black font-normal font-mono ">{v}</div>
              )
            }
          })}



        </div>
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


// return (
//   <div >
{/* <div className="grid grid-cols-6 gap-4  my-5">

{columns.map((c, index) => {

  if (c === null) {
    return <div> - </div>
  }
  else {

    return <div key={index} className="text-sm text-gray-800 font-medium flex justify-center" >{c}</div>
  }
})}

{values.map((v, index) => {
  if (v === null) {
    return <div> - </div>
  }
  else {

    return <div key={index} className="text-lg  flex justify-center" >{v}</div>
  }

})}


</div>
</div>
) */}