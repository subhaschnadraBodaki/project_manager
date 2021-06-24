import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import axios from 'axios' 

export default function TasksData({projectsData}) {

 

    
    if(projectsData[0]==null || projectsData[0] === undefined || projectsData[0].project_tasks[0]==null || projectsData[0].project_tasks[0]===undefined ){
return <div>No Data Found</div>
    }
    else{

    const tasksData = projectsData[0].project_tasks
    
    // const router = useRouter()
    
    // const ActionOnClick = async (rowData) => {
    //     await router.push(`/projectdetails/${rowData.id}`)

    // }
    // const EditOnClick = async (rowData) => {
    //     await router.push(`/editproject/${rowData.id}`)

    // }
   
    // deleteRow(id, e){  
    //     axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)  
    //       .then(res => {  
    //         console.log(res);  
    //         console.log(res.data);  
    //       })
    //     }
         console.log({rowData.id})
        const deleteRow= (rowData)=> axios.delete({
            
            url:  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks?id=eq.${rowData.id}` ,
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        })



    const ActionButton = (rowData) => {
        return (
            <React.Fragment>

                <button onClick={() => console.log("working")}>
                    <PencilIcon className="h-5 w-5 mr-4" />
                </button>
                <button onClick={() => deleteRow()}>
                    <TrashIcon className="h-5 w-5 " />
                </button>

               
            </React.Fragment>
        );
    }

    // const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
    const columns = [
        {field:"name" , header:"Task Name"},
        {field:"parent_task" , header:"Parent Task"},
        {field:"predecessor_task" , header:"Predecessor Task"},
        {field:"description"  , header:"Task Description"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>


})
    return (
        <div>
              <DataTable value={tasksData} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                        <Column header="Action" body={ActionButton}></Column>
                    </DataTable> 
        </div>
    )
    }
}
