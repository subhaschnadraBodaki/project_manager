import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const ProjectOverview = () => {
    const data = [{ projectId: '1', Name: 'chatbot', Status: 'Ongoing', projectManager: 'abhi' }]
    const columns = [
        {field:"projectId" , header:"ProjectId"},
        {field:"Name" , header:"Name"},
        {field:"Status" , header:"Status"},
        {field:"projectManager"  , header:"ProjectManager"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})

    return (
        <div >
                
                    <DataTable value={data} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                    </DataTable>      
        </div>
    )
}
export default ProjectOverview