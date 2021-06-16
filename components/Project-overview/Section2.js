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
    
// console.log(data)


    return (
        <div className ="grid grid-cols-6 gap-4 my-5">
            <div>Start Date</div>
            <div>End Date</div>
            <div>Budgeted Effort</div>
            <div>Percentage of Completion</div>
            <div>Budgeted Revenue</div>
            <div>Billed Amount</div>
            <div>{data.map(date=>{
                if(date.actual_start_date===null){
                  return  date.planned_start_date
                }
                else{
                    return date.actual_start_date
                }
            })}</div>
            <div>{data.map(date=>{
                if(date.actual_end_date===null){
                  return  date.planned_end_date
                }
                else{
                    return date.actual_end_date
                }
            })}</div>
            <div> 1000$</div>
            <div>27%</div>
            <div>500$</div>
            <div>1500$</div>


        </div>
    )
}
