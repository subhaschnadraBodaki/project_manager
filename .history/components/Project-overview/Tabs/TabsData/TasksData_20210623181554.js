import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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

    const ActionButton = (rowData) => {
        return (
            <React.Fragment>
                <button onClick={() => ActionOnClick(rowData)}>
                    <EyeIcon className="h-5 w-5 mr-4" />
                </button>

                <button onClick={() => EditOnClick(rowData)}>
                    <PencilIcon className="h-5 w-5 " />
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
                        <Column header="Action" body={actionBody}></Column>
                    </DataTable> 
        </div>
    )
    }
}
