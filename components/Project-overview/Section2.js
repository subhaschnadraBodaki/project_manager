import React from 'react'

export default function Section2() {
    return (
        <div className="grid grid-cols-2 grid-rows-4 gap-1">
            <div className="mt-2 m-auto p-2 " >Project_Description</div>
            <div className=" mt-2 border-2 border-solid border-gray-400 m-auto p-2 " >Chatbot</div>
            <div className="m-auto p-2" >Planned_start_Date</div>
            <div className="border-2 border-solid border-gray-400 m-auto p-2 " >2/03/2021</div>
            <div className="m-auto p-2" >Planned_End_Date</div>
            <div className="border-2 border-solid border-gray-400 m-auto p-2 ">3/03/2021</div>
            <div className="m-auto p-2" >Actual_Start_date</div>
            <div className="border-2 border-solid border-gray-400 m-auto p-2 ">5/03/2021</div>
        </div>
    )
}
