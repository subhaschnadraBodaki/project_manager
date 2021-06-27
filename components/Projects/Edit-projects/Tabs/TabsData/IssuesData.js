import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableToolbar from '../TableToolbar'

export default function IssuesData({projectsData}) {
    const projectId = projectsData[0].id

    const data = [{ projectId: '##', Name: '##', Status: '##', projectManager: '##' }]
    const columns = [
        {field:"projectId" , header:"Project Id"},
        {field:"Name" , header:"Name"},
        {field:"Status" , header:"Status"},
        {field:"projectManager"  , header:"Project Manager"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
            <div>
               <TableToolbar projectId={projectId} label='Add Issues' formType='AddIssues'/>
            </div>
            <DataTable value={data} resizableColumns columnResizeMode="expand">
                
                        {dynamicColumns}
                    </DataTable> 
        </div>
    )
}