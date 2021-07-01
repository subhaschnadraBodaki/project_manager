import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useRouter } from 'next/router'

export default function TasksData({projectsData}) {

 

    
    if(projectsData[0]==null || projectsData[0] === undefined || projectsData[0].project_tasks[0]==null || projectsData[0].project_tasks[0]===undefined ){
return <div>No Data Found</div>
    }
    else{

    const tasksData = projectsData[0].project_tasks
    
    



 
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
              
              <DataTable value={tasksData} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                       
                    </DataTable> 
        </div>
    )
    }
}
