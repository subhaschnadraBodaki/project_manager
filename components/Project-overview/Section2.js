import React from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'


export default function Section2() {
    const router = useRouter()
    const {pid} =  router.query
    const ProjectDetailsData =async() => {
        
        const response =await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/projects?id=eq.${pid}&select=*`,{
            method:'get',
            
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            },
           
            
        })
         if (!response.ok) throw new Error(response.statusText)
        return await response.json()
    }

    const {status , data , error}=useQuery('projectDetails',ProjectDetailsData)

    if(status==='loading'){
        return(
            <p>loading</p>
        )
    }

    if(status==='error'){
        return <p>error :{error.message}</p>
    }
    
console.log(data)


    return (
        <div className="grid grid-cols-2 grid-rows-4 gap-1">
            <div className="mt-2 m-auto p-2 " >Project_Description</div>
            <div className=" mt-2 border-2 border-solid border-gray-400 m-auto p-2 " >{data[0].description}</div>
            <div className="m-auto p-2" >Planned_start_Date</div>
            <div className="border-2 border-solid border-gray-400 m-auto p-2 " >{data[0].planned_start_date}</div>
            <div className="m-auto p-2" >Planned_End_Date</div>
            <div className="border-2 border-solid border-gray-400 m-auto p-2 ">{data[0].planned_end_date}</div>
            <div className="m-auto p-2" >Actual_Start_date</div>
            <div className="border-2 border-solid border-gray-400 m-auto p-2 ">{data[0].actual_start_date}</div>
        </div>
    )
}
